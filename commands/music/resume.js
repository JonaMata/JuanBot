const { Command } = require('discord.js-commando');

module.exports = class ResumeCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'resume',
      group: 'music',
      memberName: 'resume',
      description: 'Let the music play again!',
      examples: ['resume']
    });
  }

  run(msg) {
    var playlist = this.client.playlists[msg.guild.id];
    if (!msg.guild.voiceConnection && !playlist.playing) return msg.channel.send('Music must be playing!');
    msg.channel.send('Resumed').then(() => {playlist.dispatcher.resume();});
  }
}
