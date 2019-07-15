const { google } = require('googleapis');
const youtube = google.youtube({ version: 'v3', auth: process.env.YOTUBEKEY});
const ytdl = require('ytdl-core');

exports.run = async (client, msg, args) => {
  if(args.length > 0) {

    let url;

    if (args[0].startsWith('http')) {
      url = args[0];
      addSong(url, client, msg);
    } else {
      var query = args.join(' ');

      await msg.channel.send('Searching...').then(response => {
        youtube.search.list({ part:'id,snippet', type: 'video', q: query, maxResults: 1, key: client.config.YOUTUBEKEY}).catch(error => {
    	response.edit('Error occured while searching for song: '+error);
        }).then(info => {
          url = 'https://www.youtube.com/watch?v='+info['data']['items'][0]['id']['videoId'];
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

      msg.channel.send(`Playing **${song.title}** as requested by: **${song.requestor}**`);
      playlist.dispatcher = msg.guild.voiceConnection.playStream(ytdl(song.url, { audioonly: true }));

      playlist.dispatcher.on('end', (reason) => {
        if (reason == 'user') return playlist.playing = false;;
        console.log('song ended');
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
     client.playlists[msg.guild.id].songs.push({url: url, title: info.title, requester: msg.author.username});
     msg.channel.send(`Added **${info.title}** to the queue.`);

     if (client.playlists[msg.guild.id].songs.length == 1 && !client.playlists[msg.guild.id].playing) {
       client.commands.get('play').run(client, msg, []);
     }
  });
}
