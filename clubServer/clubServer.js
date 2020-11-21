
var express = require('express');
var app = express();
const Users = require('./clubUsersHash.json');
const Users1 = require('./clubUsers2.json');
const bcrypt = require('bcrypt');
const session = require('express-session');
const nRounds =12;
const request = require('request-promise-native');
let windthings = require ("./activities.json");
var Ajv = require('ajv');
const schema = require('./JsonSchema.json');
dataelements = Users1;
const DataStore = require('nedb');
db = new DataStore({filename: __dirname + '/myDB3',autoload:true}); 


const cookieName = "MN9386";
app.use(session({
    secret :'Homework9 Divya Bhat',
    resave : false,
    saveUninitialized : false,
    name : cookieName
}));


const setUpSessionMiddleware = function(req,res,next){
    if(!req.session.user){
        req.session.user = {role :"guest"};
    };
    next();
};

app.use(setUpSessionMiddleware);



// Use this middleware to restrict paths to only logged in users
function checkCustomerMiddleware(req, res, next) {
    if (req.session.user.role === "guest") {
        res.status(401).json({error: "Not permitted"});;
    } else {
        //		console.log(`\nSession info: ${JSON.stringify(req.session)} \n`);
        next();
    }
};


// User this middlewave to restrict paths only to admins
function checkAdminMiddleware(req, res, next) {
    if (req.session.user.role !== "admin") {
        res.status(401).json({error: "Not permitted"});;
    } else {
        next();
    }
};

    
/*
app.post('/activities',function(req,res,next){
    const data1 = req.body;
    db.insert({data1}).then(function(docs){
        res.json(docs);
    }).catch(function(err){
        console.log(`some type of err: $(err)`);
    })
    db.find({},function(err,docs){
        if(err){
            console.log(err);
        }else{
            res.json(docs);
        }
    })
});

*/


app.post('/addTour', checkAdminMiddleware, express.json(), function (req, res) {
       var data1 = req.body;
    console.log("add tour request = ", data1);
    
    return new Promise((resolve,reject) => {
        db.insert({name:data1.name, dates:data1.dates},(err) =>{
            if(err){
                reject(err);
            }
            resolve(db.find({},function(err,docs){
                if(err){
                    console.log("Error");
                }else{
                    res.json(docs);
                }
            }));
        });

    });
});
    


app.post('/applicants', express.json(), function (req, res) {
    var ajv = new Ajv();
    var valid = ajv.validate(schema,req.body);
    if(!valid){
        console.log(ajv.errors);
        res.json(ajv.errors);
    }else{
    dataelements.push(req.body);
    res.json(`message: Recieved your application`);
    console.log(dataelements);
    }
});
   /* db.insert({name:data1.name, dates:data1.dates}).then(function(docs){
        console.log("Add tour success = ", docs);
        db.find({},function(err,docs){
            if(err){
                console.log("Error in finding collections ", err);
            }else{
                console.log("Succesfully fetched collections and sending back to client",docs);
                res.json(docs);
            }
        })
    }).catch(function(err){
        console.log("errori nadd tour");
    })
});
*/
app.get('/activities', function (req, res) {
    return new Promise((resolve,reject) => {
        this.db.find({},(err,docs)=>{
            if(err){
                reject(err);
            }
               resolve(res.json(docs));
            
      })
   })
});




app.get('/users',checkAdminMiddleware,express.json(),function(Req,res,err){
    const copyUsers = JSON.parse(JSON.stringify(Users))
    
    copyUsers.map(function(user) {
        delete user.password;  
    })
    
    res.json(copyUsers);
})

/*
app.post(`/`, express.json({limit : '1kb'}),function (req,res,next){
    console.log(`${JSON.stringify(req.body)}`);
    const data1 = req.body;
    console.log(data1);
    return new Promise((resolve,reject) => {
        this.db.insert({data1},(err,docs) =>{
            if(err){
                reject(err);
            }
            resolve(db.find({},function(err,docs){
                if(err){
                    console.log("Error");
                }else{
                    res.json(docs);
                }
            }));
                    
        })
    })  
});
*/



app.use(function activityErrors(err, req, res, next) {
    console.log(JSON.stringify(err));
    res.status(500).send({"error": true, "message" :"bad activity"});
});


app.post(`/login`,express.json(),function (req,res){
    console.log(req.body);
    let email = req.body.email;
    let password = req.body.password;

    let user1 = Users.find(function (user) {
        return user.email === email;
    });
    
    if (!user1) {
        res.status(401).json({error: true, message: "User error"});
        return;
    }
 
    let verified = bcrypt.compareSync(password, user1.password);
    if(verified){
        let oldInfo = req.session.user;
        req.session.regenerate(function (err) {
            if (err) {
                console.log(err);
            }
            let newUserInfo = Object.assign(oldInfo, user1);
            delete newUserInfo.password;
            req.session.user = newUserInfo;
            res.json(newUserInfo);
        });
        } else{
        res.status(401).json({error: true, message: "User/Password error"});  
    }
    });

   

app.get('/logout', function (req, res) {
    let options = req.session.cookie;
    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
        }
        res.clearCookie(cookieName, options); // the cookie name and options
        res.json({message: "Goodbye"});
    })
});


app.delete(`/deleAct/:id`, function(req, res,next){
    let requestId = req.params.id;
    //parseInt(requestId,10);
    console.log(`delete act + ${requestId}`);
    return new Promise((resolve,reject) => {
        db.remove({_id:requestId},(err) =>{
            if(err){
                reject(err);
            }
        resolve(db.find({},function(err,docs){
            if(err){
                console.log("Error");
            }else{
                res.json(docs);
                }
            }));
    });
                
});
});

/*
app.post(`/`, express.json({limit : '1kb'}),function (req,res,next){
    console.log(`${JSON.stringify(req.body)}`);
    var data1 = req.body;
    return new Promise((resolve,reject) => {
        this.db.insert({data1},(err,docs) =>{
            if(err){
                reject(err);
            }
            resolve(db.find({},function(err,docs){
                if(err){
                    console.log("Error");
                }else{
                    res.json(docs);
                }
            }));

        })
    })  
});
*/
  /*
    let requestId = req.params.id;
    
    console.log("trying to delete activity: " + requestId);
    parseInt(requestId,10);
    db.delete(requestId,doc){
    if(requestId >= doc.length || requestId < `0`){
        console.log("Bad Activity deletion index:", requestId);
        res.status(400).send({"error": true, "message" :"Bad Index"});
       // throw(new(Error(err)));
        return;
    }
    doc.splice(requestId, 1);
    res.json(doc);
    */

host = '127.0.0.1';
port = '1222';
app.listen(port, function () {
    console.log(`Club Server app listening on IPv4: ${host}${port}`);
});

