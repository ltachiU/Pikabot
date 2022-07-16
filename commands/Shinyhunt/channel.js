const fs = require('fs');
const { prefix } = require('../../config/config.js');
const { whitelistCheck } = require('../../files/scripts/whitelist-check.js');

module.exports = {
	name: "channel",
	category: "Shinyhunt",
	aliases: [],
	usage: "channel <add | remove>",
	description: "Add or remove the current channel",
	run: async (client, message,args) => {
		const server = message.guild.id;
		const channel = message.channel.id;

		if(!message.member.permissions.has('MANAGE_MESSAGES') && !whitelistCheck(message.author.id))
			return message.channel.send("You don't have permission to use this command, Idiot");

		let data = JSON.parse(fs.readFileSync('files/database/channels.json', 'utf-8'));

		if(!args[0])
			return message.reply(`To add the current channel type ${prefix}channel add \nTo remove type ${prefix}channel remove`)

		let arg = args[0].toLowerCase()
		if(arg=="add") {
			// If channel is not added
			if(!data.hasOwnProperty(server))
				data[server] = ({ "channels":[] }); // Adding array

			// Check if channel is added
			if(data[server]['channels'].includes(channel))
				message.channel.send("This channel alredy is added! Idiot");
			
			data[server]['channels'].push(channel); // Add

			message.channel.send("Channel added!");

		} else if(["remove", "rem", "delete", "del"].includes(arg)) {
			if(!data.hasOwnProperty(server))
				message.channel.send("This server has no channels added!");

			// Checking if channel alredy is added
			if(!data[server]['channels'].includes(channel)) 
				message.channel.send("This channel is not added!");

			const index = data[server]['channels'].findIndex(x => x === channel) // Get current channel index
			data[server]['channels'].splice(index); // Remove

			
			message.channel.send("This channel was removed! \nI will not send messages here!");

		} else {
			return message.reply(`To add the current channel type ${prefix}channel add \n To remove type ${prefix}channel remove`)
		}

		// Save
		let json = JSON.stringify(data, null, 1);
		fs.writeFileSync(`files/database/channels.json`, json);
			

	},
}
