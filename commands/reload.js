const fs = require('fs');
exports.run = (client, msg, args) => {
  //Loading modules
  client.modules.deleteAll();

  fs.readdir('./modules/', (err, files) => {
  	console.log('\n\nLoading modules\n');
  	if (err) return console.error(err);
  	files.forEach(file => {
  		if (!file.endsWith('.js')) return;
  		let props = require(`../modules/${file}`);
  		let moduleName = file.split('.')[0];
  		console.log(`Loading module ${moduleName}`);
  		client.modules.set(moduleName, props);
  	});
  });

  //Loading commands
  client.commands.deleteAll();

  fs.readdir('./commands/', (err, files) => {
  	console.log('\n\nLoading commands\n');
  	if (err) return console.error(err);
  	files.forEach(file => {
  		if (!file.endsWith('.js')) return;
  		let props = require(`../commands/${file}`);
  		let commandName = file.split('.')[0];
  		console.log(`Loading command ${commandName}`);
  		client.commands.set(commandName, props);
  	});
  });
};
