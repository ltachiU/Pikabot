function getUser(client, message, usuario) {
	if(!usuario) return false
	var usrID = usuario.replace(/[<>@&!']/g, "").replace(/ /g, '');
	try {
		return client.users.cache.get(usrID).id;
		// return client.users.fetch(usrID).id;
	} catch {
		return false
	}
	
}

module.exports.getUser = getUser;