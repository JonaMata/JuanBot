const ytdl = require('ytdl-core');
const search = require('scrape-youtube');

exports.run = async (client, msg, args) => {
  if(args.length > 0) {

    let url;

    if (args[0].startsWith('http')) {
      url = args[0];
      addSong(url, client, msg);
    } else {
      var query = args.join(' ');

      await msg.channel.send('Searching...').then(response => {
        search(query, { limit: 1, type: 'video' }).catch(error => {
    	response.edit('Error occured while searching for song: '+error);
        }).then(info => {
          url = info[0]['link'];
          addSong(url, client, msg);
        });
      });
    }
  } else {
    var playlist = client.playlists[msg.guild.id];
    if(playlist === undefined) return msg.channel.send('First add some songs.');
    if (!msg.guild.voiceConnection) return client.commands.get('join').run(client, msg, args).then(() => client.commands.get('play').run(client, msg, args));
    if (playlist.playing) return msg.channel.send('Already playing.');

    let dispatcher;
    playlist.playing = true;

    console.log(playlist);
    (function play(song) {
      console.log(song);
      if (song === undefined) return msg.channel.send('The playlist is empty.').then(() => {
        playlist.playing = false;
        msg.member.voiceChannel.leave();
      });

      msg.channel.send(`Playing **${song.title}** as requested by: **${song.requester}**`);
      playlist.dispatcher = msg.guild.voiceConnection.playStream(ytdl(song.url, { audioonly: true }));
      playlist.stopReason = 'auto';

      playlist.dispatcher.on('end', (reason) => {
        if (!(playlist.stopReason == 'auto' || playlist.stopReason == 'skip')) return playlist.playing = false;
        play(playlist.songs.shift());
      });
      playlist.dispatcher.on('error', (err) => {
        return msg.channel.send('error: ' + err).then(() => {
          play(playlist.songs.shift());
        });
      });

    })(playlist.songs.shift());
  }
};

function addSong(url, client, msg) {
  if (url === undefined) return msg.channel.send('Your song query should be a valid youtube url or a text query');
  ytdl.getInfo(url, (err, info) => {
     if(err) return msg.channel.send('Invalid YouTube Link: ' + err);
     if (!client.playlists.hasOwnProperty(msg.guild.id)) client.playlists[msg.guild.id] = {}, client.playlists[msg.guild.id].playing = false, client.playlists[msg.guild.id].songs = [];
     var playlist = client.playlists[msg.guild.id];
     playlist.songs.push({url: url, title: info.title, requester: msg.author.username});
     msg.channel.send(`Added **${info.title}** to the queue.`);

     if (playlist.songs.length == 1 && !playlist.playing && !playlist.rickroll) {
       client.commands.get('play').run(client, msg, []);
     }
  });
}
