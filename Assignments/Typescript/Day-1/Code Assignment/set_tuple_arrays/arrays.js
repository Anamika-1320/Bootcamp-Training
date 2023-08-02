var fruits = ["Apple", "Banana", "Orange"];
console.log(fruits);
console.log(fruits.length);
fruits[1] = "Mango";
console.log(fruits);
// Adding elements to the end 
fruits.push("Grapes");
console.log(fruits);
// Removing elements from the end
fruits.pop();
console.log(fruits);
// Adding elements at the beginning
fruits.unshift("Pineapple");
console.log(fruits);
// Removing elements from the beginning
fruits.shift();
console.log(fruits);
// Slicing 
var slicedFruits = fruits.slice(1, 3);
console.log(slicedFruits);
// Concatenating 
var moreFruits = ["Grapes", "Peach"];
var allFruits = fruits.concat(moreFruits);
for (var i = 0; i < allFruits.length; i++) {
    console.log(allFruits[i]);
}
// Iterating 
fruits.forEach(function (fruit) {
    console.log(fruit);
});
