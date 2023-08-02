function printHello() {
    console.log('Hello, World!');
}
printHello();
t = setTimeout(printHello, 4000);
printHello();
// clearTimeout(t);
