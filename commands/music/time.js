const { Command } = require('discord.js-commando');

module.exports = class TimeCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'time',
      aliases: ['song', 'current', 'progress'],
      group: 'music',
      memberName: 'time',
      description: 'Display the current time position in the song',
      examples: ['time']
    });
  }

  run(msg) {
    var playlist = this.client.playlists[msg.guild.id];
    if (!msg.guild.voiceConnection && !playlist.playing) return msg.channel.send('Music must be playing!');

    let song = playlist.currentSong;

    const embed = {
      color: 2447003,
      title: song.title,
      url: song.url,
      thumbnail: {
        url: song.thumbnail
      },
      description: `By **${song.artist}**
        Progress: **${Math.floor(playlist.dispatcher.time / 60000)}:${Math.floor((playlist.dispatcher.time % 60000)/1000) <10 ? '0'+Math.floor((playlist.dispatcher.time % 60000)/1000) : Math.floor(playlist.dispatcher.time % 60000/1000)} - ${Math.floor(song.duration/60)}:${song.duration%60 < 10 ? 0 : ''}${song.duration%60}**
        Requested by: **${song.requester}**`
    }
    msg.channel.send('Currently playing', {embed: embed});
  }
}
