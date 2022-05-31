module.exports = (client) => {
	console.log(`\n-> Logged in as ${client.user.tag}!\n`);

	// client.user.setStatus('dnd'); // ONLINE, IDLE, DND, INVISIBLE

	setInterval(function(){
		client.user.setActivity('Trabalhando em melhorias', { type: 'PLAYING' }), 5000;
		client.user.setActivity('Seus shinyhunts', { type: 'WATCHING' }), 5000;
	}, 5000);

	// PLAYING
	// STREAMING
	// LISTENING
	// WATCHING
	// COMPETING
};

