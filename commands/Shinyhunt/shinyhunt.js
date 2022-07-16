const fs = require('fs');
const { prefix } = require('../../config/config.js');
const { findKey, checkPokemon } = require('../../files/scripts/functions.js');


function findShinyhunt(data, user) {
	const keys = dataect.keys(data);
	for(let i=0; i<keys.length; i++) { // Check if is in shinyhunt
		let current = data[keys[i]];
		if(current.includes(user))
			return keys[i];

		if(i==keys.length-1)
			return false;
	}
}

function verify(data, key) { // If do not have -> return false
	if(data && data.includes(key))
		return true
	return false
}

module.exports = {
	name: "shinyhunt",
	category: "Shinyhunt",
	aliases: ["sh"],
	usage: "sh [pokemon]",
	description: "Add a pokémon as shinyhunt, I call you to catch it",
	run: async (client, message, args) => {
		const user = message.author.id;
		var pokemon = args[0];

		let data = JSON.parse(fs.readFileSync('files/database/shinyhunt.json', 'utf-8'));

		const shinyhunt = findShinyhunt(data, user); // Current shinyhunt
		if(!pokemon) {
			if(!shinyhunt) 
				return message.channel.send(`You don't have a shinyhunt \nType \`${prefix}sh <pokemon>\``);
			return message.channel.send(`Your shinyhunt is \`${shinyhunt}\``);
		}
		pokemon = pokemon.toLowerCase();
			
		if(!checkPokemon(pokemon)) // If pokemon do not exist
			return message.channel.send(`What is \`${pokemon}\`? \nType a pokémon name, please`);
		if(pokemon==shinyhunt) // If is the same
			return message.channel.send("You alredy is shinyhunting this pokémon");


		if(data[shinyhunt]) { // If user has shinyhunt
			let index = data[shinyhunt].indexOf(user);
			data[shinyhunt].splice(index); // Removing user from current shinyhunt array
		}

		if(data.hasOwnProperty(pokemon)) // If pokemon array alredy exist
			data[pokemon].push(user);// Adding user to existent pokemon array
		else
			data[pokemon] = [user]; // Adding new pokemon array


		let json = JSON.stringify(data, null, 1);
		fs.writeFileSync(`files/database/shinyhunt.json`, json);

		return message.channel.send(`Now you are shinyhunting \`${pokemon}\`, if someone type its name, I will call you to catch it`);

	}
};

