"use strict";
let Amount = 6000;
let discount;
if (Amount > 5000) {
    discount = 15;
}
else {
    discount = 5;
}
let discountAmount = (Amount * discount) / 100;
let finalPrice = Amount - discountAmount;
console.log(finalPrice);
