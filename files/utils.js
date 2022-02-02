const fs = require('fs');

module.exports = {
    write: 'files/database/',
    sh_dir: 'files/database/shinyhunt.json',
    ch_dir: 'files/database/channels.json',

    /**
     * @Pokemon
     * */

    findKey: function(obj, user) {
        var keys = Object.keys(obj);
        for(let i = 0; i < keys.length; i++) {
            var val = obj[keys[i]];

            if(val==user) {
                return keys[i]
            }
        }
        return false;
    },

    checkPokemon: function(pokemon) {
        const obj = require('./database/pokemons.json');

        for(let i=0; i < obj.length; i++) {
            if(obj[i]['name']['english']==pokemon.charAt(0).toUpperCase() + pokemon.slice(1)) // Capitalize
                return true;
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


    /**
     * @Text
     * */


    capitalize: function(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },

    titleCase: function(str) {
        return str.replace(/\p{L}+('\p{L}+)?/gu, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.slice(1)
        })
    },

    clearSpaces: function(string) {
        return string.replace(/ /g, '');
    },

    formatString: function(string) {
        return string.replace(/[<>@&!'",.\/\\]/g, "")
    },


    /**
     * @Files
     * */


    backupFile: function(dir, backup) {
        fs.copyFile(dir, backup, (err) => {
            if (err) throw err;
            console.log(`Backup ${dir} feito com sucesso!`)
        });
    },

    writeFile: function(dir, json) {
        fs.writeFile(dir, json, (err) => {
            if(err) throw err; // Se não colocar isso não funciona, por algum motivo
        });
    },


    /**
     * @Others
     * */

    sleep: function(n) {
        Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
    }

};
