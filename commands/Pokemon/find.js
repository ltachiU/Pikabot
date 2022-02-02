/**
 * 
 * @Re-escrever
 * 
 * */
const { MessageEmbed } = require("discord.js");
const ee = require("../../config/embed.json");

const fs = require('fs');
const obj = require("../../files/database/pokemons.json");
const { sh_dir, capitalize, getId, similar, findIndicesOfMax } = require('../../files/utils.js');

module.exports = {
    name: "find",
    category: "Pokemon",
    aliases: ["achar"],
    usage: "find <pokemon>",
    description: "Não consegue lembrar o nome daquele pokemon? Digite o nome que você lembra e eu vou tentar achar",
    run: async (client, message, args) => {

        var check = args[0];
        if(!check) return message.channel.send("Eu não tenho bola de cristal pra adivinhar qual o pokemon que você ta pensando");
        check = capitalize(check);

        // Mesma coisa do h.js
        var pokemons = [];
        var values = [];

        for(i in obj) {
            let pokemon = obj[i]['name']['english'];
            let value = similar(check, pokemon);

            pokemons.push(pokemon);
            values.push(value);
        };

        const indices = findIndicesOfMax(values, 3); // achar index dos 3 maiores valores

        var finalResult = [];
        for (let i = 0; i < indices.length; i++) {
            let value = values[indices[i]] // pegando index das porcentagens
            let pokemon = pokemons[indices[i]] // pegando index dos pokemons

            finalResult.push(`**${pokemons[indices[i]]}** (${value}%)\n`); // colocando na lista pra depois colocar na embed
        };

        let embed = new MessageEmbed() // setando variavel antes pra completar com o FOR
            .setAuthor({ name: 'Pikabot#7873', iconURL: client.user.displayAvatarURL(), url: 'https://discord.com/oauth2/authorize?client_id=894390284698411099&permissions=8&scope=bot' })
            .setDescription(`Talvez seja um desses:\n${finalResult.join("")}`)
            .setColor(ee.color);
        
        message.channel.send({ embeds: [embed] });

    }
};
