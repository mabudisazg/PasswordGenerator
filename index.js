const resultElement = document.getElementById('result')
const lengthElement = document.getElementById('length')
const uppercaseElement = document.getElementById('uppercase')
const lowercaseElement = document.getElementById('lowercase')
const numbersElement = document.getElementById('numbers')
const symbolsElement = document.getElementById('symbols')
const generateElement = document.getElementById('generatePassword')
const clipboardElement = document.getElementById('clipboard')



const randomFunction = {
    upper: getRandomUpper,
    lower: getRandomLower,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

generateElement.addEventListener('click', () => {
    const length = +lengthElement.value;
    const hasUpper = uppercaseElement.checked;
    const hasLower = lowercaseElement.checked;
    const hasNumber = numbersElement.checked;
    const hasSymbols = symbolsElement.checked;

    resultElement.innerText = generatePassword(hasUpper,hasLower,hasNumber,hasSymbols,length);
})

function generatePassword(upper,lower,number,symbol,length) {
    let generatedPassword = '';
    const typesCount = upper + lower + number + symbol;
    const typesArr = [{upper}, {lower}, {number}, {symbol}].
    filter(item => Object.values(item)[0]) // filter anything that has false as a value 
    
    if(typesCount === 0) {
        return '';
    }

    for(let i = 0; i < length; i += typesCount){
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            generatedPassword += randomFunction[funcName]();
        })
    }

    const finalPassword = generatedPassword.slice(0, length);
    return finalPassword;
}

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function getRandomSymbol() {
    const symbols = '!#$%&/()=?*@[]{}<>.,-';
    return symbols[Math.floor(Math.random() * symbols.length)]
}