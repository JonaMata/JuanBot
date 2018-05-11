const cassette = require('cassette');
const ytdl = require('ytdl-core');

exports.setup = (client) => {
  exports.ytService = new cassette.YouTubeService(client.config.ytAPIkey);
  exports.ytdl = ytdl;
};

exports.playlist = new cassette.Playlist();
exports.player;
exports.connection;
