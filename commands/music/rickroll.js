const { Command } = require('discord.js-commando');

module.exports = class RickrollCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'rickroll',
      group: 'music',
      memberName: 'rickroll',
      description: 'Let them all suffer!',
      examples: ['rickroll']
    });
  }

  run(msg) {
    if (!this.client.playlists.hasOwnProperty(msg.guild.id)) this.client.playlists[msg.guild.id] = {}, this.client.playlists[msg.guild.id].playing = false, this.client.playlists[msg.guild.id].songs = [];
    var playlist = this.client.playlists[msg.guild.id];
    if(playlist.rickroll) return msg.channel.send("You're already suffering!");
    if (msg.member.voiceChannel) {
      msg.member.voiceChannel.join().then(connection => {
        playlist.rickroll = true;
        playlist.stopReason = 'rickroll';
        if(playlist.playing) playlist.dispatcher.end();
          const dispatcher = connection.playFile('./sounds/rickroll.mp3');
          dispatcher.on('end', () => {
            playlist.rickroll = false;
            client.commands.get('play').run(client, msg, []);
          });
          msg.reply(`Suffering device deployed in voice channel ${msg.member.voiceChannel.name}`);
      }).catch(console.log);
    } else {
      msg.reply('Rickrolls are only allowed if you let yourself suffer too!\n So join a voice channel!');
    }
  }
}
