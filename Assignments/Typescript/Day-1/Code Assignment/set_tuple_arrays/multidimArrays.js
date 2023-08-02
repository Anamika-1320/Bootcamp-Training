function matMul(a, b) {
    // a: mxn  ;   b: nxq
    var m = a.length;
    var n = a[0].length;
    var q = b[0].length;
    if (n !== b.length) {
        throw new Error("Invalid dimensions for matrix multiplication");
    }
    var res = [];
    for (var i = 0; i < m; i++) {
        res[i] = [];
        for (var j = 0; j < q; j++) {
            res[i][j] = 0;
            for (var k = 0; k < n; k++) {
                res[i][j] += a[i][k] * b[k][j];
            }
        }
    }
    return res;
}
var a = [
    [1, 2, 3],
    [4, 5, 6],
];
var b = [
    [7, 10],
    [8, 11],
    [9, 12],
];
var res = matMul(a, b);
console.log(res);
