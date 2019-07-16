const { Command } = require('discord.js-commando');

module.exports = class PauseCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'pause',
      aliases: ['stop'],
      group: 'music',
      memberName: 'pause',
      description: 'Pause the music',
      examples: ['pause']
    });
  }

  run(msg) {
    var playlist = this.client.playlists[msg.guild.id];
    if (!msg.guild.voiceConnection && !playlist.playing) return msg.channel.send('Music must be playing!');
    msg.channel.send('Paused').then(() => {playlist.dispatcher.pause();});
  }
}
