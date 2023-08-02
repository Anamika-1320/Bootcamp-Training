var myFunc = new Function("a", "b", "return a*b", "return a+b");
var x = myFunc(4, 3);
console.log(x);