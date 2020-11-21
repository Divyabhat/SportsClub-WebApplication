const rp = require('request-promise-native');
let options = {
    uri: 'http://127.0.0.1:1222/users',
    json: true
};

rp(options){
   
        console.log(`success`);
    };
}).catch(function(err){
    console.log(`Error: ${err}`);
})
