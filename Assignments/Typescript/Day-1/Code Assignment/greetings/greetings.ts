let dateToday = new Date()
let hrs = dateToday.getHours()

if (hrs >= 20) {
    console.log('Good Night!')
} else if (hrs >= 16) {
    console.log('Good Evening!')
} else if (hrs >= 12) {
    console.log('Good Afternoon!')
} else {
    console.log('Good Morning!')
}