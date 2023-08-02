var fruits = new Set(["Apple", "Orange", "Banana"]);
console.log(fruits);
fruits.add("Cherry");
fruits.add("Guava");
console.log(fruits);
console.log(fruits.has("Grape"));
console.log(fruits.size);
fruits.delete("Banana");
fruits.forEach(function (fruit) {
    console.log(fruit);
});
fruits.clear();
console.log(fruits.size);
