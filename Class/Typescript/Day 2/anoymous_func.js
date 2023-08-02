var details = function (eid, ename, baseSal) {
    var da = 0.2 * baseSal;
    var hra = 0.35 * baseSal;
    var sal = baseSal + da + hra;
    var msg = 'Final salary of ' + ename + ' (EID: ' + eid + ') is Rs. ' + sal;
    return msg;
};
console.log(details(102, 'Ajay', 25000));
