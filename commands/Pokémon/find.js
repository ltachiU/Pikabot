const { MessageEmbed } = require("discord.js");
const ee = require("../../config/embed.json");

const pokedex = require("../../files/database/statics/pokedex.json");
const { similar, findIndicesOfMax } = require('../../files/scripts/functions.js');

module.exports = {
	name: "find",
	category: "Pokémon",
	aliases: ["search"],
	usage: "find <pokemon>",
	description: "Don't rember that pokémon name? Maybe I can help you! :)",
	run: async (client, message, args) => {
		// Same values and index
		// I know, there is a better way to do that, but I can do that later
		var pokemons = [], values = [];

		for(let i = 0; i < pokedex.length; i++) {
			let pokemon = pokedex[i]['name']['english']; // Add pokémon to array
			let value = similar(args.join(' ').toLowerCase(), pokemon.toLowerCase());          // Add pokémon percentage

			pokemons.push(pokemon); values.push(value);
		};

		const indices = findIndicesOfMax(values, 3); // Get the three highest values
		var finalResult = ""
		for (let i = 0; i < indices.length; i++)
			finalResult += `**${pokemons[indices[i]]}** (${values[indices[i]]}%)\n`

		let embed = new MessageEmbed()
			.setDescription(`Maybe one of these? \n${finalResult}`)
			.setColor(ee.color);
		message.channel.send({ embeds: [embed]});
	}
};
