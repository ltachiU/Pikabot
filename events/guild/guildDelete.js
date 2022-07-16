const fs = require('fs');
module.exports = async (client, guild) => {
	let data = JSON.parse(fs.readFileSync('files/database/servers.json', 'utf-8')); // Getting json

	delete data[guild.id]

	let json = JSON.stringify(data, null, 1);
	fs.writeFileSync('files/database/channels.json', json); // Saving
};


