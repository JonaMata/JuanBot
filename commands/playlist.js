exports.run = (client, msg, args) => {
  if (client.playlists[msg.guild.id] === undefined) return msg.channel.sendMessage(`Add some songs to the playlist first with ${client.config.PREFIX}add`);
	let tosend = [];
	client.playlists[msg.guild.id].songs.forEach((song, i) => { tosend.push(`${i+1}. ${song.title} - Requested by: ${song.requester}`);});
	msg.channel.sendMessage(`__**${msg.guild.name}'s Music Queue:**__ Currently **${tosend.length}** songs queued ${(tosend.length > 15 ? '*[Only next 15 shown]*' : '')}\n\`\`\`${tosend.slice(0,15).join('\n')}\`\`\``);
};
