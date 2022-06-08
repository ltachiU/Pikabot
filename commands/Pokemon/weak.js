const { MessageEmbed } = require('discord.js');
const ee = require('../../config/embed.json');

const { capitalize, clearSpaces } = require('../../files/scripts/text-formatting.js');
const chart = require('../../files/database/statics/types-weak.json');

module.exports = {
	name: "weak",
	category: "Pokemon",
	aliases: [],
	usage: "weak <PrimaryType> [, Secondarytype]",
	description: "Veja as fraquezas daquela tipagem ou daquele pokemon",
	run: async (client, message, args) => {
				
		var info = args.slice(0).join(' '); // Botar array em string
		info = info.split(","); // Colocar string em array separado por +

		const types = Object.keys(chart);

		// Primary
		var primaryString = clearSpaces(info[0]);
		if(!primaryString)
			return message.channel.send("Você precisa digitar no mínimo uma tipagem, em inglês, por favor");
			
		primaryString = primaryString.toLowerCase()
		if(!types.includes(primaryString))
			return message.channel.send(`Não achei nenhuma tipagem **${capitalize(primaryString)}**, digite uma tipagem existente, em inglês, por favor`);
		const primary = chart[primaryString];

		// Secondary
		var secondaryString = clearSpaces(info[1]);
		if(secondaryString) {
			secondaryString = secondaryString.toLowerCase();
			
			if(secondaryString==primaryString || !types.includes(secondaryString)) {
				var secondary = false;
			} else {
				var secondary=chart[secondaryString]
			}
		}
		
		// Default values
		var values = { "normal": 0, "fire": 0, "water": 0, "grass": 0, "electric": 0, "ice": 0, "fighting": 0, "poison": 0, "ground": 0, "flying": 0, "psychic": 0, "bug": 0, "rock": 0, "ghost": 0, "dragon":0, "dark": 0, "steel": 0, "fairy": 0 };
				  
		// Count
		for(let i=0; i<types.length; i++) {
			let type = types[i];
		
			values[type] = values[type]+primary[type]; // Somar weak
			
			if(secondary) // Se tiver secondary
				// Multiplicando pra caso primary seja zero, permanecer zero
				values[type] = values[type]*secondary[type]; // Fazer soma do primary vezes secondary
		}
		
		var weak=[], neutral=[], resist=[], immune=[];
		
		// weak - 2/4
		// neutral - 1
		// resist - 0.5
		// immune - 0
		
		// Formating and adding in array
		for(let i=0; i<types.length; i++) {
			let value = values[types[i]];
			let typeFormated = capitalize(types[i]);
		
			if(value==4)
				weak.push(`**${typeFormated}**`);
			else if(value==2)
				weak.push(typeFormated);
		
			else if(value==1)
				neutral.push(typeFormated);
			else if(value==0.25)
				resist.push(`**${typeFormated}**`);

			else if(value==0.5)
				resist.push(typeFormated);
			else if(value==0)
				immune.push(typeFormated);
		}

		const title = (secondary) ? `__${primaryString.toUpperCase()} / ${secondaryString.toUpperCase()}__` : info[0].toUpperCase();

		let embed = new MessageEmbed()
			.setTitle(title)
			.addFields(
				{ name: "Weak", value: weak.join(", ") },
				{ name: "Neutral", value: neutral.join(", ") },
			)
			.setColor(ee.color);
		
		// Só adicioanr se tiver imunidade
		(immune.length>0) ? embed.addField("Immune", immune.join(", ")) : false;
		(resist.length>0) ? embed.addField("Resist", resist.join(", ")) : false;

		message.channel.send({ embeds: [embed] });

	},
}
