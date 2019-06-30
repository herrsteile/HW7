'use strict';

class Input {
    constructor() {
        this.input = document.createElement('div');

        this.input.className = 'input';
        this.input.innerHTML = `<input>`;
        return this.input;
    }
}

class Manufacturer {
    constructor() {
        this.manuf = document.createElement('div');

        this.manuf.className = 'manuf';
        this.manuf.innerHTML = `Miroshnychenko Dmitriy`;

        return this.manuf;
    }
}
class Buttons {
    constructor() {
        this.buttonsEnviroment = document.createElement('div');

        this.buttonsEnviroment.className = 'btn';

        const chars = [
            'C', 'CC->C', 'x2/x', 'ON/OFF',
            55, 56, 57, 'x2', /** 7 8 9 */
            52, 53, 54, 47, /** 4 5 6 / */
            49, 50, 51, 42, /** 1 2 3 * */
            46, 48, 43, 61, /** . 0 + = */
        ];

        let isWorking = true;

        const buttons = chars.map((char, i) => {
            const button = document.createElement('button');


            if (!isFinite(chars[i])) {
                button.textContent = char;
                button.setAttribute('data-char', char);
            } else {
                button.textContent = String.fromCharCode(chars[i])
                button.setAttribute('data-char', String.fromCharCode(chars[i]));
            }

            return button;
        });

        const onOff = document.querySelector('.btn button[data-char="ON/OFF"]')
        console.log(onOff);

        if (isWorking === true) {
            this.buttonsEnviroment.addEventListener('click', event => {
            if (event.target.tagName !== 'BUTTON') return;

            const input = document.querySelector('.calculator').firstElementChild.firstElementChild;
            const btn = event.target;
            const char = btn.dataset.char;

            console.log(char);

            switch (char) {
                case '+':
                case '-':
                case '*':
                case '/': sign = char; break;
                case '=': return input.value = this.calculate(input.value, sign);
            }

            if (char === '.' && input.value.includes('.')) return;

            if (char === 'c') {
                input.value = '';
                return;
            }

            console.log(input.value);
            input.value += char;
        })} else {

        }

        for (const btns of buttons) {
            this.buttonsEnviroment.append(btns);
        }

        return this.buttonsEnviroment;
    }
}

class Calculator {
    constructor(where) {
        this.calculator = document.createElement('div');

        this.calculator.className = 'calculator';
        this.calculator.innerHTML = ``;

        this.calculator.append(new Input, new Manufacturer, new Buttons);

        return this.calculator;
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


}
class App {
    constructor(where) {
        this.where = where;
        this.app = document.createElement('div');

        this.app.className = 'app';
        this.app.append(new Calculator);
    };

    render() {
        document.querySelector(this.where).append(this.app);
    }

}

new App('#enviroment').render();