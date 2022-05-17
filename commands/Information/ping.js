module.exports = {
	name: "ping",
	category: "Information",
	aliases: ["latency"],
	usage: "ping",
	description: "Quão rápido vou te responder",
	run: async (client, message) => {
	
		message.channel.send("Pinging....").then(msg=>{
			msg.edit(`🏓 Pong! \nAPI: \`${Math.round(client.ws.ping)}\`ms \nBot: \`${msg.createdAt - message.createdAt}\`ms.`);
			// msg.edit(`🏓 Ping is \`${Math.round(client.ws.ping)}ms\``)});
		});
	}
};
