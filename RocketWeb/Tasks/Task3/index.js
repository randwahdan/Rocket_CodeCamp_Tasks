const getHistory = () => document.getElementById("history-value").innerText;

const printHistory = (num) => {
    document.getElementById("history-value").innerText = num;
};

const getOutput = () => document.getElementById("output-value").innerText;

const printOutput = (num) => {
    const outputValue = document.getElementById("output-value");
    if (num === "") {
        outputValue.innerText = num;
    } else {
        outputValue.innerText = getFormattedNumber(num);
    }
};

const getFormattedNumber = (num) => {
    if (num === "-") {
        return "";
    }
    const n = Number(num);
    const value = n.toLocaleString("en");
    return value;
};

const reverseNumberFormat = (num) => Number(num.replace(/,/g, ''));

const operator = document.getElementsByClassName("operator");
for (let i = 0; i < operator.length; i++) {
    operator[i].addEventListener('click', () => {
        if (operator[i].id === "clear") {
            printHistory("");
            printOutput("");
        } else if (operator[i].id === "backspace") {
            let output = reverseNumberFormat(getOutput()).toString();
            if (output) {
                output = output.substr(0, output.length - 1);
                printOutput(output);
            }
        } else {
            const output = getOutput();
            let history = getHistory();
            if (output === "" && history !== "") {
                if (isNaN(history[history.length - 1])) {
                    history = history.substr(0, history.length - 1);
                }
            }
            if (output !== "" || history !== "") {
                const formattedOutput = output === "" ? output : reverseNumberFormat(output);
                history = history + formattedOutput;
                if (operator[i].id === "=") {
                    const result = eval(history);
                    printOutput(result);
                    printHistory("");
                } else {
                    history = history + operator[i].id;
                    printHistory(history);
                    printOutput("");
                }
            }
        }
    });
}

const number = document.getElementsByClassName("number");
for (let i = 0; i < number.length; i++) {
    number[i].addEventListener('click', function () {
        let output = reverseNumberFormat(getOutput());
        if (!isNaN(output)) {
            output = output + this.id;
            printOutput(output);
        }
    });
}
