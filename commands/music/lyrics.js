const { Command } = require('discord.js-commando');

module.exports = class PauseCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'lyrics',
      group: 'music',
      memberName: 'lyrics',
      description: 'Display the lyrics of the current song',
      examples: ['lyrics']
    });
  }

  run(msg) {
    var playlist = this.client.playlists[msg.guild.id];
    if (!msg.guild.voiceConnection && !playlist.playing) return msg.channel.send('Music must be playing!');
    msg.channel.send('Searching...').then(response => {
      this.client.lyricist.search(playlist.currentSong.title+' '+playlist.currentSong.artist).catch(err => {
        return response.edit('Could not find lyrics for the current song');
      }).then(res => {
        if(res[0]) {
        this.client.lyricist.song(res[0].id, { fetchLyrics: true }).catch(err => {
          return response.edit('Could not find lyrics for the current song');
        }).then(song => {
          if (song.lyrics.length>10000) return response.edit('Could not find lyrics for the current song');
          response.edit(`Lyrics of **${song.full_title}**:`);
          const sendLyrics = (lyrics) => {
            if(lyrics.length>2000) {
              var sliceIndex = lyrics.slice(0,2000).lastIndexOf('\n');
              msg.channel.send(lyrics.slice(0,sliceIndex));
              sendLyrics(lyrics.slice(sliceIndex,lyrics.length));
            } else {
              msg.channel.send(lyrics);
            }
          }
          sendLyrics(song.lyrics);
          return;
        });
      } else {
        return response.edit('Could not find lyrics for the current song');
      }
      });
    });
  }
}
