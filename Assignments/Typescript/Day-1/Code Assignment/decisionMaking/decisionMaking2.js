"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("node:readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
rl.question('Enter your age: ', function (input) {
    var age = parseInt(input, 10);
    var message = "You are ";
    message = message + (age >= 18 ? (age < 60 ? "an adult" : "a senior citizen") : "a minor");
    console.log(message);
    rl.close();
});
