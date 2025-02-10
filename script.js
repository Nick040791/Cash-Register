const price = document.getElementById('price');
const cash = document.getElementById('cash');
const calculate = document.getElementById('calculate');
const change = document.getElementById('change');

const currencyUnits = [
    { name: 'ONE HUNDRED', value: 100.00 },
    { name: 'TWENTY', value: 20.00 },
    { name: 'TEN', value: 10.00 },
    { name: 'FIVE', value: 5.00 },
    { name: 'ONE', value: 1.00 },
    { name: 'QUARTER', value: 0.25 },
    { name: 'DIME', value: 0.10 },
    { name: 'NICKEL', value: 0.05 },
    { name: 'PENNY', value: 0.01 }
];

calculate.addEventListener('click', () => {
    const total = parseFloat(price.value);
    const given = parseFloat(cash.value);
    let changeDue = (given - total).toFixed(2);

    if (isNaN(total) || isNaN(given)) {
        alert("Please enter valid numbers for both total and cash.");
        return;
    }

    if (given < total) {
        alert("Customer does not have enough money to purchase the item");
        return;
    }

    let changeArray = calculateChange(changeDue);
    if (changeArray) {
        change.innerHTML = `Total Change Due: $${changeDue}<br>${formatChange(changeArray)}`;
    } else {
        change.innerHTML = "INSUFFICIENT_FUNDS";
    }
});

function calculateChange(changeDue) {
    let changeArray = [];
    for (let unit of currencyUnits) {
        let count = 0;
        while (changeDue >= unit.value) {
            changeDue = (changeDue - unit.value).toFixed(2);
            count++;
        }
        if (count > 0) {
            changeArray.push([unit.name, count]);
        }
    }
    return changeArray;
}

function formatChange(changeArray) {
    return changeArray.map(change => `${change[1]} ${change[0]}${change[1] > 1 ? 's' : ''}`).join(', ');
}
