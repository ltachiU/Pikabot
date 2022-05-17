const { MessageEmbed } = require('discord.js');
const ee = require('../../config/embed.json');

module.exports = {
	name: "shcalc",
	category: "Pokemon",
	aliases: ["calcsh", "calc"],
	usage: "shcalc <shinyChain>",
	description: "Vou calcular para você a sua atual chance de pegar o shiny da sua shiny hunt (Com base nos códigos do <@716390085896962058>)",
	run: async (client, message, args) => {

		const shinyChain = args[0]

		if(!shinyChain) return message.channel.send("Acho que você esqueceu alguma coisa ai!");
		if(isNaN(shinyChain)) return message.channel.send("Tenta digitar um número por favor");


		var shMultiplier = 1 + Math.log(1 + shinyChain / 30)
		let shMultiplierFormated = shMultiplier.toFixed(6) + "%"

		var scPercent = (shMultiplier*(20/100)) + shMultiplier
		let scPercentFormated = scPercent.toFixed(6) + "%"

		let embed = new MessageEmbed()
			.setTitle("Sua Shiny Chance")
			.addField("Shiny Hunt", shMultiplierFormated, false)
			.addField("Shiny Hunt + Shiny Charm", scPercentFormated, false)
			.setColor(ee.color);
		message.channel.send({ embeds: [embed] });

	},
}
