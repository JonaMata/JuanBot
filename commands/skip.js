exports.run = (client, msg, args) => {
  var playlist = client.playlists[msg.guild.id];
  if (!msg.guild.voiceConnection && !playlist.playing) return msg.channel.send('Music must be playing!');
  msg.channel.send('Skipped').then(() => {
    playlist.stopReason = 'skip';
    playlist.dispatcher.end();
  });
};
