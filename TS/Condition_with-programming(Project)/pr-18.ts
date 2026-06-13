let num = 91476;
let smallest = 9;

while (num > 0) {
    let digit = num % 10;

    if (digit < smallest) {
        smallest = digit;
    }

    num = Math.floor(num / 10);
}

console.log("Smallest digit =", smallest);