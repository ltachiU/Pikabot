const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch (...args));
const fs = require('fs');

const { whitelistCheck } = require('../../files/utils/whitelist-check.js');
const { write, ch_dir, writeFile } = require('../../files/utils.js');

module.exports = {
    name: "remove",
    category: "Shinyhunt",
    aliases: ["remover"],
    usage: "remove",
    description: "Remove o canal atual da lista de canais que eu posso mandar mensagem.",
    run: async (client, message, args) => {

		const server = message.guild.id;
		const channel = message.channel.id;

        if(!message.member.permissions.has('MANAGE_MESSAGES') && !whitelistCheck(message.author.id))
            return message.channel.send("Você não tem permissão pra usar esse comando! \nSeu boboca");

        let data = fs.readFileSync(ch_dir, 'utf-8');
        let obj = JSON.parse(data);

		if(!obj.hasOwnProperty(server)) return message.channel.send("Esse servidor não possui nenhum canal vinculado!");

		// Checando se canal já foi adicionado
		if(!obj[server]['channels'].includes(channel)) 
			return message.channel.send("Esse canal não está adicionado!");

		// Pegar index do canal atual
		const index = obj[server]['channels'].findIndex(x => x === channel)

		obj[server]['channels'].splice(index); // Deleta
		let json = JSON.stringify(obj, null, 1);

        writeFile(`${write}channels.json`, json);
		
		message.channel.send("Esse canal foi removido! \nNão vou mais enviar mensagens aqui!");


	},
}
