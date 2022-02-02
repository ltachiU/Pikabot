module.exports = {
    name: "backup",
    category: "",
    aliases: [],
    usage: "None",
    description: "None",
    whitelistOnly: true,
    run: async (client, message) => {
        message.channel.send({
            files: [
                'files/database/cindy.jpg',
                'files/database/shinyhunt.json',
                'files/database/channels.json',
            ],
            content: `Foto fofa e databases.`
        })
        
        // message.channel.send({
        //     files: [{
        //         attachment: 'files/database/shinyhunt.json',
        //         name: 'shinyhunt.json'
        //     }],
        //     content:`Testing message.`,
        // });
    }
};
