module.exports = (client) => {
  console.log(`\n-> Logged in as ${client.user.tag}!`);

  setInterval(function(){
    client.user.setPresence({
      status: 'online',
      activity: {
          name: ".help",
          type: "PLAYING"
      }
    }), 5000;

    client.user.setPresence({
      status: 'online',
      activity: {
          name: "Seus pokemons",
          type: "WATCHING"
      }
    })

  }, 5000);

}
