// VARIABLES

let currentNumber = "";
let previousNumber = "";
let operator = null;


// UPDATE DISPLAY

function updateDisplay() {

    // Display angka saat ini
    if (currentNumber === "") {
        document.getElementById("current").innerText = "0";
    } else {
        document.getElementById("current").innerText = currentNumber;
    }


    // Display angka sebelumnya dan operator
    if (previousNumber !== "" && operator !== null) {

        document.getElementById("previous").innerText =
            previousNumber + " " + getOperatorSymbol(operator);

    } else {

        document.getElementById("previous").innerText = "";

    }

}


// OPERATOR SYMBOL

function getOperatorSymbol(operator) {

    if (operator === "+") {
        return "+";
    }

    if (operator === "-") {
        return "−";
    }

    if (operator === "*") {
        return "×";
    }

    if (operator === "/") {
        return "÷";
    }

    return "";
}


// DISPLAY ERROR

function showError(message) {

    document.getElementById("error").innerText = message;

}


// CLEAR ERROR

function clearError() {

    document.getElementById("error").innerText = "";

}


// INPUT NUMBER

function appendNumber(number) {

    clearError();


    // Validasi titik desimal
    if (number === "." && currentNumber.includes(".")) {

        showError("Only one decimal point is allowed.");

        return;
    }


    // Jika user langsung menekan titik
    if (number === "." && currentNumber === "") {

        currentNumber = "0.";

    }


    // Mencegah angka nol berulang di awal
    else if (
        currentNumber === "0" &&
        number !== "."
    ) {

        currentNumber = number;

    }


    // Menambahkan angka
    else {

        currentNumber += number;

    }


    updateDisplay();

}


// CHOOSE OPERATOR

function chooseOperator(selectedOperator) {

    clearError();


    // Validasi input
    if (currentNumber === "" && previousNumber === "") {

        showError("Please enter a number first.");

        return;
    }


    // Jika operator sudah ada
    if (
        previousNumber !== "" &&
        currentNumber !== "" &&
        operator !== null
    ) {

        calculate();

    }


    // Menyimpan angka pertama
    if (currentNumber !== "") {

        previousNumber = currentNumber;

        currentNumber = "";

    }


    // Menyimpan operator
    operator = selectedOperator;


    updateDisplay();

}


// CALCULATE

function calculate() {

    clearError();


    // Validasi data
    if (
        previousNumber === "" ||
        currentNumber === "" ||
        operator === null
    ) {

        showError(
            "Please enter two numbers and an operator."
        );

        return;
    }


    // Mengubah String menjadi Number
    const number1 = parseFloat(previousNumber);
    const number2 = parseFloat(currentNumber);

    let result;


    // Validasi angka
    if (
        Number.isNaN(number1) ||
        Number.isNaN(number2)
    ) {

        showError("Invalid number.");

        return;
    }


    // OPERATORS

    if (operator === "+") {

        result = number1 + number2;

    }

    else if (operator === "-") {

        result = number1 - number2;

    }

    else if (operator === "*") {

        result = number1 * number2;

    }

    else if (operator === "/") {

        // Validasi pembagian dengan nol
        if (number2 === 0) {

            showError(
                "Cannot divide by zero."
            );

            return;
        }

        result = number1 / number2;

    }


    // Membatasi angka desimal
    result = Number(result.toFixed(10));


    // Menampilkan hasil
    currentNumber = result.toString();

    previousNumber = "";

    operator = null;


    updateDisplay();

}


// CLEAR CALCULATOR

function clearCalculator() {

    currentNumber = "";

    previousNumber = "";

    operator = null;

    clearError();

    updateDisplay();

}


// DELETE LAST NUMBER

function deleteNumber() {

    clearError();


    if (currentNumber !== "") {

        currentNumber =
            currentNumber.slice(0, -1);

    }


    updateDisplay();

}


// KEYBOARD SUPPORT

document.addEventListener(
    "keydown",
    function(event) {

        const key = event.key;


        // NUMBER

        if (
            (key >= "0" && key <= "9") ||
            key === "."
        ) {

            appendNumber(key);

        }


        // OPERATOR

        else if (
            key === "+" ||
            key === "-" ||
            key === "*" ||
            key === "/"
        ) {

            chooseOperator(key);

        }


        // ENTER

        else if (
            key === "Enter" ||
            key === "="
        ) {

            calculate();

        }


        // BACKSPACE

        else if (key === "Backspace") {

            deleteNumber();

        }


        // ESCAPE

        else if (key === "Escape") {

            clearCalculator();

        }

    }
);


// INITIAL DISPLAY

updateDisplay();