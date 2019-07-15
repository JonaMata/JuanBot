require('dotenv').config();
//const youtubedl = require('youtube-dl');
const youtubeSearch = require('youtube-search-promise');
const ytdl = require('ytdl-core');
const Config = process.env;

var opts = {
	maxResults: 1,
	key: Config.YOUTUBEKEY
};

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
  msg.channel.send('Searching...').then(response => {
    youtubeSearch(query, opts).catch(error => {
	response.edit('Error occured while searching for song: '+err);
    }).then(info => {
	console.log(info[0]);
      response.edit('Added: ' + info[1].title).then(() => {
        playlist.push(info[0]);
        if (playlist.length === 1) {
          music.executePlaylist(client, msg, playlist);
        }
      });
    });
  })
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

    new Promise((resolve, reject) => {
      music.players[msg.guild.id] = connection.playStream(ytdl(song.link, {filter: 'audioonly'}));
      resolve(music.players[msg.guild.id]);
    }).then( player => {
      player.on('end', () => {
        setTimeout(() => {
          if (playlist.length > 0) {
            playlist.shift();
            music.executePlaylist(client, msg, playlist);
          } else {
            connection.disconnect();
          }
        }, 1000);
    }).catch(err => {
      console.log(err);
    });

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
    songList += '>' + playlist[0].title + '\n';
    for(var i = 1; i < playlist.length; i++) {
        songList += '-' + playlist[i].title + '\n';
    }
  }
  return songList;
};
