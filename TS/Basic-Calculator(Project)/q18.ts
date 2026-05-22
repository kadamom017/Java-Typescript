let Amount: number = 6000;

let discount: number;

if (Amount > 5000) {

    discount = 15;

}

else {

    discount = 5;

}

let discountAmount: number = (Amount * discount) / 100;

let finalPrice: number = Amount - discountAmount;

console.log(finalPrice);