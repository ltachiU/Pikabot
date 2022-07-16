const fs = require('fs');
var timeoutArray = [];

module.exports = {

	getUser: function(client, user, id=false) {
		if(!user) return false;
		var user = user.replace(/[<>@&!']/g, "").replace(/ /g, '');

		if(id)
			return client.users.cache.get(user).id;
		else
			return client.users.cache.get(user);
		return false;
	},

	findKey: function(obj, check) {
		const keys = Object.keys(obj);
		
		if(keys.includes(check))
			return true;
		else
			return false;
	},

	timeout: function(delay, id, command, message, text){
		function msToTime(s) {
			var ms = s % 1000;
			s = (s - ms) / 1000;
			var secs = s % 60;
			s = (s - secs) / 60;
			var mins = s % 60;
			var hrs = (s - mins) / 60;

			return hrs + ':' + mins + ':' + secs + '.' + ms;
		}

		const user = id;
		const keys = Object.keys(timeoutArray); // aka pegar o users no array

		if(keys.includes(user)) { // Caso já esteja no array
			if(timeoutArray[user].includes(command)) { // Checar se comando está no obj do user (aka em timeout em tal comando)
				return true;
			}
		} else {
			timeoutArray[user] = []; // Caso user não tenha obj no array
		}

		timeoutArray[user].push(command) // Adicionar nome do comand ao obj
		setTimeout(() => {
			message.channel.send(text); 
			timeoutArray[user].splice(timeoutArray[user].indexOf(command)); // Retirar timeout
		}, delay);
		console.log(timeoutArray);

		return false;
	},

	/** @Pokemon */
	
	checkPokemon: function(pokemon) {
		const pokedex = require('../database/statics/pokedex.json');

		for(let i=0; i < pokedex.length; i++) {
			if(pokedex[i]['name']['english'].toLowerCase()==pokemon.toLowerCase())
				return pokedex[i];
		}
		return false;
	},
	
	checkChannel: function(server, channel) {
		let channels = fs.readFileSync('files/database/channels.json', 'utf-8');
		let obj = JSON.parse(channels);
		if(!obj.hasOwnProperty(server))
			return false; // Verificando se o server esta listado (caso o server ainda não tenha nenhum canal listado)
		if(!obj[server]['channels'].includes(channel)) 
			return false; // Verificando se o canal está na lista dos que podem falar
	
		return true;
	},

	similar: function(strA,strB){
		for(var result = 0, i = strA.length; i--;){
			if(typeof strB[i] == 'undefined' || strA[i] == strB[i]);
			else if(strA[i].toLowerCase() == strB[i].toLowerCase())
				result++;
			else
				result += 4;
		}
		return Math.round((1 - (result + 4*Math.abs(strA.length - strB.length))/(2*(strA.length+strB.length)))*100);
	},


	findIndicesOfMax: function(inp, count) { // Pegar os maiores valores de uma lista
		var outp = [];
		for (var i = 0; i < inp.length; i++) {
			outp.push(i); // add index to output array
			if (outp.length > count) {
				outp.sort(function(a, b) { return inp[b] - inp[a]; }); // descending sort the output array
				outp.pop(); // remove the last index (index of smallest element in output array)
			}
		}
		return outp;
	},
	
};
