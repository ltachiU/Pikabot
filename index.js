const express = require('express');
const app = express();
app.get("/", (request, response) => {
	const ping = new Date();
	ping.setHours(ping.getHours() - 3);
	console.log(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
	response.sendStatus(200);
});
app.listen(process.env.PORT); // Recebe solicitações que o deixa on

const { Client, Intents, Collection } = require('discord.js');
const fs = require("fs");

const client = new Client({
	partials: ["CHANNEL"],
	intents: [
		Intents.FLAGS.GUILDS, 
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
		Intents.FLAGS.DIRECT_MESSAGES,
		// Intents.FLAGS.DIRECT_MESSAGE_TYPING
	],
});

// Client variables to use everywhere
client.commands = new Collection(); // An collection (like a digital map(database)) for all your commands
client.aliases = new Collection(); // An collection for all your command-aliases
client.events = new Collection();
client.categories = fs.readdirSync("./commands/"); // Categories

// Loading files, with the client variable like Command Handler, Event Handler, ...
["command", "events"].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});

// Login into the bot
const { TOKEN } = require('./config/config.js');
client.login(TOKEN)

