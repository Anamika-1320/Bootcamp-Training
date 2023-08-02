import * as readline from 'node:readline'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question('Enter three numbers (separated by space): ', (input) => {
    const numbers = input.split(/[,\s]+/).map((num) => parseInt(num, 10));

    if (numbers[0] <= numbers[1]) {
        if (numbers[0] <= numbers[2]) {
            console.log("The smallest number is " + numbers[0])
        }
        else {
            console.log("The smallest number is " + numbers[2])
        }
    }
    else {
        if (numbers[1] <= numbers[2]) {
            console.log("The smallest number is " + numbers[1])
        }
        else {
            console.log("The smallest number is " + numbers[2])
        }
    }
    rl.close();
});