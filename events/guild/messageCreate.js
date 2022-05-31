const config = require("../../config/config.js");

function escapeRegex(str) {
	return str.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
};

module.exports = async (client, message) => {
	if(!message.guild) 
		return; // if the message is not in a guild (aka in dms), return aka ignore the inputs
	// if(message.author.bot) return; // if the message  author is a bot, return aka ignore the inputs
	if(message.channel.partial) await message.channel.fetch(); // if the channel is on partial fetch it
	if(message.partial) await message.fetch(); // if the message is on partial fetch it

	/**
	 * 
	 * @MessageCommands
	 * 
	 * */
	const fs = require('fs');
	const { checkChannel } = require('../../files/scripts/functions.js');
	const { capitalize } = require('../../files/scripts/text-formatting.js');

	const msg = message.content.toLowerCase();
	const server = message.guild.id;
	const channel = message.channel.id;

	if(msg=="pika")
		return message.channel.send("Pika pika");

	// h.js
	if(message.author.id=="716390085896962058" && msg.includes("the pokémon is")) {
		// Check channel
		// if(!checkChannel(server, channel)) return;

		// Get pokemon hint
		const hint = msg.slice(0, -1).split(' ').at(-1); // Remove last character, Split in string, Get Last item

		//+150
		setTimeout(() => {
			let command = client.commands.get('h');
			command.run(client, message, hint);
		}, Math.round(client.ws.ping)+100);
		// sleep(Math.round(client.ws.ping)+100); // Cooldown
		return;
	};

	// Shinyhunt call 
	fs.readFile('files/database/shinyhunt.json', function readFileCallback(err, data) {
		let obj = JSON.parse(data);
		
		// Checa se existe shinyhunt do pokemon
		const users = obj[msg];
		if(!obj[msg] || obj[msg].length==0) return;

		// Check channel
		if(!checkChannel(server, channel)) return;

		let shinyhunters = "";
		for(let i=0; i<users.length; i++)
			shinyhunters = shinyhunters+`<@${users[i]}>, `;
		return message.channel.send(`${shinyhunters}vem aqui seu corno!`);
	});

	// Para não conseguir rodar esse comando
	if(msg==`${config.prefix}h`) return;

	/**
	 * 
	 * @EndMessageCommands
	 * 
	 * */

	let prefix = config.prefix; // get the current prefix from the botconfig/config.json
	const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`); // the prefix can be a Mention of the Bot / The defined Prefix of the Bot
	if(!prefixRegex.test(message.content)) return; // if its not that then return

	const [, matchedPrefix] = message.content.match(prefixRegex); // now define the right prefix either ping or not ping
	const args = message.content.slice(matchedPrefix.length).trim().split(/ +/); // create the arguments with sliceing of of the rightprefix length
	const cmd = args.shift().toLowerCase(); // creating the cmd argument by shifting the args by 1

	// if no cmd added return error
	if(cmd.length === 0) {
		if(matchedPrefix.includes(client.user.id))
			return message.channel.send(`Para ver meus comandos use \`${prefix}help\``)
		return;
	}


	let command = client.commands.get(cmd); // get the command from the collection
 
	// if the command does not exist, try to get it by his alias
	if(!command) command = client.commands.get(client.aliases.get(cmd));
	
	// if the command is now valid
	if(command) {
		if(command.whitelistOnly) {
			const { whitelistCheck } = require("../../files/scripts/whitelist-check.js");
			if(!whitelistCheck(message.author.id)) return;
		}
		// run the command with the parameters: client, message, args
		command.run(client, message, args)
		.catch((err) =>
			message.reply(`Ops! Um erro ocorreu, desculpe por isso \n\`\`\`${err.message}\`\`\``)
		);
	}
};
