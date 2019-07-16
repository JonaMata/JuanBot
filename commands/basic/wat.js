const { Command } = require('discord.js-commando');

module.exports = class WatCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'wat',
      group: 'basic',
      memberName: 'wat',
      description: 'Aask a "wat" question to the bot',
      examples: ['wat [quesiton]'],
      args: [
        {
          key: 'question',
          prompt: 'Wat is your question?',
          type: 'string'
        }
      ]
    });
  }

  run(msg, { question }) {
    switch (question.toLowerCase()) {
      case 'doe je graag?':
        msg.reply('Lekker in verrotte bananen knijpen!');
        break;
    }
  }
}
