const { Command } = require('discord.js-commando');

module.exports = class InviteCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'invite',
      group: 'basic',
      memberName: 'invite',
      description: 'Give a link to invite the bot to other servers',
      examples: ['invite']
    });
  }

  run(msg) {
    return msg.reply('Use this link to invite the bot to other servers: https://discordapp.com/api/oauth2/authorize?client_id=442979680497172480&permissions=8&scope=bot');
  }
}
