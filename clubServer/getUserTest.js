const rp = require('request-promise-native');

let cookiejar = rp.jar(); // Use this to store cookies in between sessions.


let options = {
    uri: 'http://127.0.0.1:1222/users',
    json: true,
    method: "GET",
    roel:"admin",
    jar: cookiejar
};


let loginOptions = {
    uri: 'http://127.0.0.1:1222/login',
    json: true,
    method: "POST",
    body: { // admin user, see users.json file
        "email": "tirrivees1820@outlook.com",
        "password": "49OqspUq",
    },
    jar: cookiejar
}

let loginMember = {
    uri: 'http://127.0.0.1:1222/login',
    json: true,
    method: "POST",
    body: { // admin user, see users.json file
        "email": "umbrate1989@yahoo.com",
        "password": "n3pLS4|=",
    },
    jar: cookiejar
}


let loginGuest = {
    uri: 'http://127.0.0.1:1222/login',
    json: true,
    method: "POST",
    jar: cookiejar
}


const logout1  = {url: 'http://127.0.0.1:1222/logout',
                  json: true,
                  jar : cookiejar
                 };


async function someTests() {
    console.log("Get User Test1: Admin Login");
    try {
        let res1 = await rp(loginOptions);
        console.log(`Admin Login,Cookies: ${cookiejar.getCookieString(loginOptions.uri)}`);
        let res3 = await rp(options);
        console.log(`Number of users: ${JSON.stringify(res3)}`);
        let res2 = await rp(logout1);
        console.log(`After logout,Cookies: ${cookiejar.getCookieString(loginOptions.uri)}`);
    } catch (e) {
        console.log(`Error: ${e}\n`);
    }

    console.log("Get User Test2: Member Login");
    try {
        let res4 = await rp(loginMember);
        console.log(`Member Login,Cookies: ${cookiejar.getCookieString(loginMember.uri)}`);
        let res3 = await rp(options);
        console.log(`Number of users: ${JSON.stringify(res3)}`);
        
    } catch (e) {
        console.log(`Member get user Error: ${e}\n`);
        let res5 = await rp(logout1);
        console.log(`After logout,Cookies: ${cookiejar.getCookieString(loginMember.uri)}`);
    }
    
    console.log("Get User Test3: Guest");
    try {
        let res6 = await rp(loginGuest);
        console.log(`guest get user error: ${JSON.stringify(res6)}\n`);
        
    } catch (e) {
        console.log(`Error: ${e}\n`);
        console.log(`Get User Test3,Cookies: ${cookiejar.getCookieString(loginGuest.uri)}`);
        
    }
}

someTests();