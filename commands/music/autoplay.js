const { Command } = require('discord.js-commando');

module.exports = class AutoplayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'autoplay',
            group: 'music',
            memberName: 'autoplay',
            description: 'Turn autoplay on or off.',
            examples: ['autoplay'],
            args: [
                {
                    key: 'state',
                    prompt: 'What state do you want to change autoplay to?',
                    type: 'string',
                    default: ''
                }
            ]
        });
    }

    run(msg, { state }) {
        const on = ['true', 'yes', 'on'];
        const off = ['false', 'no', 'off'];

        if (!this.client.playlists.hasOwnProperty(msg.guild.id)) this.client.playlists[msg.guild.id] = {}, this.client.playlists[msg.guild.id].playing = false, this.client.playlists[msg.guild.id].autoplay = false, this.client.playlists[msg.guild.id].songs = [];
        var playlist = this.client.playlists[msg.guild.id];
        let newState;
        if(!state) newState = !playlist.autoplay;
        else {
            on.forEach((value) => {
                if(state.toLowerCase() == value) {
                    newState = true;
                }
            });

            off.forEach((value) => {
                if(state.toLowerCase() == value) {
                    newState = false;
                }
            });
        }
        if(newState !== undefined) msg.channel.send(`Set autoplay to **${newState ? 'on' : 'off'}**`).then(() => playlist.autoplay = newState);
        else msg.channel.send(`Error: **${state}** is not a recognized state, allowed inputs are \`${on.join(', ')}\` for **on** and \`${off.join(', ')}\` for **off**`);
    }
}
