exports.run = (client, msg, args) => {
  var music = client.modules.get('music');
  msg.channel.send(music.list(client, msg));
};
