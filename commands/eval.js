exports.run = async (client, msg, args) => {
  if(msg.member.id === client.config.adminid) {
    if (args.join(' ').toLowerCase() === 'restart') {
      client.shardClient.broadcastEval('\
        client.guilds.forEach((guild) => {\
          guild.channels.forEach((channel) => {\
            channel.send(\'JuanBot is restarting\');\
          });\
        })');
      client.shardClient.send('restart');
    } else {
      eval(args.join(' '));
    }
  }
};
