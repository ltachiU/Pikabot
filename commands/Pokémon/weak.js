// Verde,Azul escuro,Rosa,Roxo,Branco, preto


const { MessageEmbed } = require('discord.js');
const ee = require('../../config/embed.json');

const { capitalize, clearSpaces } = require('../../files/scripts/text-formatting.js');
const { checkPokemon } = require('../../files/scripts/functions.js');
const chart = require('../../files/database/statics/types-weak.json');
const pokedex = require('../../files/database/statics/pokedex.json');

module.exports = {
	name: "weak",
	category: "Pokémon",
	aliases: [],
	usage: "weak <type> [, type]",
	description: "See the pokémon/type's WEAK",
	run: async (client, message, args) => {
				
		const info = args.slice(0).join(' ').split(","); // Separete args by comma
		const types = Object.keys(chart); // All types in array

		// PRIMARY
		var PRIMARY   = clearSpaces(info[0]);
		var SECONDARY = clearSpaces(info[1]);
		var TITLE;
		var IMAGE;

		// Check if has argument
		if(!PRIMARY)
			return message.reply("Type at least one **type** or **pokémon**, english please ;)");

		// Check pokemon
		let pokemon = checkPokemon(PRIMARY);
		if(pokemon) { // Is a pokémon
			IMAGE = `https://www.serebii.net/pokemongo/pokemon/${pokemon['id']}.png`
			PRIMARY = pokemon['type'][0];
			SECONDARY = (pokemon['type'].length==1) ? false : pokemon['type'][1];
		}

		// Check two
		PRIMARY=PRIMARY.toLowerCase()
		if(!types.includes(PRIMARY) && !pokemon) // Type/pokémon doesn't exist
			return message.channel.send(`The **${PRIMARY}** type/pokémon don't exist`);	

		// Check secondary
		if(SECONDARY) { // I can use a && but I don't want to pass secondary to lower case twice
			SECONDARY=SECONDARY.toLowerCase() 
			if(!types.includes(SECONDARY) || PRIMARY==SECONDARY) {
				SECONDARY=false
			}
		}
		TITLE = (!SECONDARY) ? PRIMARY.toUpperCase() : `__${PRIMARY.toUpperCase()} / ${SECONDARY.toUpperCase()}__`;

		

		// - TYPES CHECK - //

		// Default values
		var defaultValues = { "normal": 0, "fire": 0, "water": 0, "grass": 0, "electric": 0, "ice": 0, "fighting": 0, "poison": 0, "ground": 0, "flying": 0, "psychic": 0, "bug": 0, "rock": 0, "ghost": 0, "dragon":0, "dark": 0, "steel": 0, "fairy": 0 };

		// Counting and soming the two types
		for(let i=0; i<types.length; i++) {
			let type = types[i];
			defaultValues[type]+=chart[PRIMARY][type]; // Plus weaks
			
			// Multiplying in case PRIMARY is zero
			if(SECONDARY) // If has SECONDARY
				defaultValues[type]*=chart[SECONDARY][type];
		}
		
		var WEAK=[], NEUTRAL=[], RESIST=[], IMMUNE=[];
		
		/**
		 * @WEAK    - 2/4
		 * @NEUTRAL - 1
		 * @RESIST  - 0.5
		 * @IMMUNE  - 0 
		 * */
		
		// Formating and adding to array
		for(let i=0; i<types.length; i++) {
			let value = defaultValues[types[i]];
			let type = capitalize(types[i]);

			if(value==4)
				WEAK.push(`**${type}**`);
			else if(value==2)
				WEAK.push(type);

			else if(value==1)
				NEUTRAL.push(type);

			else if(value==0.25)
				RESIST.push(`**${type}**`);
			else if(value==0.5)
				RESIST.push(type);

			else if(value==0)
				IMMUNE.push(type);
		}

		// Choosing TITLE
		let embed = new MessageEmbed()
			.setTitle(TITLE)
			.addFields(
				{ name: "Weak", value: WEAK.join(", ") },
				{ name: "Neutral", value: NEUTRAL.join(", ") }
			)
			.setThumbnail(IMAGE)
			.setColor(ee.color);
		
		// Just add if has
		(IMMUNE.length>0) ? embed.addField("Immune", IMMUNE.join(", ")) : false;
		(RESIST.length>0) ? embed.addField("Resist", RESIST.join(", ")) : false;

		message.channel.send({ embeds: [embed] });
	},
}
