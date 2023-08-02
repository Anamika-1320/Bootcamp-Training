// var rf = require('fs');
// var data = rf.readFileSync('taxt.txt');

// console.log(data.toString());
// console.log('Program Ended');

var fs = require("fs");

fs.readFile('text.txt', 'utf8', function (err, data) {
    if (err) return console.error(err);
    const lines = data.split("\n");
    for (const line of lines) {
        if (line.includes('millionaire')) {
            console.log("---- 'millionaire' found! ----");
            break;
        }
        console.log(line);
    };
});

// console.log("Program Ended");