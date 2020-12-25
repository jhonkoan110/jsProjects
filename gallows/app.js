const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
ctx.lineWidth = 4;
ctx.strokeStyle = 'gold';

//регуляерное выражение для ввода только букв в инпут
const regExp = /[A-Za-zА-Яа-яЁё]/;
let regExpInput = document.querySelector('#input');

regExpInput.addEventListener('keyup', () => {
    if (!regExp.test(regExpInput.value)) {
        regExpInput.value = '';
    }
    if (regExpInput.value.length > 1)
        regExpInput.value = regExpInput.value[0];
})

const words = [
    'виселица',
    'рис',
    'толерантность',
    'поездка',
    'табуретка',
    'бутылка',
    'лекарство',
    'апокалипсис',
    'книга',
    'машина',
    'гений'
];

const reloadBtn = document.querySelector('#reload');
const tryBtn = document.querySelector('#tryBtn');
const word = words[Math.floor(Math.random() * words.length)];

const answerArray = [];

let tries = 10;
let remainingLetters = word.length;

for (let i = 0; i < word.length; i++) 
    answerArray[i] = '_';

const checkArray = answerArray;

$('#answer').text(answerArray.join(' '));

// обработчки клика по кнопке "начать сначала"
reloadBtn.addEventListener('click', () => {
    window.location.reload();
})

//обработчик клика по кнопке "попробоать", логика игры
tryBtn.addEventListener('click', () => {
    let input = document.querySelector('#input');

    if (remainingLetters > 0 && tries > 0) {

        $('#answer').text(answerArray.join(' '));
        
        if (input.value !== '' && input.value.length === 1) {

            if (answerArray.indexOf(input.value) === -1) {

                for (let i = 0; i < word.length; i++) {
                    if (input.value.toLowerCase() === word[i]) {
                        answerArray[i] = input.value;
                        remainingLetters--;
                    }
                }
            }

            if(checkArray === answerArray 
                && answerArray.indexOf(input.value) === -1)
                    tries--;
        }        
    } 
   
    input.value = '';
    $('#answer').text(answerArray.join(' ').toUpperCase());
    
    if(remainingLetters === 0) {
        $('p').text('Отлично! Вы отгадали слово: ' + word);
        input.disabled = true;
        input.placeholder = 'Вы победили!';
    }
        
    if(tries === 0) {
        $('p').text('К сожалению Вы проиграли. Попытки закончились.')
        input.disabled = true;
        input.placeholder = 'Вы проиграли';
    }


//отрисовка картинки при ошибках
    switch (tries) {
        case 9: 
            ctx.strokeRect(140,20,20,20);
            break;
        case 8: 
            draw(150,40,150,50);
            break;
        case 7:
            draw(150,50,130,60);
            break;
        case 6:
            draw(150,50,170,60);
            break;
        case 5:
            draw(150,50,150,80);
            break;
        case 4: 
            draw(150,80,140,110);
            break;
        case 3: 
            draw(150,80,160,110);
            break;
        case 2: 
            draw(150,20,150,10);
            break;
        case 1: 
            draw(150, 10, 180, 10);
            break;
        case 0: 
            draw(180, 10, 180, 130);
            break;
    }
})

const draw = (x, y, a, b) => {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(a, b);
    ctx.stroke();
}
