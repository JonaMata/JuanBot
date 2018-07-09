exports.run = (client, msg, args) => {
  var commandFields = [];
  client.commands.keyArray().forEach(command => {
    var helpValue = (client.commands.get(command).help) ? client.commands.get(command).help : 'No info provided';
    console.log(helpValue);
    commandFields.push({name: client.config.prefix + command, value: helpValue});
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
