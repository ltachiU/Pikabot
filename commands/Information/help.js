const { MessageEmbed } = require("discord.js");
const { prefix } = require("../../config/config.js");

const ee = require("../../config/embed.json");

module.exports = {
    name: "help",
    category: "Information",
    aliases: ["ajuda", "comandos"],
    usage: "help [command]",
    description: "Lista de todos os comandos",
    run: async (client, message, args) => {
      if(args[0]) {
        const embed = new MessageEmbed();
        const cmd = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()));
        if(!cmd) {
          embed.setColor(ee.wrongcolor).setDescription(`Sem informação para **${args[0].toLowerCase()}**`);
          return message.channel.send({ embeds: [embed] });
        }

        if(cmd.name) embed.addField("**Command :**", `\`${cmd.name}\``);
        if(cmd.name) embed.setTitle(`Detailed Information about:\`${cmd.name}\``);
        if(cmd.description) embed.addField("**Description**", `\`${cmd.description}\``);

        let al = cmd.aliases.map((a) => `${a}`).join("`, `");
        if(al.length==0) al = "None";
        if(cmd.aliases) embed.addField("**Aliases**", `\`${cmd.aliases.map((a) => `${a}`).join("`, `")}\``);
    
        if(cmd.usage) {
            embed.addField("**Usage**", `\`${prefix}${cmd.usage}\``);
            embed.setFooter({ text: "<> - Argumento obrigátorio \n[] - Argumento opcional" });
        }
        if(cmd.useage) {
            embed.addField("**Usage**", `\`${prefix}${cmd.useage}\``);
            embed.setFooter({ text: "<> - Argumento obrigátorio \n[] - Argumento opcional" });
        }
        embed.setColor(ee.color);
        return message.channel.send({ embeds: [embed] });
      } else {
        const embed = new MessageEmbed()
            .setColor(ee.color)
            .setThumbnail(client.user.displayAvatarURL())
            .setTitle("HELP MENU 🦜🤙 Commands")
            .setFooter({ text: `Para ver informações de um comando e a forma de usar, digite ${prefix}help [command]`, icon_url: [client.user.displayAvatarURL()] });

        const commands = (category) => {
            return client.commands.filter((cmd) => cmd.category === category).map((cmd) => `\`${cmd.name}\``);
        };
      
        for(let i = 0; i < client.categories.length; i += 1) {
          const current = client.categories[i];
          const items = commands(current);
          const n = 3;
          const result = [[], [], []];
          const wordsPerLine = Math.ceil(items.length / 3);
          for(let line = 0; line < n; line++) {
            for(let i = 0; i < wordsPerLine; i++) {
              const value = items[i + line * wordsPerLine];
              if(!value) continue;
              result[line].push(value);
            };
          };
          embed.addField(`**${current.toUpperCase()} [${items.length}]**`, `> ${result[0].join("\n> ")}`, true);
          embed.addField(`\u200b`, `${result[1].join("\n") ? result[1].join("\n") : "\u200b"}`, true);
          embed.addField(`\u200b`, `${result[2].join("\n") ? result[2].join("\n") : "\u200b"}`, true);
        };

        message.channel.send({ embeds: [embed] });
    };

  }
};
