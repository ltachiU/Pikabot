module.exports = {
	name: "report",
	category: "Bot",
	aliases: ["bug", "helpme"],
	usage: "report <message>",
	run: async (client, message, args) => {
		const REPORT = args.join(" ");
		if(!REPORT)
			return message.reply("You don't typed the report :/");

		client.users.cache.get('703785252463837234').send(REPORT).then(() => { 
			message.reply("Report sent, thank you!");
		});
	}
};
