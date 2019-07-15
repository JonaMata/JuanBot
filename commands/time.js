exports.run = (client, msg, args) => {
  var playlist = client.playlists[msg.guild.id];
  if (!msg.guild.voiceConnection && !playlist.playing) return msg.channel.send('Music must be playing!');
  msg.channel.send(`Music time: ${Math.floor(playlist.dispatcher.time / 60000)}:${Math.floor((playlist.dispatcher.time % 60000)/1000) <10 ? '0'+Math.floor((playlist.dispatcher.time % 60000)/1000) : Math.floor(playlist.dispatcher.time % 60000/1000)}`);
};
