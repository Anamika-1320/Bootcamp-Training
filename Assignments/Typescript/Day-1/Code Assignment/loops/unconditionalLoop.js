console.log("Using while loop:");
var i = 1;
while (true) {
    console.log(i++);
    if (i > 5) {
        break;
    }
}
console.log("\nUsing for loop:");
i = 1;
for (; ;) {
    console.log(i++);
    if (i > 5) {
        break;
    }
}
