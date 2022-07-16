const { MessageEmbed } = require("discord.js");
const ee = require("../../config/embed.json");

const { prefix } = require("../../config/config.js");

module.exports = {
	name: "help",
	category: "Bot",
	aliases: ["commands"],
	usage: "help [command]",
	run: async (client, message, args) => {
		if(args[0]) {

			const search = args[0].toLowerCase();
			const cmd = client.commands.get(search) || client.commands.get(client.aliases.get(search));

			if(!cmd) // Command not found
				return message.reply("No command with this name found :(");

			const embed = new MessageEmbed().setColor(ee.color);

			if(cmd.name) {
				embed.addField("**Command**", `\`${cmd.name}\``);
				embed.setTitle(`Detailed Information about: \`${cmd.name}\``);
			}
			if(cmd.description) // If command don't have description don't add
				embed.addField("**Description**", `\`${cmd.description}\``);


			let aliases = cmd.aliases.map((al) => `${al}`).join("`, `");
			if(cmd.aliases && aliases.length>0)
				embed.addField("**Aliases**", `\`${aliases}\``);

		
			if(cmd.usage) {
				embed.addField("**Usage**", `\`${prefix}${cmd.usage}\``);
				embed.setFooter({ text: `<> - Obrigatory Argument \n[] - Optional Argument` });
			}

			return message.channel.send({ embeds: [embed] });
		} else { // No args
			const embed = new MessageEmbed()
				.setTitle("HELP MENU 🦜 Commands")
				.setThumbnail(client.user.displayAvatarURL())
				.setFooter({ text: `To see a command's information, type ${prefix}help [command]`, icon_url: [client.user.displayAvatarURL()] })
				.setColor(ee.color);

			const commands = (category) => {
				return client.commands.filter((cmd) => cmd.category === category).map((cmd) => `\`${cmd.name}\``);
			};
			
			for(let i = 0; i < client.categories.length; i += 1) {
				const current = client.categories[i]; // Category
				const items = commands(current); // Commands
				if(items.length==0) 
					continue;

				// embed.addField(`**${current.toUpperCase()} [${items.length}]**`, `${items.join(" ")}`, false);
				embed.addField(`\u200B`, `**${current.toUpperCase()} [${items.length}]** \n${items.join(" ")}`, false);
			};
			return message.channel.send({ embeds: [embed] });
		};

	}
};
