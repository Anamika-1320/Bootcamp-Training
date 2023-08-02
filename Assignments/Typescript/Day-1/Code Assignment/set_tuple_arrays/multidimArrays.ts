function matMul(a: number[][], b: number[][]): number[][] {
    // a: mxn  ;   b: nxq
    const m = a.length;
    const n = a[0].length;
    const q = b[0].length;

    if (n !== b.length) {
        throw new Error("Invalid dimensions for matrix multiplication");
    }

    const res: number[][] = [];

    for (let i = 0; i < m; i++) {
        res[i] = [];
        for (let j = 0; j < q; j++) {
            res[i][j] = 0;
            for (let k = 0; k < n; k++) {
                res[i][j] += a[i][k] * b[k][j];
            }
        }
    }

    return res;
}

// 2x3
const a: number[][] = [
    [1, 2, 3],
    [4, 5, 6],
];

// 3x2
const b: number[][] = [
    [7, 10],
    [8, 11],
    [9, 12],
];

// 2x2
const res = matMul(a, b);
console.log(res);
