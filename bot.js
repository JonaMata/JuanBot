const Config = require('./config.json');
const Discord = require('discord.js');
const Enmap = require('enmap');
const fs = require('fs');
const cassette = require('cassette');
const ytdl = require('ytdl-core');
const client = new Discord.Client();

client.on('ready', () => {
	console.log(`\n\nLogged in as ${client.user.tag}!`);
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


process.on('uncaughtException', (err) => {
	console.log(`Caught exception: ${err}`);
});


client.login(Config.token);
