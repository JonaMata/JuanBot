const { Command } = require('discord.js-commando');

module.exports = class RandomCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'random',
      group: 'basic',
      memberName: 'random',
      description: 'Gives you a random number within the range you specify.',
      examples: ['random [min] [max]'],
      args: [
        {
          key: 'min',
          prompt: 'The minimum number',
          type: 'float'
        },
        {
          key: 'max',
          prompt: 'The maximum number',
          type: 'float'
        }
      ]
    });
  }

  run(msg, { min, max }) {
    var ranNum = Math.random() * (max-min) + min;
    msg.reply(`A random number between ${min} and ${max} is ${ranNum}`);
  }
}
