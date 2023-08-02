namespace MyNamespace {
    export function sayHello(): void {
        console.log('Hello from MyNamespace!');
    }

    export const PI: number = 3.14;
}

MyNamespace.sayHello();
console.log(MyNamespace.PI);


namespace OuterNamespace {
    export namespace InnerNamespace {
        export function greet(): void {
            console.log('Greetings from InnerNamespace!');
        }
    }
}

OuterNamespace.InnerNamespace.greet(); 
