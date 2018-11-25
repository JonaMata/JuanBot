exports.run = (client, msg, args) => {
  var min = Number(args.shift());
  var max = Number(args.shift());
  var ranNum = Math.random() * (max-min) + min;
  msg.reply(ranNum);
};

exports.help = "Gives you a random number within the range you specify.\nUsage: ?random [min] [max]";
