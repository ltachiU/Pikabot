const fs = require('fs');
const { whitelistCheck } = require('../../files/scripts/whitelist-check.js');

module.exports = {
	name: "channel",
	category: "Shinyhunt",
	aliases: ["canal"],
	usage: "channel <add | remove>",
	description: "Adiciona ou remove o canal atual, da lista de canais que posso enviar mensagens.",
	run: async (client, message,args) => {
		const server = message.guild.id;
		const channel = message.channel.id;

		if(!message.member.permissions.has('MANAGE_MESSAGES') && !whitelistCheck(message.author.id))
			return message.channel.send("Você não tem permissão pra usar esse comando! \nSeu boboca");

		let data = fs.readFileSync('files/database/channels.json', 'utf-8');
		let obj = JSON.parse(data);


		if(!args[0])
			return message.channel.send("Por favor, digite se você deseja que o canal atual seja adicionado (`add`) ou removido (`remove`) da lista de canais do servidor que eu posso enviar mensagens");

		let argument = args[0].toLowerCase()
		if(argument=="add") {
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
			return message.channel.send("Canal adicionado!");

		} else if(argument=="remove") {
			if(!obj.hasOwnProperty(server))
				return message.channel.send("Esse servidor não possui nenhum canal vinculado!");

			// Checando se canal já foi adicionado
			if(!obj[server]['channels'].includes(channel)) 
				return message.channel.send("Esse canal não está adicionado!");

			// Pegar index do canal atual
			const index = obj[server]['channels'].findIndex(x => x === channel)
			obj[server]['channels'].splice(index); // Deleta

			let json = JSON.stringify(obj, null, 1);
			fs.writeFileSync(`files/database/channels.json`, json);
			
			return message.channel.send("Esse canal foi removido! \nNão vou mais enviar mensagens aqui!");
		} else {
			return message.channel.send("Por favor, digite se você deseja que o canal atual seja adicionado (`add`) ou removido (`remove`) da lista de canais do servidor que eu posso enviar mensagens");
		}

	},
}
