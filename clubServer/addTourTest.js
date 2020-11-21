const rp = require('request-promise-native');

let cookiejar = rp.jar(); // Use this to store cookies in between sessions.

let addTour = {
    url: 'http://127.0.0.1:1222/addTour',
    json: true,
    method: "POST",
    role:"admin",
    body: {
        name: "Windsurf K2-18b, 110 Light Years",
        dates: "Sometime in 2025"
    },
    jar: cookiejar
};



let options = {
    uri: 'http://127.0.0.1:1222/activities',
    json: true,
    method: "GET",
    jar: cookiejar
};


let loginOptions = {
    url: 'http://127.0.0.1:1222/login',
    json: true,
    method: "POST",
    body: { // admin user, see users.json file
        "email": "tirrivees1820@outlook.com",
        "password": "49OqspUq",
    },
    jar: cookiejar
}

let loginCust = {
    url: 'http://127.0.0.1:1222/login',
    json: true,
    method: "POST",
    role : "member",
    body: { // admin user, see users.json file
        "email": "chihuahua1899@gmail.com",
        "password": "'E`Gj3iJ",
    },
    jar: cookiejar
}



const logout1  = {url: 'http://127.0.0.1:1222/logout',
                  json: true,
                  jar : cookiejar
                 };





async function someTests() {
    console.log("Test 1:Admin Login, add Tour");
    try {
        let res1 = await rp(loginOptions);
        console.log(`admin login test result: ${JSON.stringify(res1)}`);
        console.log(`after admin login, Cookies: ${cookiejar.getCookieString(loginCust.url)}`);
        let res9 = await rp(options);
        console.log(`Admin vist, number of tours: ${res9.length}\n`);
        let res2 = await rp(addTour);
        console.log(`Admin add Tour result, number of tours: ${res2.length}\n`);
        let res8 = await rp(logout1);
        console.log(`after logout, Cookies: ${cookiejar.getCookieString(loginCust.url)}`);
        
    } catch (e) {
        console.log(`Error: ${e}\n`);
    }
    
    console.log("Test 2: customer add tour")
    try {
        let res3 = await rp(loginCust);
        console.log(`customer login results: ${JSON.stringify(res3)}`);  
        console.log(`after customer login, Cookies: ${cookiejar.getCookieString(loginCust.url)}`);
        let res9 = await rp(options);
        console.log(`Customer vist, number of tours: ${res9.length}\n`);
        let res4 = await rp(addTour);

    } catch (e) {
        console.log(`Customer add Tour Error: ${e}\n`);
    }

    console.log("Test3: Guest add Tour")
    try {
       
        let res9 = await rp(options);
        console.log(`Guest vist, number of tours: ${res9.length}\n`);
        console.log(`after guest visits, Cookies: ${cookiejar.getCookieString(loginOptions.url)}`);
        let res5 = await rp(addTour);
    } catch (e) {
        console.log(`Guest add tour error: ${e}\n`);
    }
}

someTests();

