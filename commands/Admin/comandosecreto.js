const { MessageEmbed } = require("discord.js");
const ee = require("../../config/embed.json");

const fs = require('fs');
module.exports = {
	name: "comandosecreto",
	category: "",
	aliases: [],
	usage: "",
	whitelistOnly: true,
	run: async (client, message) => {
		let data = JSON.parse(fs.readFileSync('files/database/shinyhunt.json', 'utf-8'));

		let embed = new MessageEmbed()
			.setColor(ee.color);

		var keys = dataect.keys(data);
		for(let i = 0; i < keys.length; i++) {
			embed.addField("\u200B", `User: <@${data[keys[i]]}> \nShinyhunt: **${keys[i]}**`, false);
		}

		message.channel.send({ embeds: [embed]});
	}
};
