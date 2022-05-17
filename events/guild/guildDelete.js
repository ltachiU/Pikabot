const fs = require('fs');
module.exports = async (client, guild) => {
	// Getting json
	let data = fs.readFileSync('files/database/servers.json', 'utf-8');
	let obj = JSON.parse(data);

	delete obj[guild.id]

	let json = JSON.stringify(obj, null, 1);
	fs.writeFileSync('files/database/channels.json', json); // Saving
};


