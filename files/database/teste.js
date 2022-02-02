const fs = require('fs');

let data = fs.readFileSync('shinyhunt.json', 'utf-8');
let obj = JSON.parse(data);

console.log(obj['ralts']);

