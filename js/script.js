const controlButtons = document.getElementById('control_buttons')
const bodyCalculatorButtons = document.getElementById('body_buttons')

// будет 2 кнопки - вычислить и очистить панель
// они не должны заходить за границы -> нужно уводить их дальше вглубь

class Calculator{
    constructor(){
        // this.calculatorHeader = document.getElementById('header_calculator')
    }

    // делаем кнопки управления: очистить панель и произвести рассчеты
    makeControlBtns(){
        const clearThePanelView = document.createElement('button')

        clearThePanelView.value = 'ОЧИСТИТЬ ПАНЕЛЬ'
        clearThePanelView.innerText = 'ОЧИСТИТЬ ПАНЕЛЬ'

        const calculateTheValue = document.createElement('button')

        calculateTheValue.value = 'ПРОИЗВЕСТИ РАСЧЕТ'
        calculateTheValue.innerText = 'ПРОИЗВЕСТИ РАСЧЕТ'

        clearThePanelView.addEventListener('click', (ev) => {
            document.getElementById('header_calculator').innerText = ""
        })

        // вычисление значения
        calculateTheValue.addEventListener('click', (ev) => {
            const totalValue = document.getElementById('header_calculator').innerText
            const symbols = totalValue.replace(/\s+/g, '');

            const operations = {
                '+': (a, b) => a+b,
                '-': (a, b) => a-b,
                '*': (a, b) => a*b,
                '/': (a, b) => a/b
            }

            const tokens = symbols.match(/(\d+\.?\d*|[+\-*/])/g)

            for (let i = 0; i < tokens.length; i++) {
                if (tokens[i] === '*' || tokens[i] === '/') {
                const left = parseFloat(tokens[i - 1]);
                const right = parseFloat(tokens[i + 1]);
                const result = operations[tokens[i]](left, right);
                
                // Заменяем три элемента на результат
                tokens.splice(i - 1, 3, result.toString());
                i--; // Возвращаемся, чтобы проверить следующий оператор
                }
            }

            let result = parseFloat(tokens[0]);
            for (let i = 1; i < tokens.length; i += 2) {
                const operator = tokens[i];
                const right = parseFloat(tokens[i + 1]);
                result = operations[operator](result, right);
            }

            document.getElementById('header_calculator').innerText = result
        })

        controlButtons.append(calculateTheValue, clearThePanelView)
    }

    // сами кнопки цифр от 0 до 9
    makeBodyBtns(){
        const calcBodyBtns = document.getElementById("body_buttons");

        for(let i = 0; i < 10; i++){
            const bodyCellBtn = document.createElement("button")
            
            bodyCellBtn.className = "bodyCellBtn"

            bodyCellBtn.innerHTML = `<span>${i}</span>`

            bodyCellBtn.addEventListener("click", (ev) => {
                const lastSymbol = document.getElementById('header_calculator').innerText.at(-1)
                if(document.getElementById('header_calculator').innerText.length == 0){
                    if(ev.target.innerText != 0)
                        document.getElementById('header_calculator').innerText += ev.target.innerText
                }else if
                (
                    lastSymbol == '-' ||
                    lastSymbol == '+' ||
                    lastSymbol == '*' ||
                    lastSymbol == '/'
                ){
                    if(ev.target.innerText != 0){
                        document.getElementById('header_calculator').innerText += ev.target.innerText
                    }
                }
                else
                    document.getElementById('header_calculator').innerHTML += `${ev.target.innerText}`
            })

            calcBodyBtns.appendChild(bodyCellBtn)
        }
    }

    // кнопки управления: + - * /
    makeCalculateBtns(){
        const calcBtns = document.getElementById('calculateBtns');
        calcBtns.className = 'calcBtns'

        const plus = document.createElement('button')
        plus.innerText = '+'

        const minus = document.createElement('button')
        minus.innerText = '-'

        const multiply = document.createElement('button')
        multiply.innerText = '*'

        const divide = document.createElement('button')
        divide.innerText = '/'

        const btns = []

        btns[0] = plus
        btns[1] = minus
        btns[2] = multiply
        btns[3] = divide

        btns.forEach(elem => {
            elem.addEventListener('click', ev => {
                const headerDiv = document.getElementById('header_calculator').innerText

                if(headerDiv.length == 0){
                    if(ev.target.innerText == '-'){
                        document.getElementById('header_calculator').innerText += '-'
                    }
                }

                else{
                    const lastSymbol = headerDiv.at(-1)
                    if(
                        lastSymbol == '-' ||
                        lastSymbol == '+' ||
                        lastSymbol == '*' ||
                        lastSymbol == '/'
                    ){
                        let tmpArray = Array.from(headerDiv)

                        tmpArray.splice(-1, 1, ev.target.innerText)

                        document.getElementById('header_calculator').innerText = tmpArray.join('')
                    }else{
                        document.getElementById('header_calculator').innerText += ev.target.innerText
                    }
                }
            })
        })

        calcBtns.append(...btns)
    }
}

let calculator = new Calculator()

calculator.makeControlBtns()
calculator.makeBodyBtns()
calculator.makeCalculateBtns()
