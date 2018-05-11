exports.run = (client, msg, args) => {
  var commandFields = [];
  client.commands.keyArray().forEach(command => {
    if (client.commands.get(command).help) commandFields.push({name: client.config.prefix + command, value: client.commands.get(command).help});
  });
  msg.author.send({embed: {
    color: 2447003,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL
    },
    title: "Help",
    description: "A list commands for JuanBot",
    fields: commandFields,
    timestamp: new Date(),
    footer: {
      icon_url: client.user.avatarURL,
      text: "Made with ❤️ by Jonathan Matarazzi"
    }
  }});
};
