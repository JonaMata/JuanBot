exports.run = (client, msg, args) => {
  return new Promise((resolve, reject) => {
    const voiceChannel = msg.member.voiceChannel;
    if (!voiceChannel || voiceChannel.type !== 'voice') return msg.reply('You need to be in a voice channel to use this command.')
    voiceChannel.join().then(connection => resolve(connection)).catch(err => reject(err));
  })
};
