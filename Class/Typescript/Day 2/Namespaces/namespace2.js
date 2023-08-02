var person;
(function (person) {
    person.name = 'Ria';
    function sayHello() {
        console.log("Hello, ".concat(person.name, "!"));
        dog.sound();
    }
    person.sayHello = sayHello;
})(person || (person = {}));
var dog;
(function (dog) {
    function sound() {
        console.log('This is dog sound!');
    }
    dog.sound = sound;
    function sayHello() {
        console.log('Bark!');
    }
    dog.sayHello = sayHello;
})(dog || (dog = {}));
console.log(person.name);
person.sayHello();
dog.sayHello();
