exports.run = async (client, msg, args) => {
  var query = args.join(' ');
  if (msg.member.voiceChannel) {
    await client.music.playlist.add(query, [client.music.ytService]);
    var curList = "Current playlist:\n";
    client.music.playlist.forEach(song => {
      curList += song.title + "\n";
    });
    msg.channel.send(curList);
    if (!client.music.connection) {
      client.music.connection = await msg.member.voiceChannel.join();
    }
    if (!client.music.player) {
      switch (client.music.playlist.current.type) {
        case 'youtube':
          client.music.player = client.music.connection.playStream(client.music.ytdl(client.music.playlist.current.streamURL, {filter: 'audioonly'}));

          client.music.player.on('end', () => {
          	client.music.playlist.next();
          	client.music.connection.playStream(ytdl(client.music.playlist.current.streamURL, {filter: 'audioonly'}));
          });
          break;
      }
    }
  }
};
