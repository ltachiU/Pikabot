const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch (...args));
const fs = require('fs');
const { prefix } = require('../../config/config.js');

const { write, backup, sh_dir, findKey, checkPokemon, writeFile, backupFile } = require('../../files/utils.js');

module.exports = {
    name: "shinyhunt",
    category: "Shinyhunt",
    aliases: ["sh"],
    usage: "sh [pokemon]",
    description: "Adiciona um pokemon à sua shinyhunt, toda vez que alguem falar o nome desse pokemon eu vou te chamar para você poder capturar ele.",
    run: async (client, message, args) => {
      
        const user = message.author.id;
        const pokemon = args[0];

        let data = fs.readFileSync(sh_dir, 'utf-8');
        var obj = JSON.parse(data);

        let key = findKey(obj, user);

        // View
        if(!pokemon) {
            if(!key)
                return message.channel.send(`Você ainda não definiu seu shinyhunt \nDigite \`${prefix}sh <pokemon>\``);
            return message.channel.send(`Você está em uma shinyhunt de \`${key}\``);
        }

        if(!checkPokemon(pokemon))
            return message.channel.send(`Não conheço nenhum pokemon chamado \`${pokemon}\` \nDigite o nome do pokemon em inglês, por favor`);

        if(key==pokemon) 
            return message.channel.send("Você já está em uma shinyhunt desse pokemon");

        // Change
        if(key) {
            const index = obj[key].indexOf(user);

            obj[key].splice(index); // Removendo de um array
            obj[pokemon] = [user]; // Adicionando em outro

            let json = JSON.stringify(obj, null, 1);
            writeFile(`${write}shinyhunt.json`, json);

            backupFile(`./${write}shinyhunt.json`, `${backup}shinyhunt.json`);
            return message.channel.send(`Agora você será notificado quando um \`${pokemon}\` aparecer`);
        };

        // Add
        obj[pokemon] = [user];
        let json = JSON.stringify(obj, null, 1);
        writeFile(`${write}shinyhunt.json`, json);

        backupFile(`./${write}shinyhunt.json`, `${backup}shinyhunt.json`);
        return message.channel.send(`Agora você será notificado quando um \`${pokemon}\` aparecer`);

    }
};
