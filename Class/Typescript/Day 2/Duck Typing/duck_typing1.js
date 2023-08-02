var Book = /** @class */ (function () {
    function Book() {
    }
    Book.prototype.print = function () {
        console.log("Printing a book...");
    };
    return Book;
}());
var Magazine = /** @class */ (function () {
    function Magazine() {
    }
    Magazine.prototype.print = function () {
        console.log("Printing a magazine...");
    };
    return Magazine;
}());
function printItem(item) {
    item.print();
}
var book = new Book();
var magazine = new Magazine();
printItem(book);
printItem(magazine);
