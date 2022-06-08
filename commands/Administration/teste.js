module.exports = {
		name: "test",
		category: "",
		aliases: [],
		usage: "",
		description: "",
		whitelistOnly: true,
		run: async (client, message) => {
			console.log(message.guild.members.fetch('66564597481480192'));
	}
};
