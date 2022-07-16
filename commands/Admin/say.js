module.exports = {
		name: "say",
		category: "",
		aliases: [],
		usage: "say <text>",
		whitelistOnly: true,
		run: async (client, message, args) => {
			if(!args)
				message.delete();

			message.delete();
			message.channel.send(args.join(" "));
	}
};
