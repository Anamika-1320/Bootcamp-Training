function calcSal(eid: number, ename: string, emob: number, baseSal: number) {
    var da: number = 0.2 * baseSal;
    var hra: number = 0.35 * baseSal;
    var sal: number = baseSal + da + hra;
    return sal;
}

var res: number = calcSal(102, 'Ajay', 7625935829, 25000);
console.log('Final salary of Ajay is Rs. ' + res)

