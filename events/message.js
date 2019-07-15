module.exports = (client, msg) => {

  if (msg.author.bot) return;
  if(msg.content.indexOf(client.config.PREFIX) !== 0) return;

  const args = msg.content.slice(client.config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  const cmd = client.commands.get(command);
  if (!cmd) return;
  try {
    cmd.run(client, msg, args);
  } catch (e) {
    console.log(`Error while executing command ${command}:\n${e}`);
    msg.reply("Something went wrong while executing this command, please contact the developer.");
  }
};
