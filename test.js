const items = [
    [5, 3, 4, 'a'],
    [1, 10, 2, 'b'],
    [2, 4, 1, 'c'],
    [3, 2, 3, 'd']
];

console.log('start')

const a = items.sort((a, b) => a[0] - b[0]).map(item => item[3]);

const b = items.sort((a, b) => a[1] - b[1]).map(item => item[3]);

const c = items.sort((a, b) => a[2] - b[2]).map(item => item[3]);


console.log(a,b,c);

const f = items.sort((i, j) => (a.findIndex(v => v === i[3]) + b.findIndex(v => v === i[3]) + c.findIndex(v => v === i[3])) / 3 - (a.findIndex(v => v === j[3]) + b.findIndex(v => v === j[3]) + c.findIndex(v => v === j[3])) / 3);

console.log(f);