const fs = require('fs');
const { prefix } = require('../../config/config.js');
const { findKey, checkPokemon } = require('../../files/scripts/functions.js');


function findShinyhunt(obj, user) {
	const keys = Object.keys(obj);
	for(let i=0; i<keys.length; i++) { // Check if is in shinyhunt
		let current = obj[keys[i]];
		if(current.includes(user))
			return keys[i];

		if(i==keys.length-1)
			return false;
	}
}

function verify(obj, key) { // If do not have -> return false
	if(obj && obj.includes(key))
		return true
	return false
}

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
		let obj = JSON.parse(data);

		const shinyhunt = findShinyhunt(obj, user); // Current shinyhunt
		if(!pokemon) {
			if(!shinyhunt) 
				return message.channel.send(`Você ainda não definiu seu shinyhunt \nDigite \`${prefix}sh <pokemon>\``);
			return message.channel.send(`Você está em uma shinyhunt de \`${shinyhunt}\``);
		}
		pokemon = pokemon.toLowerCase();
			
		if(!checkPokemon(pokemon)) // If pokemon do not exist
			return message.channel.send(`Não conheço nenhum pokemon chamado \`${pokemon}\` \nDigite o nome do pokemon em inglês, por favor`);
		if(pokemon==shinyhunt) // If is the same
			return message.channel.send("Você já está em uma shinyhunt desse pokemon");


		if(obj[shinyhunt]) { // If user has shinyhunt
			let index = obj[shinyhunt].indexOf(user);
			obj[shinyhunt].splice(index); // Removing user from current shinyhunt array
		}

		if(obj.hasOwnProperty(pokemon)) // If pokemon array alredy exist
			obj[pokemon].push(user);// Adding user to existent pokemon array
		else
			obj[pokemon] = [user]; // Adding new pokemon arra


		let json = JSON.stringify(obj, null, 1);
		fs.writeFileSync(`files/database/shinyhunt.json`, json);

		return message.channel.send(`Agora você será notificado quando um \`${pokemon}\` aparecer`);

	}
};

