const {Command} = require('discord.js-commando');

const ytdl = require('ytdl-core');
const search = require('scrape-youtube');

module.exports = class PlayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'play',
            group: 'music',
            memberName: 'play',
            description: 'Play some music',
            examples: ['play', 'play [youtube url]', 'play [search query]'],
            args: [
                {
                    key: 'query',
                    prompt: 'What do you want to listen to?',
                    type: 'string',
                    default: ''
                }
            ]
        });
    }

    run(msg, {query}, addMessage) {
        if (query) {
            msg.channel.send('Searching...').then(response => {

                let url;

                if (query.startsWith('http')) {
                    url = query;
                    this.addSong(url, msg, response);
                } else {
                    search(query, {limit: 1, type: 'video'}).catch(error => {
                        response.edit('Error occured while searching for song: ' + error);
                    }).then(info => {
                        url = info[0]['link'];
                        this.addSong(url, msg, response);
                    });
                }
            });
        } else {
            var playlist = this.client.playlists[msg.guild.id];
            if (playlist === undefined) return msg.channel.send('First add some songs.');
            if (!msg.guild.voiceConnection) return this.joinVoiceChannel(msg).then(() => this.run(msg, {query: null}, addMessage));
            if (playlist.playing) return msg.channel.send('Already playing.');

            playlist.playing = true;

            const play = (song, addMessage) => {
                if (song === undefined) return msg.channel.send('The playlist is empty.').then(() => {
                    playlist.playing = false;
                    playlist.currentSong = undefined;
                    msg.member.voiceChannel.leave();
                });

                var message = `Now playing:`
                if (addMessage) {
                    addMessage.edit(message, {embed: this.getEmbed(song)});
                } else {
                    msg.channel.send(message, {embed: this.getEmbed(song)});
                }

                playlist.currentSong = song;

                playlist.dispatcher = msg.guild.voiceConnection.playStream(ytdl(song.url, {audioonly: true}));
                playlist.stopReason = 'auto';

                playlist.dispatcher.on('end', (reason) => {
                    if (!(playlist.stopReason == 'auto' || playlist.stopReason == 'skip')) return playlist.playing = false;
                    if (playlist.songs.length == 0 && playlist.autoplay) {
                        msg.channel.send('Searching autoplay track').then((response) => {
                            this.addSong(song.autoplay, msg, response).then((response) => {
                                play(playlist.songs.shift(), response);
                            });
                        });
                    } else {
                        play(playlist.songs.shift());
                    }
                });
                playlist.dispatcher.on('error', (err) => {
                    return msg.channel.send('error: ' + err).then(() => {
                        play(playlist.songs.shift());
                    });
                });

            };
            play(playlist.songs.shift(), addMessage);
        }
    }

    addSong(url, msg, response) {
        return new Promise((resolve, reject) => {
            if (url === undefined) return response.edit('Your song query should be a valid youtube url or a text query');
            ytdl.getInfo(url, (err, info) => {
                if (err) return response.edit('Invalid YouTube Link: ' + err);
                if (!this.client.playlists.hasOwnProperty(msg.guild.id)) this.client.playlists[msg.guild.id] = {}, this.client.playlists[msg.guild.id].playing = false, this.client.playlists[msg.guild.id].autoplay = false, this.client.playlists[msg.guild.id].songs = [];
                var playlist = this.client.playlists[msg.guild.id];

                var videoDetails = info.player_response.videoDetails;
                var thumbnails = videoDetails.thumbnail.thumbnails;
                var thumbnailUrl = thumbnails[thumbnails.length - 1].url.split('?')[0];

                let title = info.title;
                let artist = info.author.name;
                if (info.media) {
                    if (info.media.song) {
                        title = info.media.song;
                    }
                    if (info.media.artist) {
                        artist = info.media.artist;
                    }
                }

                var song = {
                    url: url,
                    title: title,
                    artist: artist,
                    media: info.media,
                    duration: info.length_seconds,
                    thumbnail: thumbnailUrl,
                    requester: msg.author.username,
                    autoplay: 'https://www.youtube.com/watch?v='+info.related_videos[0].id
                };
                playlist.songs.push(song);
                response.edit('Added:', {embed: this.getEmbed(song)});

                if (playlist.songs.length == 1 && !playlist.playing && !playlist.rickroll) {
                    this.run(msg, {}, response);
                }
                resolve(response);
            });
        });
    }

    joinVoiceChannel(msg) {
        return new Promise((resolve, reject) => {
            const voiceChannel = msg.member.voiceChannel;
            if (!voiceChannel || voiceChannel.type !== 'voice') return msg.reply('You need to be in a voice channel to use this command.');
            voiceChannel.join().then(connection => resolve(connection)).catch(err => reject(err));
        });
    }


    getEmbed(song) {
        return {
            color: 2447003,
            title: song.title,
            url: song.url,
            description: `By **${song.artist}**
      Duration: **${Math.floor(song.duration / 60)}:${song.duration % 60 < 10 ? 0 : ''}${song.duration % 60}**
      Requested by: **${song.requester}**`,
            thumbnail: {
                url: song.thumbnail
            }
        };
    }
};

