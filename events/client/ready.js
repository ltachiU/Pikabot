module.exports = (client) => {
	console.log(`\n-> Logged in as ${client.user.tag}!\n`);

	client.user.setActivity('Pikabot v3.0', { type: 'PLAYING' });
	client.user.setActivity('^help', { type: 'WATCHING' });

	// PLAYING
	// STREAMING
	// LISTENING
	// WATCHING
	// COMPETING
};
