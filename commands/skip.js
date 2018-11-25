exports.run = (client, msg, args) => {
  var music = client.modules.get('music');
  music.players[msg.guild.id].end();
  music.executePlaylist(client, msg, music.getPlaylist(client, msg.guild.id));
};
