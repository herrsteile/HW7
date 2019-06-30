'use strict';

document.onkeypress = function (event) {
    console.log(event.key);
};

class Calculator {
    constructor(where) {
        const env = document.querySelector('#enviroment');

        const chars = [
            'C', 'CC->C', 'x2/x', 'ON/OFF',
            55, 56, 57, 'x2', /** 7 8 9 */
            52, 53, 54, 47, /** 4 5 6 / */
            49, 50, 51, 42, /** 1 2 3 * */
            46, 48, 43, 61, /** . 0 + = */
        ];
        const bindedCalaulate = this.calculate.bind(this);

        let isWorking = false;

        (function init() {
            let out = '';
            let buttons = '';

            out += `<div class="input"><input></div>`;
            out += `<div class="manufacturer">Miroshnychenko Dmitriy</div>`;
            out += '<div class="buttons"></div>';

            for (let i = 0; i < chars.length; i++) {
                if (!isFinite(chars[i])) {
                    buttons += `<button>${chars[i]}</button>`;
                } else {
                    buttons += `<button>${String.fromCharCode(chars[i])}</button>`;
                }
            }
            // console.log(buttons);

            env.innerHTML = out;
            document.querySelector('.buttons').innerHTML = buttons;

            const buttonKey = document.querySelectorAll('button');

            buttonKey.forEach((char) => {

                if (!isFinite(char.textContent) && char.textContent !== 'ON/OFF' && char.textContent !== '.') {
                    char.className = 'sign';
                } else if (char.textContent === 'ON/OFF') {
                    char.className = 'onOff'
                }

                char.onclick = function () {
                    const input = env.firstElementChild.firstElementChild;

                    if (char.innerText === '.' && input.value.includes('.'))
                        return;

                    switch (char.textContent) {
                        case '+':
                        case '-':
                        case '*':
                        case '/': sign = char; break;
                        case '=': return input.value = bindedCalaulate(input.value, sign);
                    }

                    if (char === 'C') {
                        input.value = '';
                        return;
                    }

                    input.value += char.innerText;
                    console.log(input);
                };
                // return input;
            });

        })();

    };

    calculate(str, sign) {
        const [firstOperand, secondOperand] = str.split(sign);

        switch (sign) {
            case '+': return +firstOperand + +secondOperand;
            case '-': return +firstOperand - +secondOperand;
            case '*': return +firstOperand * +secondOperand;
            case '/': return +firstOperand / +secondOperand;
        }
    }
};
new Calculator('enviroment');