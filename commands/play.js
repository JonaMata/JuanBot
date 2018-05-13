exports.run = async (client, msg, args) => {
  if (msg.member.voiceChannel) {
    var music = client.modules.get('music');
    music.play(client, msg, args);

  } else {
    msg.reply('You must be in a voice channel to use this command.');
  }
};
