// Version 1: Classic
function classicFizzBuzz() {
    for (let i = 1; i <= 100; i++) {
        let out = "";
        if (i % 3 === 0) out += "Fizz";
        if (i % 5 === 0) out += "Buzz";
        console.log(out || i);
    }
}

// Version 2: Custom
function customFizzBuzz(n, rules) {
    for (let i = 1; i <= n; i++) {
        let out = "";
        for (let j = 0; j < rules.length; j++) {
            if (i % rules[j].divisor === 0) {
                out += rules[j].word;
            }
        }
        console.log(out || i);
    }
}

// Test Custom
customFizzBuzz(35, [
    { divisor: 3, word: "Fizz" },
    { divisor: 5, word: "Buzz" },
    { divisor: 7, word: "Jazz" }
]);