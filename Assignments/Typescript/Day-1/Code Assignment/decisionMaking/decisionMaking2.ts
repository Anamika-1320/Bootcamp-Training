import * as readline from 'node:readline'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question('Enter your age: ', (input) => {
    const age = parseInt(input, 10);

    var message: string = "You are "
    message = message + (age >= 18 ? (age < 60 ? "an adult." : "a senior citizen.") : "a minor.");
    console.log(message);

    rl.close();
});