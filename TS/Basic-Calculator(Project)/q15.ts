let units: number = 150;
let totalBill: number = 0;

if (units <= 100) {

    totalBill = units * 5;

}

else {
    let baseCharge = 100 * 5;

    let extraUnits = units - 100;

    let extraCharge = extraUnits * 8;

    totalBill = baseCharge + extraCharge;
}

console.log(totalBill);