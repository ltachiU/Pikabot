const fs = require('fs');
const { prefix } = require('../../config/config.js');

const { write, sh_dir, findKey, checkPokemon, writeFile } = require('../../files/utils.js');

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

        console.log(`\nKey: ${key}`)


        // View
        if(!pokemon) {
            if(!key) {
                console.log("NÃO DEFINIU")
                return message.channel.send(`Você ainda não definiu seu shinyhunt \nDigite \`${prefix}sh <pokemon>\``);
            }
            console.log("SH");
            return message.channel.send(`Você está em uma shinyhunt de \`${key}\``);
        }

        if(!checkPokemon(pokemon))
            return message.channel.send(`Não conheço nenhum pokemon chamado \`${pokemon}\` \nDigite o nome do pokemon em inglês, por favor`);

        if(key==pokemon) {
            console.log("SAME")
            return message.channel.send("Você já está em uma shinyhunt desse pokemon");
        }

        // Just check if is in some shinyhunt
        if(key) {
            console.log("CHANGE");

            const index = obj[key].indexOf(user);
            obj[key].splice(index); // Removing from array
        };

        // Add
        if(!keys.includes(pokemon)) {
            obj[pokemon] = [user]; // Adding in another
        }
        else
            obj[pokemon].push(user);

        let json = JSON.stringify(obj, null, 1);
        writeFile(`${write}shinyhunt.json`, json);

        return message.channel.send(`Agora você será notificado quando um \`${pokemon}\` aparecer`);

    }
};
