const { MessageEmbed } = require("discord.js");
const ee = require("../../config/embed.json");

const fs = require('fs');
const pokemonsJson = require("../../files/database/statics/pokemons.json");
const { similar, findIndicesOfMax } = require('../../files/scripts/functions.js');
const { capitalize } = require('../../files/scripts/text-formatting.js');

module.exports = {
	name: "find",
	category: "Pokemon",
	aliases: ["achar"],
	usage: "find <pokemon>",
	description: "Não consegue lembrar o nome daquele pokemon? Digite o nome que você lembra e eu vou tentar achar",
	run: async (client, message, args) => {
		let shinyhunts = fs.readFileSync('files/database/shinyhunt', 'utf-8');
		let obj = JSON.parse(shinyhunts);

		// Desse jeito os valores e pokemons vão ser o mesmo index
		var pokemons = [];
		var values = [];

		const hint = capitalize(args[0]);
		for(let i = 0; i < pokemonsJson.length; i++) {
			let pokemon = pokemonsJson[i]['name']['english']; // Adicionar pokemon ao array
			let value = similar(hint, pokemon); // Adicionar porcentagem ao array

			pokemons.push(pokemon);
			values.push(value);
		};

		const indices = findIndicesOfMax(values, 3); // Pegar index dos três maiores valores
		var finalResult = ""
		for (let i = 0; i < indices.length; i++) {
			finalResult = finalResult+`**${pokemons[indices[i]]}** (${values[indices[i]]}%)\n`
		};

		let embed = new MessageEmbed() // setando variavel antes pra completar com o FOR
			.setAuthor({ name: 'Pikabot#7873', iconURL: client.user.displayAvatarURL(), url: 'https://discord.com/oauth2/authorize?client_id=894390284698411099&permissions=8&scope=bot' })
			.setDescription(`Talvez seja um desses: \n${finalResult}`)
			.setColor(ee.color);

		message.channel.send({ embeds: [embed]});
	}
};
