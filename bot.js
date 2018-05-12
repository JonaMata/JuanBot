const Discord = require('discord.js');
const Config = require('./config.json');

const Sharder = new Discord.ShardingManager('bot-shard.js', {
  respawn: true,
  token: Config.token
});
Sharder.on('launch', shard => console.log(`launched ${shard.id}`));

Sharder.spawn();
