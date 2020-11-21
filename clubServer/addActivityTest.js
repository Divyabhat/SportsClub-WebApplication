var express = require('express');
const app = express();

const request = require('request-promise');


const getInfo = {
    url: 'http://127.0.0.1:1222/activities',
    method: "GET",
    json: true
};

function postInfoFunc(postBody) {
    const postInfo = {url: 'http://127.0.0.1:1222/',
                      method: "POST",
                      json: true,
                      body: postBody
                     };
    return postInfo
}

goodBody1 = {"name":"main events" ,dates:["apr 1st"]}
goodBody2 = {"name":"main events" ,dates:["apr 2nd"]}
badBody = {"name": "dsfsdgfskjhdfgkjfhgjkdfhgkjdfhgkfhgkfdhgkfhkjfdhgkjfhgkjfdhgkdfjghdh", dates: ["sdfkdshjkdsgfdsgkjfgfdgfkdjgkjdfg"]}

request(getInfo).then(body =>{
    console.log("Initial GET of activities");
    console.log("Currently " + body.length + " activities");
    return request(postInfoFunc(goodBody1));
}).then(body =>{
    console.log("After First Good activitiy post");
    console.log("Currently " + body.length + " activities");
    return request(postInfoFunc(goodBody2));
}).then(body => {
    console.log("After second Good activitiy post");
    console.log("Currently " + body.length + " activities");
}).catch((err) => {
    console.log("After First bad activitiy post");
    console.log(`Error: ${err}`);

});

/*
request(postInfo).then(function(res, body) {
        var count = 1;
    
        console.log("POST JSON test");
        if (res.code == 500) {
            console.log(res.error);
        } else {
            console.log("adding activities")
            for(var idx in body){
                console.log("Activity " + count + " name: " + body[idx].name + ", Dates: " + body[idx].dates);
                count++;
            }
        }
 })
 
        .catch(function(error){
            console.log('Error:', error.message);
})




request(getInfo).then(body =>{
    a
 
    var count = 1;
    var dataItems = body;
    console.log("Currently " + dataItems.length + " activities");
    for(var idx in dataItems){
        console.log("Activity " + count + ", name: " + dataItems[idx].name + ", Dates: " + dataItems[idx].dates);
    count++;
    }
    return request(postInfo);
}).then(body =>{
    var dataItems = body;
    console.log("Currently " + dataItems.length + " activities");

    var count = 1;
    for(var idx in dataItems){
        console.log("Activity " + count + ", name: " + dataItems[idx].name + ", Dates: " + dataItems[idx].dates);
        count++;
    }
});

*/



                       



