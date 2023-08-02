function calcSal(eid, ename, emob, baseSal) {
    var da = 0.2 * baseSal;
    var hra = 0.35 * baseSal;
    var sal = baseSal + da + hra;
    return sal;
}
var res = calcSal(102, 'Ajay', 7625935829, 25000);
console.log('Final salary of Ajay is Rs. ' + res);
