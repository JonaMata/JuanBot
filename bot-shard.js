require('dotenv').config();
const Config = process.env;

const Sentry = require('@sentry/node');
Sentry.init({ dsn: Config.SENTRYURL });

const Discord = require('discord.js');
const { CommandoClient, SQLiteProvider } = require('discord.js-commando');
const path = require('path');
const fs = require('fs');
const sqlite = require('sqlite');

const Lyricist = require('lyricist');

const client = new CommandoClient({
	commandPrefix: Config.PREFIX,
	owner: Config.ADMINID,
	disableEveryone: true,
	commandEditableDuration: 0
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

client.setProvider(
	sqlite.open(path.join(__dirname, 'settings.sqlite3')).then(db => new SQLiteProvider(db))
).catch(console.error);

client.shardClient = new Discord.ShardClientUtil(client);

//music bot variables
client.playlists = {};
client.lyricist = new Lyricist(Config.GENIUSTOKEN);

client.on('ready', () => {
	console.log(`\n\nLogged in as ${client.user.tag}!`);
	client.user.setActivity('At your servies!');
});

fs.readdir('./events/', (err, files) => {
	if (err) return console.error(err);
	files.forEach(file => {
		const event = require(`./events/${file}`);
		let eventName = file.split('.')[0];
		client.on(eventName, event.bind(null, client));
	});
});

client.config = Config;
client.login(Config.token);
