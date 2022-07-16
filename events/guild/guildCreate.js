const { prefix } = require("../../config/config.js");

const { MessageEmbed } = require('discord.js');
const ee = require('../../config/embed.json');

module.exports = async (client, guild) => {
	var defaultChannel;
	let channels = guild.channels.cache;

	for(const channel of channels.values()) {
		if(channel.type=="GUILD_TEXT") {
			defaultChannel = channel;
			break;
		} else { continue; }
	}
	let channel = (guild.systemChannel) ? guild.systemChannel : defaultChannel;

	let embed = new MessageEmbed()
		.setTitle("Thanks for addingme on your server! :)")
		.setDescription(`I'm Pikabot, to see my commands type \`${prefix}help\`
			\nUse the \`${prefix}add\` command to add a channel to the channel that I can send message!
			\nUse the \`${prefix}sh <pokemon>\` command to set your shinyhunt
			\nWhen the shinyhunthunt is set, just type the pokémon name and I will call you! Only on set channels!`)
		.setColor(ee.color)
		.setTimestamp();
	return channel.send({ embeds: [embed] });
};
