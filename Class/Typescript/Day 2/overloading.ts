function sum(a: number, b: number): number;
function sum(a: number, b: number, c: number): number;

// function sum(...num: number[]): number {
//     return num.reduce((total, num) => total + num, 0);
// }

function sum(a: number, b: number, c?: number): number {
    if (c !== undefined) {
        return a + b + c;
    }
    return a + b;
}

console.log(sum(5, 6))
console.log(sum(5, 6, 7))
