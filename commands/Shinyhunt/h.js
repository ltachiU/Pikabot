/**
 * 
 * @Re-escrever
 * 
 * */


const { MessageEmbed, MessageCollector } = require("discord.js");
const ee = require("../../config/embed.json");

const fs = require('fs');
const pokemonsJson = require("../../files/database/pokemons.json");
const { sh_dir, capitalize, formatString, similar, findIndicesOfMax } = require('../../files/utils.js');

module.exports = {
    name: "h",
    category: "",
    aliases: [],
    usage: "None",
    description: "None",
    whitelistOnly: true,
    run: async (client, message, hint) => {

        let shinyhunts = fs.readFileSync(sh_dir, 'utf-8');
        let obj = JSON.parse(shinyhunts);


        // Desse jeito os valores e pokemons vão ser o mesmo index
        var pokemons = [];
        var values = [];

        hintFormated = capitalize(formatString(hint));
        for(let i = 0; i < pokemonsJson.length; i++) {
            let pokemon = pokemonsJson[i]['name']['english']; // Adicionar pokemon ao array
            let value = similar(hintFormated, pokemon); // Adicionar porcentagem ao array

            pokemons.push(pokemon);
            values.push(value);
        };

        const indices = findIndicesOfMax(values, 3); // Pegar index dos três maiores valores
        var finalResult = ""
        for (let i = 0; i < indices.length; i++) {
            var shinyhunters = " ";
            const users = obj[pokemons[indices[i]].toLowerCase()];

            if(users!=undefined) {
                console.log(shinyhunters)
                for(let i=0; i<users.length; i++)
                    shinyhunters = shinyhunters+`<@${users[i]}> `;
            }

            finalResult = finalResult+`**${pokemons[indices[i]]}** (${values[indices[i]]}%) ${shinyhunters}\n`
        };

        let embed = new MessageEmbed() // setando variavel antes pra completar com o FOR
            .setAuthor({ name: 'Pikabot#7873', iconURL: client.user.displayAvatarURL(), url: 'https://discord.com/oauth2/authorize?client_id=894390284698411099&permissions=8&scope=bot' })
            .setDescription(`Resultados para **${hint}** \n${finalResult}`)
            .setColor(ee.color);

        message.channel.send({ embeds: [embed]});



    }
};
