exports.run = async (client, msg, args) => {
  if (msg.member.voiceChannel) {
    var music = client.modules.get('music');
    await music.play(client, msg, args);
    msg.channel.send(music.list(client, msg));

  } else {
    msg.reply('You must be in a voice channel to use this command.');
  }
};
