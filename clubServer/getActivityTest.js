var express = require('express');
const app = express();
    
const rp = require('request-promise-native');

const getInfo = {
                  url: 'http://127.0.0.1:1222/activities',
                  method: "GET",
                  json: true
                 };

console.log("Get JSON test");


rp(getInfo).then(function(data){ 
    data.forEach(function(activity, i) {
    console.log(`Activity ${i+1} name ${activity.name}, date: ${activity.dates},id:${activity._id}`); 
    });
}).catch(function(err){
    console.log(`Error: ${err}`);
 })