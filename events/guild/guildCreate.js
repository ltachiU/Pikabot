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
		.setTitle("Muito Obrigado por me adicionar! :)")
		.setDescription(`Para saber meus comandos digite \`${prefix}help\`
			\nUse o comando \`${prefix}add\` no canal desajado, para adicionar-lo à lista de canais em que posso avisar os shinyhunts!
			\nUse o comando \`${prefix}sh <pokemon>\` para setar seu shinyhunt
			\nCom o shinyhunt setado, basta digitar o nome do pokemon, que eu irei chamar para você capturá-lo!`)
		.setColor(ee.color)
		.setTimestamp();
	return channel.send({ embeds: [embed] });
};


