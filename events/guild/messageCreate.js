const { MessageEmbed } = require('discord.js');
const ee = require('../../config/embed.json');

const config = require("../../config/config.js");
const { prefix, NECESSARY_PERMISSIONS } = require("../../config/config.js"); // loading config file with token and prefix, and settings
const { whitelistCheck } = require("../../files/scripts/whitelist-check.js");

function escapeRegex(str) {
	return str.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
};

module.exports = async (client, message) => {
	// if(message.author.bot) return; // If the message  author is a bot, return
	if(!message.guild) return; // If the message is not in a guild (aka in dms), return
	if(message.channel.partial) await message.channel.fetch(); // If the channel is on partial fetch it
	if(message.partial) await message.fetch(); // If the message is on partial fetch it
	

	/** @HintCommand */
	const fs = require('fs');
	const { checkChannel } = require('../../files/scripts/functions.js');

	const msg = message.content.toLowerCase();
	const server = message.guild.id;
	const channel = message.channel.id;

	if(msg=="pika")
		return message.channel.send("Pika pika");

	// h.js
	if(message.author.id=="716390085896962058" && msg.includes("the pokémon is")) {
		// Get pokemon hint
		const hint = msg.split(' ').at(-1); // Split in string, Get Last item

		// +150
		setTimeout(() => {
			let command = client.commands.get('h');
			command.run(client, message, hint);
		}, Math.round(client.ws.ping)+100);

		return;
		console.log("Continua");
	};

	// Shinyhunt call 
	fs.readFile('files/database/shinyhunt.json', function readFileCallback(err, data) {
		let obj = JSON.parse(data);
		const users = obj[msg];
		
		// Check if pokemon has shinyhunt
		if(!users || users.length==0)
			return;

		// Check channel
		if(!checkChannel(server, channel))
			return;

		// Add shinyhunters to message
		let shinyhunters = "";
		for(let i=0; i<users.length; i++)
			shinyhunters+=`<@${users[i]}>, `;

		return message.channel.send(`${shinyhunters}vem aqui seu corno!`);
	});
	/** @HintCommandEnd */




	const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`); // The prefix can be a Mention of the Bot / The defined Prefix of the Bot
	if(!prefixRegex.test(message.content)) return; // If its not that then return
	
	const [, matchedPrefix] = message.content.match(prefixRegex); // Now define the right prefix either ping or not ping
	const args = message.content.slice(matchedPrefix.length).trim().split(/ +/); // Create the arguments with sliceing of of the rightprefix length
	const cmd = args.shift().toLowerCase(); // Creating the cmd argument by shifting the args by 1
	
	// If no cmd added return error
	if(cmd.length === 0) {
		if(matchedPrefix.includes(client.user.id))
			return message.channel.send(`Wanna see my commands? Type \`${prefix}help\``)
		return;
	}


	let command = client.commands.get(cmd); // Get the command from the collection
	if(!command) command = client.commands.get(client.aliases.get(cmd)); // If the command does not exist, try to get it by his alias

	// If the command is now valid
	if(command) {
		// Check Necessary permissions
		for(let i=0; i<NECESSARY_PERMISSIONS.length; i++)  {
			let current = NECESSARY_PERMISSIONS[i];
			
			if(!message.channel.permissionsFor(client.user.id).has(current)) // Check Necessary permissions
				return message.channel.send(`I don't have the \`${current}\` permission`);
		}

		// Check Whitelist
		if(command.whitelistOnly && !whitelistCheck(message.author.id))
			return;


		// Finally, run the command with the parameters: client, message, args
		command.run(client, message, args)
		.catch((err) => {

			message.reply({ embeds: [ new MessageEmbed()
				.setTitle("Ops! An Error, sorry for that, try this command later")
				.setDescription(`\`\`\`${err.message}\`\`\``)
				.setFooter({ text: `Report this error with: ${prefix}report <message>` })
				.setTimestamp()
				.setColor(ee.wrongcolor) ]});
			console.log(err);
			
		});
	}
};
