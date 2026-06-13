"use strict";
let num = 153;
let original = num;
let sum = 0;
while (num > 0) {
    let digit = num % 10;
    sum += digit * digit * digit;
    num = Math.floor(num / 10);
}
if (sum === original) {
    console.log("Armstrong Number");
}
else {
    console.log("Not an Armstrong Number");
}
