require('dotenv').config();
const Discord = require('discord.js');
const Config = process.env;

const Sentry = require('@sentry/node');
Sentry.init({ dsn: Config.SENTRYURL });

const Sharder = new Discord.ShardingManager('bot-shard.js', {
  respawn: true,
  token: Config.TOKEN
});
Sharder.on('launch', shard => console.log(`launched ${shard.id}`));

Sharder.spawn();

Sharder.on('message', (message) => {
  if (message === 'restart') {
    Sharder.shards.forEach((shard) => {
      shard.process.kill();
    })
  }
});
