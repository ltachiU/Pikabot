const { MessageEmbed } = require('discord.js');
const ee = require('../../config/embed.json');

module.exports = {
	name: "shcalc",
	category: "Shinyhunt",
	aliases: ["calcsh", "calc"],
	usage: "shcalc <shiny-streak>",
	description: "A shiny calculator (This code is from Pokétwo)",
	run: async (client, message, args) => {

		const shiny_streak = args[0];

		if(!shiny_streak) return message.channel.send("You forget to type your shiny streak, dummy");
		if(isNaN(shiny_streak)) return message.channel.send("Please, type numbers :)");


		// NOTE math.log is the natural log (log base e)
		var shiny_hunt_multiplier = 1 + Math.log(1 + shiny_streak / 30);
		var chance = 1 / 4096;
	
		let shinyhunt_chance = chance * shiny_hunt_multiplier;
		let shinycharm_chance = chance * 1.2;
		let both_chance = shinyhunt_chance + shinycharm_chance;

		let embed = new MessageEmbed()
			.setTitle("Your shiny chance")
			.setDescription(`Your initial chance is \`${chance}\`, this number increase with shiny hunt and shiny charm \nYou get a shiny when the random number generated between **0** and **1** is lower than your chance`)
			.addField("Shiny Hunt", shinyhunt_chance.toString(), false)
			.addField("Shiny Charm", shinycharm_chance.toString(), false)
			.addField("Shiny Hunt + Shiny Charm", both_chance.toString(), false)
			.setFooter({ text: "This code is from Pokétwo" })
			.setColor(ee.color);
		message.channel.send({ embeds: [embed] });

	},
}
