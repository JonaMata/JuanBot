const { Command } = require('discord.js-commando');

module.exports = class JoinCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'join',
      group: 'music',
      memberName: 'join',
      description: 'Let the bot enter your voice channel',
      examples: ['join']
    });
  }

  run(msg) {
    return new Promise((resolve, reject) => {
      const voiceChannel = msg.member.voiceChannel;
      if (!voiceChannel || voiceChannel.type !== 'voice') return msg.reply('You need to be in a voice channel to use this command.');
      voiceChannel.join().then(connection => resolve(connection)).catch(err => reject(err));
    });
  }
}
