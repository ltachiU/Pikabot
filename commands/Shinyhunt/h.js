const { MessageEmbed } = require("discord.js");
const ee = require("../../config/embed.json");

const fs = require('fs');
const pokedex = require("../../files/database/statics/pokedex.json");
const { similar, findIndicesOfMax } = require('../../files/scripts/functions.js');

const { PERMISSIONS_INTEGER } = require("../../config/config.js");


module.exports = {
	name: "h",
	category: "",
	aliases: [],
	usage: "",
	whitelistOnly: true,
	run: async (client, message, hint) => {
		let data = JSON.parse(fs.readFileSync('files/database/shinyhunt.json', 'utf-8'));

		// Same values and index
		// I know, there is a better way to do that, but I can do that later
		var pokemons = [], values = [];

		for(let i = 0; i < pokedex.length; i++) {
			let pokemon = pokedex[i]['name']['english']; // Add all pokemons in array
			let value = similar(hint.replace(/[.\/\\]/g, "").toLowerCase(), pokemon.toLowerCase()); // Add all percents in array

			pokemons.push(pokemon); values.push(value);
		};


		const indices = findIndicesOfMax(values, 3); // Get first 3 index
		var results = "";

		for (let i=0; i<3; i++) {
			var shinyhunters = " ";
			const users = data[pokemons[indices[i]].toLowerCase()];

			// console.log(shinyhunters)
			if(users) { // If have shinyhunters for this pokemon
				for(let i=0; i<users.length; i++) // Add all shinyhunters
					shinyhunters +=`<@${users[i]}> `;
			}

			let percent = values[indices[i]];
			if(i==0 || percent<=40) // Add first hint, if next hint is lower or equal to 40 add more hint
				results+=`**${pokemons[indices[i]]}** (${percent}%) ${shinyhunters}\n`;
		};


		let embed = new MessageEmbed() // setando variavel antes pra completar com o FOR
			.setAuthor({ name: 'Pikabot#7873', url: `https://discord.com/oauth2/authorize/?permissions=${PERMISSIONS_INTEGER}&scope=bot&client_id=${client.user.id}` })
			.setDescription(`Results for **${hint}** \n${results}`)
			.setColor(ee.color);
		message.channel.send({ embeds: [embed]});



	}
};
