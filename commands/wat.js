exports.run = (client, msg, args) => {
  switch (args.join(' ').toLowerCase()) {
    case 'doe je graag?':
      msg.reply('Lekker in verrotte bananen knijpen!');
      break;
  }
};
