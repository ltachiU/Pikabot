module.exports = {
		name: "say",
		category: "Administration",
		aliases: [],
		usage: "say <text>",
		description: ":parrot:",
		whitelistOnly: true,
		run: async (client, message, args) => {
			const text = args.join(" ");
			if(!args[0])
				return message.channel.send("Sem texto pra eu falar");

			message.delete();
			message.channel.send(text);
	}
};
