const { Command } = require('discord.js-commando');

module.exports = class PlaylistCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'playlist',
      group: 'music',
      memberName: 'playlist',
      description: 'View the current playlist',
      examples: ['playlist']
    });
  }

  run(msg) {
    if (this.client.playlists[msg.guild.id] === undefined) return msg.channel.sendMessage(`Add some songs to the playlist first with ${this.client.config.PREFIX}add`);
    const playlist = this.client.playlists[msg.guild.id];

    const embed = {
      color: 2447003,
      title: `${msg.guild.name}'s Playlist:`,
      description: `Currently **${playlist.songs.length}** songs queued`,
      fields: []
    }

    if(playlist.currentSong) {
      let song = playlist.currentSong
      embed.fields.push({
        name: `>${song.title}`,
        value: `By **${song.artist}**
          Progress: **${Math.floor(playlist.dispatcher.time / 60000)}:${Math.floor((playlist.dispatcher.time % 60000)/1000) <10 ? '0'+Math.floor((playlist.dispatcher.time % 60000)/1000) : Math.floor(playlist.dispatcher.time % 60000/1000)} - ${Math.floor(song.duration/60)}:${song.duration%60 < 10 ? 0 : ''}${song.duration%60}**
          Requested by: **${song.requester}**`
      });
    }

  	playlist.songs.forEach((song, i) => {
      embed.fields.push({
        name: `${i+1}. ${song.title}`,
        description: `By **${song.artist}**
          Duration: **${Math.floor(song.duration/60)}:${song.duration%60 < 10 ? 0 : ''}${song.duration%60}**
          Requested by: **${song.requester}**`
        });
    });
  	msg.channel.send({embed: embed});
  }
}
