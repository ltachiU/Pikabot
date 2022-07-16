module.exports = {
	name: "backup",
	category: "",
	aliases: [],
	usage: "",
	whitelistOnly: true,
	run: async (client, message) => {
		message.channel.send({
			files: [
				'files/database/statics/cindy.jpg',
				'files/database/shinyhunt.json',
				'files/database/channels.json',
			],
			content: `Foto fofa e databases.`
		})
	}
};
