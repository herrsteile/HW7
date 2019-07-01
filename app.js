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
        this.buttonsroot = document.createElement('div');

        this.buttonsroot.className = 'btn';

        const chars = [
            'C', 'CC->C', 'x2/x', 'ON/OFF',
            55, 56, 57, 'x2', /** 7 8 9 */
            52, 53, 54, 47, /** 4 5 6 / */
            49, 50, 51, 42, /** 1 2 3 * */
            46, 48, 43, 61, /** . 0 + = */
        ];

        let isWorking = false;
        let sign = null;
        
        const buttons = chars.map((char, i) => {
            const button = document.createElement('button');


            if (char.textContent === '+' || char.textContent === '-' || char.textContent === '/' || char.textContent === '*' || char === 'C' || char === 'CC->C' || char === 'x2/x' || char === 'x2' || char.textContent === '=') {
                button.className = 'sign';

            } else if (char === 'ON/OFF') {
                button.id = 'onOff';
            }

            if (!isFinite(chars[i])) {
                button.textContent = char;
                button.setAttribute('data-char', char);
            } else {
                button.textContent = String.fromCharCode(chars[i])
                button.setAttribute('data-char', String.fromCharCode(chars[i]));
            }

            return button;
        });

        this.buttonsroot.addEventListener('click', event => {
            if (event.target.querySelector('.btn')) {
                console.log('work');
            }
        });

        this.buttonsroot.addEventListener('click', event => {
            if (!isWorking && event.target.id === 'onOff') {
                console.log('turnOn');

                return isWorking === true;

            } else if (isWorking === true && event.target.id === 'onOff') {
                console.log('turnOff');

                return isWorking === false;
            }
        });

        if (isWorking === true) {
            this.buttonsroot.addEventListener('click', event => {
                if (event.target.tagName !== 'BUTTON') return;

                const input = document.querySelector('.calculator').firstElementChild.firstElementChild;
                const btn = event.target;
                const char = btn.dataset.char;

                // console.log(char);

                switch (char) {
                    case '+':
                    case '-':
                    case '*':
                    case '/': sign = char; break;
                    case 'CC->C': sign = char; return input.value = this.calculate(input.value, sign);
                    case 'x2': sign = char; return input.value = this.calculate(input.value, sign);
                    case 'x2/x': sign = char; return input.value = this.calculate(input.value, sign);
                    case '=': return input.value = this.calculate(input.value, sign);
                }

                if (char === '.' && input.value.includes('.')) return;

                if (char === 'C') {
                    input.value = '';
                    return;
                }

                // console.log(input.value);
                input.value += char;

            })
        }

        for (const btns of buttons) {
            this.buttonsroot.append(btns);
        }
        
        return this.buttonsroot;
    }

    calculate(str, sign) {
        const [firstOperand, secondOperand] = str.split(sign);

        switch (sign) {
            case '+': return +firstOperand + +secondOperand;
            case '-': return +firstOperand - +secondOperand;
            case '*': return +firstOperand * +secondOperand;
            case '/': return +firstOperand / +secondOperand;
            case 'CC->C': return firstOperand.slice(0, -1);
            case 'x2': return +firstOperand * +firstOperand;
            case 'x2/x': return Math.sqrt(+firstOperand);
        }
    }
}

class Calculator {
    constructor() {
        this.calculator = document.createElement('div');

        this.calculator.className = 'calculator';
        this.calculator.innerHTML = ``;

        this.calculator.append(new Input, new Manufacturer, new Buttons);

        return this.calculator;
    };

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

new App('#root').render();

