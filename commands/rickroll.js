exports.run = (client, msg, args) => {
  if (!client.playlists.hasOwnProperty(msg.guild.id)) client.playlists[msg.guild.id] = {}, client.playlists[msg.guild.id].playing = false, client.playlists[msg.guild.id].songs = [];
  var playlist = client.playlists[msg.guild.id];
  if(playlist.rickroll) return msg.channel.send("You're already suffering!");
  if (msg.member.voiceChannel) {
    msg.member.voiceChannel.join().then(connection => {
      playlist.rickroll = true;
      playlist.stopReason = 'rickroll';
      if(playlist.playing) playlist.dispatcher.end();
        const dispatcher = connection.playFile('./sounds/rickroll.mp3');
        dispatcher.on('end', () => {
          playlist.rickroll = false;
          client.commands.get('play').run(client, msg, []);
        });
        msg.reply(`Suffering device deployed in voice channel ${msg.member.voiceChannel.name}`);
    }).catch(console.log);
  } else {
    msg.reply('Rickrolls are only allowed if you let yourself suffer too!\n So join a voice channel!');
  }
};

exports.help = (prefix) => { return `Plays Never gonna give you up by Rick Astley in your current voice channel.\nUsage: ${prefix}rickroll` }
