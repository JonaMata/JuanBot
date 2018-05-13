exports.run = (cleint, msg, args) => {
  var music = client.modules.get('music');
  music.players[msg.guild.id].pause();
};
