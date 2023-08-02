var MyNamespace;
(function (MyNamespace) {
    function sayHello() {
        console.log('Hello from MyNamespace!');
    }
    MyNamespace.sayHello = sayHello;
    MyNamespace.PI = 3.14;
})(MyNamespace || (MyNamespace = {}));
MyNamespace.sayHello();
console.log(MyNamespace.PI);
var OuterNamespace;
(function (OuterNamespace) {
    var InnerNamespace;
    (function (InnerNamespace) {
        function greet() {
            console.log('Greetings from InnerNamespace!');
        }
        InnerNamespace.greet = greet;
    })(InnerNamespace = OuterNamespace.InnerNamespace || (OuterNamespace.InnerNamespace = {}));
})(OuterNamespace || (OuterNamespace = {}));
OuterNamespace.InnerNamespace.greet();
