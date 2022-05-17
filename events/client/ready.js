module.exports = (client) => {
	console.log(`\n-> Logged in as ${client.user.tag}!\n`);

	// client.user.setStatus('dnd'); // ONLINE, IDLE, DND, INVISIBLE

	setInterval(function(){
		client.user.setActivity('Vulgo Naldinho', { type: 'PLAYING' }), 5000;
		client.user.setActivity('Beta v2.5', { type: 'WATCHING' }), 5000;
	}, 5000);

	// PLAYING
	// STREAMING
	// LISTENING
	// WATCHING
	// COMPETING
};

