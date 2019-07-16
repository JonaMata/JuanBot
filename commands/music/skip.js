const { Command } = require('discord.js-commando');

module.exports = class SkipCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'skip',
      group: 'music',
      memberName: 'skip',
      description: 'Skip the current track',
      examples: ['skip']
    });
  }

  run(msg) {
    var playlist = this.client.playlists[msg.guild.id];
    if (!msg.guild.voiceConnection && !playlist.playing) return msg.channel.send('Music must be playing!');
    msg.channel.send('Skipped').then(() => {
      playlist.stopReason = 'skip';
      playlist.dispatcher.end();
    });
  }
}
