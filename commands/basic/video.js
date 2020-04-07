const { Command } = require('discord.js-commando');

module.exports = class VideoCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'video',
      group: 'basic',
      memberName: 'video',
      description: 'Give a link to enable video calling in a voice channel',
      examples: ['video']
    });
  }

  run(msg) {
    const voiceChannel = msg.member.voiceChannel;
    if (!voiceChannel || voiceChannel.type !== 'voice') return msg.reply('You need to be in a voice channel to use this command.');
    const videoUrl = `https://www.discordapp.com/channels/${msg.guild.id}/${voiceChannel.id}`;
    const embed = {
      color: 2447003,
      title: `Join the video call of ${voiceChannel.name}!`,
      description: videoUrl,
    };
    msg.channel.send('', {embed: embed});
  }
};
