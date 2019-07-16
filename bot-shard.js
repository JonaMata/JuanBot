require('dotenv').config();
const Config = process.env;

const Sentry = require('@sentry/node');
Sentry.init({ dsn: Config.SENTRYURL });

const Discord = require('discord.js');
const { CommandoClient } = require('discord.js-commando');
const path = require('path');
const Enmap = require('enmap');
const fs = require('fs');
const cassette = require('cassette');
const ytdl = require('ytdl-core');



const client = new CommandoClient({
	commandPrefix: Config.PREFIX,
	owner: Config.ADMINID,
	disableEveryone: true
});

client.registry
	.registerDefaultTypes()
	.registerGroups([
		['basic', 'Basic'],
		['music', 'Music'],
		['admin', 'Admin']
	])
	.registerDefaultGroups()
	.registerDefaultCommands()
	.registerCommandsIn(path.join(__dirname, 'commands'));

//const express = require('express');
const {Wit, log} = require('node-wit');

const { google } = require('googleapis');
client.youtube = google.youtube({ version: 'v3', auth: process.env.YOTUBEKEY});

client.shardClient = new Discord.ShardClientUtil(client);


//music bot variables
client.playlists = {};


client.on('ready', () => {
	console.log(`\n\nLogged in as ${client.user.tag}!`);
	client.user.setActivity('At your servies!');

	const port = parseInt(Config.PORT) + client.shardClient.id;
});


client.config = Config;

fs.readdir('./events/', (err, files) => {
	if (err) return console.error(err);
	files.forEach(file => {
		const event = require(`./events/${file}`);
		let eventName = file.split('.')[0];
		client.on(eventName, event.bind(null, client));
	});
});

client.login(Config.token);
