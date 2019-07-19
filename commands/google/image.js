const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

const gis = require('g-i-s');

module.exports = class ImageCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'image',
      group: 'google',
      memberName: 'image',
      description: 'Search for an image',
      examples: ['image [query]'],
      args: [
        {
          key: 'amount',
          prompt: 'How much pictures do you want',
          type: 'integer',
          default: 1,
          validate: amount => {
            const maxAmount = 10;
            if(amount>1 && amount<maxAmount) return true;
            return `Amount must have a value from **1** to **${maxAmount}**.`;
          }
        },
        {
          key: 'query',
          prompt: 'What do you want to search for?',
          type: 'string'
        }
      ]
    });
  }

  run(msg, { query, amount }) {
    msg.channel.send('Searching...').then((response) => {
      gis(query, (err, res) => {
        if(err) response.edit('Error while searching for images: ', err);
        else {
          var images = "";
          console.log(amount);
          for(var i = 0; i < amount; i++) {
            images+=`\n${res[i].url}`;
          }
          response.edit(`Result for \`${query}\`:${images}`);
          console.log(res.length);
        }
      });
    });
  }
}
