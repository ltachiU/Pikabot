const { MessageEmbed } = require("discord.js");
const ee = require("../../config/embed.json");

module.exports = {
    name: "invite",
    category: "Information",
    aliases: ["enviar", "link"],
    usage: "invite",
    description: "Quer me adicionar no seu servidor?",
    run: async (client, message) => {

		let embed = new MessageEmbed()
			.setAuthor({ name: 'Pikabot#7873', iconURL: client.user.displayAvatarURL(), url: 'https://discord.com/oauth2/authorize?client_id=894390284698411099&permissions=8&scope=bot' })
			.setTitle("Invite")
			.setDescription("Use esse [link](https://discord.com/oauth2/authorize?client_id=894390284698411099&permissions=8&scope=bot) para me adicionar no seu servidor :)")
			.setColor(ee.color);
		message.channel.send({ embeds: [embed] });
  }
};
