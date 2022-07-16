const { readdirSync } = require("fs");
var allcommands = []; // Just to count commands

module.exports = (client) => {
	readdirSync("./commands/").forEach((dir) => {
		const commands = readdirSync(`./commands/${dir}/`).filter((file) => file.endsWith(".js"));
		for (let file of commands) {
			// let pull = require(`../commands/${dir}/${file}`);
			try{ var pull = require(`../commands/${dir}/${file}`); } catch(err){ console.log(err) };
			if(pull.name) {
				client.commands.set(pull.name, pull);
				allcommands.push(file);
			} else {
				console.log("-", file, `Error -> missing a help.name, or help.name is not a string.`);
				continue;
			}
			if(pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach((alias) => client.aliases.set(alias, pull.name));
		}
	});
	console.log(`\n- Loaded ${allcommands.length} Commands -\n`);
};
