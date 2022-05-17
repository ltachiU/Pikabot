const fs = require('fs');
const { whitelistCheck } = require('../../files/utils/whitelist-check.js');

module.exports = {
	name: "add",
	category: "Shinyhunt",
	aliases: ["adicionar"],
	usage: "add",
	description: "Adiciona o canal atual na lista de canais que eu posso mandar mensagem.",
	run: async (client, message) => {
		const server = message.guild.id;
		const channel = message.channel.id;

		if(!message.member.permissions.has('MANAGE_MESSAGES') && !whitelistCheck(message.author.id))
			return message.channel.send("Você não tem permissão pra usar esse comando! \nSeu boboca");


		let data = fs.readFileSync('files/database/channels.json', 'utf-8');
		let obj = JSON.parse(data);


		// Se servidor ainda não foi adicionado ao json
		if(!obj.hasOwnProperty(server)) {
			obj[server] = ({ "channels":[channel] }); // Adicionando objeto ao json

			let json = JSON.stringify(obj, null, 1);

			fs.writeFileSync(`files/database/channels.json`, json);
			return message.channel.send("Canal adicionado!");
		};
		
		// Checando se canal já foi adicionado
		if(obj[server]['channels'].includes(channel))
			return message.channel.send("Esse canal já foi adicionado! \nBobão");

		// Adicionar
		obj[server]['channels'].push(channel);
		let json = JSON.stringify(obj, null, 1);

		fs.writeFileSync(`files/database/channels.json`, json);
	
		message.channel.send("Canal adicionado!");
	}
};
