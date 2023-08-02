namespace person {
    export const name: string = 'Ria';
    export function sayHello(): void {
        console.log(`Hello, ${name}!`);
        dog.sound()
    }
}

namespace dog {
    export function sound(): void {
        console.log('This is dog sound.');
    }
    export function sayHello(): void {
        console.log('Bark!');
    }
}

console.log(person.name);
person.sayHello();
dog.sayHello()
