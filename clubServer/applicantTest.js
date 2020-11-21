const rp = require('request-promise-native');

let cookiejar = rp.jar(); // Use this to store cookies in between sessions.

let addTour = {
    url: 'http://127.0.0.1:1222/applicants',
    json: true,
    method: "POST",
    body: {
      
        "firstName": "Melia",
        "lastName": "Barker",
        "email": "tirrivees",
        "password": "49OqspUq",
        "role": "admin"

},
    jar: cookiejar
};


let addTour1 = {
    url: 'http://127.0.0.1:1222/applicants',
    json: true,
    method: "POST",
    body: {

        "firstName": "divya",
        "lastName": "bhat",
        "email": "diya@emil.com",
        "password": "49OqspUq",
        "role": "member"

    },
    jar: cookiejar
};


let addTour2= {
    url: 'http://127.0.0.1:1222/applicants',
    json: true,
    method: "POST",
    body: {

        "firstName": "divya",
        "lastName": "bhat",
        "email": "dibuaasdsfsdfsdfdfdfdfddgfhghgfhcndgndkfjgkhdkghdfkngldkfnglekrg vmcnbjfgnrekngdkfngkefgkjdfkdfngknfdkghs@emil.com",
        "password": "49OqspUq",
        "role": "member"

    },
    jar: cookiejar
};






async function someTests() {
    console.log("Applicant Test1:Good #1");
    try {
        let res1 = await rp(addTour);
        console.log(`Application result: ${JSON.stringify(res1)}`);

    } catch (e) {
        console.log(`Error: ${e}\n`);
    }
    
    console.log("Applicant Test1:Good #2");
    try {
        let res2 = await rp(addTour1);
        console.log(`Application result: ${JSON.stringify(res2)}`);

    } catch (e) {
        console.log(`Error: ${e}\n`);
    }
    
    console.log("Applicant Test1:Bad #1");
    try {
        let res3 = await rp(addTour2);
        console.log(`Application result: ${JSON.stringify(res3)}`);

    } catch (e) {
        console.log(`Error: ${e}\n`);
    }


}

someTests();