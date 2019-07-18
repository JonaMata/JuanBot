require('dotenv').config();
const Discord = require('discord.js');
const Config = process.env;
const http = require('http');

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


//Simple httpserver for uptime checking
const requestHandler = (request, response) => {
  response.end('JuanBot UP');
};

const server = http.createServer(requestHandler);

server.listen(Config.PORT, (err) => {
  if(err) return console.log("Couldn't start http server, error: ". err);
  console.log(`HTTP server listening on ${Config.PORT}`);
});
