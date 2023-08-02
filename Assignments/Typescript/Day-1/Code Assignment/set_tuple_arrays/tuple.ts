var details: any = [["John", 25, true], ["Aria", 16, false], ["Ajay", 67, true]];

for (let i = 0; i < details.length; i++) {
    let age = details[i][1];
    var message = details[i][0] + " is ";

    if (age < 18) {
        message = message + "a minor ";
    } else if (age >= 18 && age < 60) {
        message = message + "an adult ";
    } else {
        message = message + "a senior citizen ";
    }

    message = message + (details[i][2] ? "and has an insurance." : "and doen't have an insurance");
    console.log(message);
}
