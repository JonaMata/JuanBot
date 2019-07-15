exports.run = (client, msg, args) => {
  if (msg.member.voiceChannel) {
    msg.member.voiceChannel.join().then(connection => {
      client.playlists[msg.guild.id].dispatcher.end();
      const dispatcher = connection.playFile('./sounds/rickroll.mp3');
      dispatcher.on('end', () => {
        client.commands.get('play').run(client, msg, []);
      });
      msg.reply(`Suffering device deployed in voice channel ${msg.member.voiceChannel.name}`)
    }).catch(console.log);
  } else {
    msg.reply('Rickrolls are only allowed if you let yourself suffer too!\n So join a voice channel!');
  }
};

exports.help = "Plays Never gonna give you up by Rick Astley in your current voice channel.";
