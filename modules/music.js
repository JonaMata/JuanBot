const youtubedl = require('youtube-dl');
const ytdl = require('ytdl-core');
const Config = require('../config.json');

exports.ytdl = ytdl;

exports.playlists = {};
exports.players = {};
exports.connection;

exports.play = async (client, msg, args) => {
  var music = client.modules.get('music');
  var playlist = music.getPlaylist(client, msg.guild.id);

  if (!args) return;

  var query = args.join(' ');
  if(!query.toLowerCase().startsWith('http')) {
    query = 'gvsearch1:' + query;
  }

  youtubedl.getInfo(query, ['-q', '--no-warnings', '--force-ipv4'], (err, info) => {
    if (err) return;

    playlist.push(info);
    if (playlist.length === 1) {
      music.executePlaylist(client, msg, playlist);
    }
  });
};

exports.executePlaylist = (client, msg, playlist) => {
  var music = client.modules.get('music');
  new Promise( (resolve, reject) => {
    const connection = client.voiceConnections.find(val => val.channel.guild.id == msg.guild.id);
    if (connection === null) {
      msg.member.voiceChannel.join().then(newConnection => {
        resolve(newConnection);
      });
    } else {
      resolve(connection);
    }
  }).then(connection => {
    const song = playlist[0];

    players[msg.guild.id] = connection.playStream(ytdl(song.webpage_url, {filter: 'audioonly'}));
    players[msg.guild.id].on('end', () => {
      setTimeout(() => {
        if (playlist.length > 0) {
          playlist.shift();
          music.executePlaylist(client, msg, playlist);
        }
      }, 1000);
    });
  }).catch(err => {
    console.log(err);
  });
};

exports.getPlaylist = (client, id) => {
  var music = client.modules.get('music');
  if (!music.playlists[id]) music.playlists[id] = [];
  return music.playlists[id];
};

exports.list = (client, msg) => {
  var music = client.modules.get('music');
  var songList = 'Current playlist:\n';
  var playlist = music.getPlaylist(client, msg.guild.id);
  if(playlist.length > 0) {
    var preChar = ()
    songList += preChar + playlist[0].title + '\n';
    for(var i = 1; i < playlist.length; i++) {
        songList += '-' + playlist[i].title + '\n';
    }
  }
  return songList;
};
