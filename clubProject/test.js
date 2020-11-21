// run me with: node hiNode.js
let a = [1, 3, 5, 7, 9, 11];
function cube(x) {
    return x*x*x;
}

console.log("Hello from Node.js");
for (let x of a) {
    console.log(`x = ${x} and x cubed = ${cube(x)}`);
}