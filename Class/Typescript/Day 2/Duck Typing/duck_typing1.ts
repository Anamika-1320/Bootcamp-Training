interface Printable {
    print(): void;
}

class Book implements Printable {
    print(): void {
        console.log("Printing a book...");
    }
}

class Magazine implements Printable {
    print(): void {
        console.log("Printing a magazine...");
    }
}

function printItem(item: Printable): void {
    item.print();
}

const book = new Book();
const magazine = new Magazine();

printItem(book);
printItem(magazine); 
