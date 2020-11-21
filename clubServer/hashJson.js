const fs = require('fs');
var express = require('express');
var app = express();
const bcrypt = require('bcrypt');
const users = require('./clubUsers2.json');
let nRounds = 13;
var hashedUsers = [];
let start = new Date(); // timing code
console.log(`Starting password hashing with nRounds = ${nRounds}, ${start}`);


users.map(function(user){
    hashValue = bcrypt.hashSync(user.password, nRounds);
    user.password = hashValue;  
    hashedUsers.push(user);         
});

let elapsed = new Date() - start; // timing code
console.log(`Finished password hashing, ${elapsed/1000} seconds.`);
fs.writeFileSync("clubUsersHash.json", JSON.stringify(hashedUsers, null, 2));


host = '127.0.0.1';
port = '1222';
app.listen(port, function () {
    console.log(`Club Server app listening on IPv4: ${host}${port}`);
});
