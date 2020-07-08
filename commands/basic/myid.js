const { Command } = require('discord.js-commando');

module.exports = class MyIdCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'myid',
      group: 'basic',
      memberName: 'myid',
      description: 'Get your own discord user id',
      examples: ['myid']
    });
  }

  run(msg) {
    return msg.reply(`Your user id is ${msg.member.id}`);
  }
}
