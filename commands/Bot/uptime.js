const { MessageEmbed } = require("discord.js");
const ee = require("../../config/embed.json");

function duration(ms) {
	const sec = Math.floor((ms / 1000) % 60).toString();
	const min = Math.floor((ms / (60 * 1000)) % 60).toString();
	const hrs = Math.floor((ms / (60 * 60 * 1000)) % 60).toString();
	const days = Math.floor((ms / (24 * 60 * 60 * 1000)) % 60).toString();
	return `\`${days} Days\`,\`${hrs} Hours\`,\`${min} Minutes\`,\`${sec} Seconds\``;
}

module.exports = {
	name: "uptime",
	category: "Bot",
	aliases: [],
	usage: "uptime",
	description: "How many time I'm awake",
	run: async (client, message) => {

		let embed = new MessageEmbed()
			.setTitle(`:white_check_mark: **${client.user.username}** is since:\n ${duration(client.uptime)} online`)
			.setFooter({ text: ee.footertext, icon_url: [ee.footericon] })
			.setColor(ee.color)

		return message.channel.send({ embeds: [embed] });
	}
};
