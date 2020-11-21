
var express = require('express');
const app = express();

const request = require('request-promise');



const getInfo = {
    url: 'http://127.0.0.1:1222/activities',
    method: "GET",
    json: true
};

function deleteInfoFunc(index) {
    urlStr = 'http://127.0.0.1:1222/deleAct/' + index;
    const deleteInfo = {url: urlStr,
                        method: "DELETE",
                        json: true,
                        };

    return deleteInfo
}



request(getInfo).then(body =>{
    console.log("Initial GET of activities");
    console.log("Currently " + body.length + " activities");
    return request(deleteInfoFunc("4qQsiwfBK79WE33Q"));
}).then(body =>{
    console.log("After First Good activitiy Deletion");
    console.log("Currently " + body.length + " activities");
    return request(deleteInfoFunc("MfEPuhdAkhJctycf"));
}).then(body => {
    console.log("After second Good activitiy Deletion");
    console.log("Currently " + body.length + " activities"); 
    return request(deleteInfoFunc("s27hu1KAfzgSLpBB"));
}).then(body => {
    console.log("after Third good activitiy Delete");
    console.log("Currently " + body.length + " activities");
}).catch(err =>{
    console.log("After First Bad Activitiy Delete");
    console.log(`Error: ${err}`);
})


/*
request(getInfo).then(body =>{
    console.log("Initial GET of activities");
    console.log("Currently " + body.length + " activities");
    return request(deleteInfoFunc(0));
}).then(body =>{
    
    console.log(body);
    console.log("After First Good activitiy Deletion");
    console.log("nooo");
    console.log(body);
    console.log("Currently " + body.length + " activities");
    console.log("currently " ); 
    return request(deleteInfoFunc(10));
}).then(body => {
    console.log("Currently " + body.length + " activities"); 
    return request(deleteInfoFunc(0));
}).catch((err) => {
    console.log("After First Bad Activitiy Delete");
    console.log(`Error: ${err}`);
    return request(deleteInfoFunc(0));
}).then(body =>{
    console.log("Another Good activitiy Delete");
    console.log("Currently " + body.length + " activities");
});

/*

request(getInfo).then(body =>{
    var count = 0;
    var dataItems = body;
    for(var idx in dataItems){
        count++;
    }

    console.log("Initial GET of activities");
    console.log("Currently " + count + " activities");
    return request(deleteInfo);


request(deleteInfo, function(error, res, body) {
    var count = 1;
    for(var idx in body){
        console.log("Activity " + count + ", name: " + body[idx].name + ", Dates: " + body[idx].dates);
        count++;
    }
});


*/
    /*        

async function someTests() {
    console.log("Initial GET of activities")
    try {
        
        let res1 = await request(getInfo);
        console.log("Currently " + res1.length + " activities");
        let res2 = await request(deleteInfoFunc("nHm3f1G5JjBFPKiG"));
        console.log("After First Good activitiy Deletion");
        console.log("Currently " + res2.length + " activities");

    } catch (e) {
        console.log(`Error: ${e}\n`);   
    }

    try {
        let res4 = await request(deleteInfoFunc("nej9ci07NncRXzN7"));
        console.log("After second Good activitiy Deletion");
        console.log("Currently " + res4.length + " activities");

    } catch (e) {
        console.log(`Error: ${e}\n`); 
    }

    try {
        let res6 = await request(deleteInfoFunc("wBi5lXXSqvlUFd26"));
        console.log("After third Good activitiy Deletion");
        console.log("Currently " + res6.length + " activities"); 

    } catch (e) {
        console.log(`Error: ${e}\n`); 
    }
}

someTests();

                
*/ 


