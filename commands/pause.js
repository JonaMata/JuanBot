exports.run = (client, msg, args) => {
  var playlist = client.playlists[msg.guild.id];
  if (!msg.guild.voiceConnection && !playlist.playing) return msg.channel.send('Music must be playing!');
  msg.channel.send('Paused').then(() => {playlist.dispatcher.pause();}); 
};
