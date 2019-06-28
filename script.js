'use strict';

document.onkeypress = function (event) {
    console.log(event.key);
}

class Calculator {
    constructor(where) {
        const chars = [
            'C', 'CC->C', 'x2/x', 'ON/OFF',
            55, 56, 57, 'x2', /** 7 8 9 */
            52, 53, 54, 47, /** 4 5 6 / */
            49, 50, 51, 42, /** 1 2 3 * */
            46, 48, 43, 61, /** . 0 + = */
        ]
        const input = document.getElementsByTagName('input');

        let isWorking = false;
        (function init() {
            let out = '';
            let buttons = '';
            out += `<div class="input"><input></input></div>`
            out += `<div class="manufacturer">Miroshnychenko Dmitriy</div>`
            out += '<div class="buttons"></div>';
            for (let i = 0; i < chars.length; i++) {
                if (!isFinite(chars[i])) {
                    buttons += `<button>${chars[i]}</button>`;
                } else {
                    buttons += `<button>${String.fromCharCode(chars[i])}</button>`;
                }
            }
            // console.log(buttons);

            document.querySelector('#enviroment').innerHTML = out;
            document.querySelector('.buttons').innerHTML = buttons;

            const buttonKey = document.querySelectorAll('button');

            buttonKey.forEach((char, i) => {
                if (char.innerText === '/' || char.innerText === '*' || char.innerText === '+' || char.innerText === '=' || char.innerText === 'x2' || char.innerText === 'x2/x') {
                    char.className = 'sign';
                }
                
                char.onclick = function () {
                    if (char.innerText === '.' && input.value.includes('.'))
                        return;

                    if (char === 'C') {
                        input.value = '';
                        return;
                    }

                    input.value += char.innerText;
                    console.log(input);
                };
                return char;
            });

        })();

    };
};
new Calculator('enviroment');