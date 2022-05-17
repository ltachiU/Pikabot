const { MessageEmbed } = require("discord.js");
const ee = require("../../config/embed.json");

const fs = require('fs');
module.exports = {
	name: "comandosecreto",
	category: "",
	aliases: [],
	usage: "None",
	description: "None",
	whitelistOnly: true,
	run: async (client, message) => {
		let data = fs.readFileSync('files/database/shinyhunt.json', 'utf-8');
		let obj = JSON.parse(data);

		let embed = new MessageEmbed()
			.setColor(ee.color);

		var keys = Object.keys(obj);
		for(let i = 0; i < keys.length; i++) {
			embed.addField("\u200B", `Usuário: <@${obj[keys[i]]}> \nShinyhunt: **${keys[i]}**`, false);
		}

		message.channel.send({ embeds: [embed]});
	}
};
