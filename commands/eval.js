exports.run = async (client, msg, args) => {
  if(msg.member.id === client.config.adminid) {
    eval(args.join(' '));
  }
};
