"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("node:readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
rl.question('Enter your marks: ', function (input) {
    var marks = parseInt(input, 10);
    if (marks >= 90) {
        console.log("Your grade is A");
    }
    else if (marks >= 80) {
        console.log("Your grade is B");
    }
    else if (marks >= 70) {
        console.log("Your grade is C");
    }
    else if (marks >= 60) {
        console.log("Your grade is D");
    }
    else {
        console.log("Your grade is F");
    }
    rl.close();
});
