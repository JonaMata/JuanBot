require('dotenv').config();
const Config = process.env;

const Sentry = require('@sentry/node');
Sentry.init({ dsn: Config.SENTRYURL });

const Discord = require('discord.js');
const Enmap = require('enmap');
const fs = require('fs');
const cassette = require('cassette');
const ytdl = require('ytdl-core');
const client = new Discord.Client();
//const express = require('express');
const {Wit, log} = require('node-wit');

client.shardClient = new Discord.ShardClientUtil(client);


//music bot variables
client.playlists = {};


client.on('ready', () => {
	console.log(`\n\nLogged in as ${client.user.tag}!`);
	client.user.setActivity('At your servies!');

	const port = parseInt(Config.PORT) + client.shardClient.id;

	/*
	const server = app.listen(port, () => {
	  console.log(`Web server running on port ${port}`);
	});
	*/
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

//Loading modules
/*
client.modules = new Enmap();

fs.readdir('./modules/', (err, files) => {
	console.log('\n\nLoading modules\n');
	if (err) return console.error(err);
	files.forEach(file => {
		if (!file.endsWith('.js')) return;
		let props = require(`./modules/${file}`);
		let moduleName = file.split('.')[0];
		console.log(`Loading module ${moduleName}`);
		client.modules.set(moduleName, props);
	});
});
*/

//Loading commands
client.commands = new Enmap();

fs.readdir('./commands/', (err, files) => {
	console.log('\n\nLoading commands\n');
	if (err) return console.error(err);
	files.forEach(file => {
		if (!file.endsWith('.js')) return;
		let props = require(`./commands/${file}`);
		let commandName = file.split('.')[0];
		console.log(`Loading command ${commandName}`);
		client.commands.set(commandName, props);
	});
});

/*
process.on('uncaughtException', (err) => {
	console.log(`Caught exception: ${err}`);
});
*/

client.login(Config.token);


/*
const app = express();
app.set('view engine', 'pug');

app.get('/*', (req, res) => {
  file = (req.url == '/') ? '/index' : req.url;
	if (file == '/index.php') file = '/index';
  var members = [];
	client.guilds.array().forEach((guild) => {
		guild.members.array().forEach(member => {
			if (member.presence.status == 'online' && !member.user.bot) members.push(member.user.username);
		});
	});
	members = Array.from(new Set(members));
  res.render(__dirname + '/web' + file, {title: 'JuanBot Online users list', members: members});
});
*/


/*
client.witClient = new Wit({
	accessToken: Config.witAccessToken,
	logger: new log.Logger(log.DEBUG)
});
*/
