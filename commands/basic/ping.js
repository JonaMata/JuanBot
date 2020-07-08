const { Command } = require('discord.js-commando');

module.exports = class PingCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'pong',
      group: 'basic',
      memberName: 'pong',
      description: 'Pong!',
      examples: ['pong']
    });
  }

  run(msg) {
    return msg.reply('Pong!');
  }
}
