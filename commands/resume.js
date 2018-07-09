exports.run = (client, msg, args) => {
  var music = client.modules.get('music');
  music.players[msg.guild.id].resume();
};
