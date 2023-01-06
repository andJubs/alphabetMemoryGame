const grid = document.querySelector('.grid');

const spanPlayer = document.querySelector('.player');

const timer = document.querySelector('.timer');


// array list que contém todos as imagens do jogo
const alphabet = [
  'A', 'Abelha',
  'B', 'Bolo',
  'C', 'Casa', 
  'D', 'Diamante', 
  'E', 'Elefante', 
  'F', 'Foguete', 
  'G', 'Gato', 
  'H', 'Hipopótamo', 
  'I', 'Ilha', 
  'J', 'Janela', 
  'K', 'Kiwi', 
  'L', 'Livro', 
  'M', 'Melancia', 
  'N', 'Nuvem', 
  'O', 'Oculos', 
  'P', 'Pipoca', 
  'Q', 'Queijo',
  'R', 'Rato', 
  'S', 'Sapatilha', 
  'T', 'Tatu',
  'U', 'Uva', 
  'V', 'Violão', 
  'W', 'Waffles', 
  'X', 'Xícara', 
  'Y', 'YouTube', 
  'Z', 'Zebra',
]

// função responsável por criar um novo elemento dentro da carta (front, back)
const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;

    return element;
}


// variáveis que guardam o nome das cartas em aberto no jogo
let firstCard = '';
let secondCard = '';


// função que verifica se a classe 'reveal-card' foi adicionada a todas as cartas.
const checkEndGame = () => {
    const disableCards = document.querySelectorAll('.disable-card');

    if (disableCards.length == 52) {
        clearInterval(this.loop);
        alert(`Parabéns ${spanPlayer.innerHTML}! Você concluiu o jogo em ${timer.innerHTML} segundos. 😄`);
    }
}


// função que verifica se as cartas são iguais ou não.
const checkCards = () => {
    const selectCard1 = firstCard.getAttribute('data-alphabet');
    const selectCard2 = secondCard.getAttribute('data-alphabet');

    if (selectCard1 == selectCard2) {

        setTimeout(() => {
            firstCard.firstChild.classList.add('disable-card');
            secondCard.firstChild.classList.add('disable-card');

            firstCard = '';
            secondCard = '';

            checkEndGame();
        }, 1000);
        
    } else {

        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';
        }, 1000);
    }
}


// função que chama a classe 'reveal card'
const revealCard = ( { target } ) => {

    // se a carta já conter a classe reveal-card, o jogo não fará nada.
    if (target.parentNode.className.includes('reveal-card')) {
        return;
    }

    // teste: se a var firstCard é vazia, adicionar primeira carta; senão, se var secondCard é vazia, adicionar segunda carta.
    if (firstCard == '') {
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
        
    } else if (secondCard == '') {
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards();
    } 

}


// função que agrupa todos os elementos da carta
const createCard = (letter) => {

    const card = createElement('div', 'card');
    const front = createElement('div', 'default-card front');
    const back = createElement('div', 'default-card back');

    front.style.backgroundImage = `url('images/${letter}.png')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    let cardLetter = letter;
    card.setAttribute('data-alphabet', cardLetter.slice(0, 1));

    return card;
}


// função que carrega o jogo, gerando as cartas em ordem aleatória.
const loadGame = () => {

    const shuffledArray = alphabet.sort( () => Math.random() - 0.5);

    shuffledArray.forEach((letter) => {
        const card = createCard(letter);
        grid.appendChild(card);

    })
}


// função que gera o timer do jogo.
const startTimer = () => {
    this.loop = setInterval(() => {
        const currentTime = +timer.innerHTML;
        timer.innerHTML = currentTime + 1;
    }, 1000);
}


// chamada das funções que criam o jogo na tela do jogador.
window.onload = () => {
    spanPlayer.innerHTML = localStorage.getItem('player');
    
    startTimer();
    loadGame();
}

