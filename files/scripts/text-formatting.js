module.exports = {
	capitalize: function(string) {
		if(!string) return false;
			return string.charAt(0).toUpperCase() + string.toLowerCase().slice(1);
	},

	titleCase: function(str) {
		if(!str) return false;
		return str.replace(/\p{L}+('\p{L}+)?/gu, function(txt) {
			return txt.charAt(0).toUpperCase() + txt.slice(1)
		})
	},

	clearSpaces: function(string) {
		if(!string) return false;
		return string.replace(/ /g, '');
	},

	clearUser: function(user) {
		if(!user) return false;
		return user.replace(/[<>@&!' ]/g, "");
	},

	currencyFormat: function(money) {
		var value = (money).toLocaleString(
			undefined,
			{
				minimumFractionDigits: 2
			}
		);
		return value;
	}
};
