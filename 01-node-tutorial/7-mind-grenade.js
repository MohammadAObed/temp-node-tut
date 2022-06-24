const num1 = 5;
const num2 = 10;

function addValues(){
    console.log(`the sum is: ${num1+num2}`);
}

//when you import this module in another file (by require('./')) you actually invoke it (invoke everything here like console logs functions variables...)
addValues();