let num = 68795;
let largest = 0;

while (num > 0) {
    let digit = num % 10;

    if (digit > largest) {
        largest = digit;
    }

    num = Math.floor(num / 10);
}

console.log("Largest digit =", largest);