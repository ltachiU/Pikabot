const fs = require('fs');
const { prefix } = require('../../config/config.js');
const { findKey, checkPokemon } = require('../../files/scripts/functions.js');

module.exports = {
	name: "shinyhunt",
	category: "Shinyhunt",
	aliases: ["sh"],
	usage: "sh [pokemon]",
	description: "Adiciona um pokemon à sua shinyhunt, toda vez que alguem falar o nome desse pokemon eu vou te chamar para você poder capturar ele.",
	run: async (client, message, args) => {
		const user = message.author.id;
		var pokemon = args[0];

		let data = fs.readFileSync('files/database/shinyhunt.json', 'utf-8');
		var obj = JSON.parse(data);
		let key = findKey(obj, user);

		// View
		if(!pokemon) {
			if(!key) {
				return message.channel.send(`Você ainda não definiu seu shinyhunt \nDigite \`${prefix}sh <pokemon>\``);
			}
			return message.channel.send(`Você está em uma shinyhunt de \`${key}\``);
		}
		pokemon = pokemon.toLowerCase();
			
		if(!checkPokemon(pokemon))
			return message.channel.send(`Não conheço nenhum pokemon chamado \`${pokemon}\` \nDigite o nome do pokemon em inglês, por favor`);

		if(key==pokemon)
			return message.channel.send("Você já está em uma shinyhunt desse pokemon");

		// Just check if is in some shinyhunt
		if(key) {
			const index = obj[key].indexOf(user);
			obj[key].splice(index); // Removing from array
		};

		// Add
		if(!obj.hasOwnProperty(pokemon))
			obj[pokemon] = [user]; // Adding in another
		else
			obj[pokemon].push(user);

		let json = JSON.stringify(obj, null, 1);
		fs.writeFileSync(`${write}shinyhunt.json`, json);

		return message.channel.send(`Agora você será notificado quando um \`${pokemon}\` aparecer`);

	}
};
