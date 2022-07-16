const { MessageEmbed } = require("discord.js");
const ee = require("../../config/embed.json");

const { PERMISSIONS_INTEGER } = require("../../config/config.js");

module.exports = {
	name: "invite",
	category: "Bot",
	aliases: ["link"],
	usage: "invite",
	description: "Invite link to add me to your server!",
	run: async (client, message) => {
		let embed = new MessageEmbed()
			.setTitle("Seriously?")
			.setDescription(`Use this [link](https://discord.com/oauth2/authorize/?permissions=${PERMISSIONS_INTEGER}&scope=bot&client_id=${client.user.id}) ◄`)
			.setColor(ee.color);
		message.reply({ embeds: [embed] });
	}
};
