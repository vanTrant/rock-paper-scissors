let playerScore = 0;
let computerScore = 0;
let playerScore_span = document.querySelector('.player-score');
let computerScore_span = document.querySelector('.computer-score');
let winner_h2 = document.querySelector('.winner-text');
let playerResult_img = document.getElementById('player-result');
let computerResult_img = document.getElementById('computer-result');
let finalResult_p = document.querySelector('.action-text');
let playerName_input = document.getElementById('player-name');
let playerNick_p = document.getElementById('player-nickname');
const resetContainer_div = document.querySelector('.reset-container');
const rock_btn = document.getElementById('rock');
const paper_btn = document.getElementById('paper');
const scissors_btn = document.getElementById('scissors');
const choice_btn = document.getElementsByClassName('choice');
const body = document.querySelector('body');
const submit_btn = document.querySelectorAll('.submit-button');
const startWindow = document.querySelector('.start-window');

submit_btn.forEach(el => {
    el.addEventListener('click', function(){
        getPlayerName();
        startWindow.style.display = 'none';
    });
})

function getPlayerName() {
    if(playerName_input.value == '') return 'You';
    playerNick_p.textContent = playerName_input.value;
}

function getComputerChoice() {
    let choices = ['rock', 'paper', 'scissors'];
    return choices[getRandomNumber(choices.length)];
}

function getRandomNumber(a) {
    let b = Math.floor(Math.random()*a)
    return b;
}

// For winner text
function getChoice(letter) {
    if(letter === 'rock') return 'Rock';
    if(letter === 'paper') return 'Paper';
    return 'Scissors';
}

function playerWin(playerChoice, computerChoice) {
    console.log('you win');
    playerScore++;
    playerScore_span.innerHTML = playerScore;
    computerScore_span.innerHTML = computerScore;
    winner_h2.innerHTML = `Your ${getChoice(playerChoice)} beat ${getChoice(computerChoice)} (com)`;
    const getId = document.getElementById(playerChoice);
    getId.classList.add('border-win');
    setTimeout( (() => getId.classList.remove('border-win')), 300)
    finalResult();
}

function playerLose(playerChoice, computerChoice) {
    console.log('you lost');
    computerScore++;
    playerScore_span.innerHTML = playerScore;
    computerScore_span.innerHTML = computerScore;
    winner_h2.innerHTML = `Your ${getChoice(playerChoice)} lost to ${getChoice(computerChoice)} (com)`;
    const getId = document.getElementById(playerChoice);
    getId.classList.add('border-lose');
    setTimeout( (() => getId.classList.remove('border-lose')), 300)
    finalResult();
}

function playerDraw(playerChoice, computerChoice) {
    console.log('draw');
    winner_h2.innerHTML = `Your ${getChoice(playerChoice)} is a draw with ${getChoice(computerChoice)} (com)`;
    const getId = document.getElementById(playerChoice);
    getId.classList.add('border-draw');
    setTimeout( (() => getId.classList.remove('border-draw')), 300)
}

// Change result image
function playerHand(playerChoice, computerChoice) {
    playerResult_img.src = `./assets/${playerChoice}.png`
    computerResult_img.src = `./assets/${computerChoice}.png`
}

function finalResult() {
    if(playerScore === 5) {
        finalResult_p.innerHTML = 'Congratulations, you win!!';
        for(let i = 0; i < choice_btn.length; i++) {
            choice_btn[i].style.pointerEvents = 'none';
        }
        resetButton();
    } else if(computerScore === 5) {
        finalResult_p.innerHTML = 'You lost..';
        for(let i = 0; i < choice_btn.length; i++) {
            choice_btn[i].style.pointerEvents = 'none';
        }
        resetButton();
    }
}

function resetButton() {
    const resetGame = document.createElement('button');
    resetContainer_div.appendChild(resetGame);
    resetGame.textContent = 'Reset';
    resetGame.classList.add('reset-button');
    resetGame.onclick = function() {
        resetScore();
        resetGame.remove();
    }
}

function resetScore() {
    playerScore = 0;
    computerScore = 0;
    playerScore_span.innerHTML = 0;
    computerScore_span.innerHTML = 0;
    finalResult_p.innerHTML = 'The first to get scores of 5 is the winner'
    playerHand('rock', 'rock');
    resetClick();
}

function resetClick() {
    for(let i = 0; i < choice_btn.length; i++) {
        choice_btn[i].style.pointerEvents = 'visible';
    }
}

function choice(playerChoice) {
    let computerChoice = getComputerChoice();
    console.log(playerChoice + '-' + computerChoice);
    switch(playerChoice + '-' + computerChoice) {
        case 'rock-scissors':
        case 'paper-rock':
        case 'scissors-paper':
            playerWin(playerChoice, computerChoice);
            playerHand(playerChoice, computerChoice);
            break;
        case 'rock-paper':
        case 'paper-scissors':
        case 'scissors-rock':
            playerLose(playerChoice, computerChoice);
            playerHand(playerChoice, computerChoice);
            break;
        default:
            playerDraw(playerChoice, computerChoice);
            playerHand(playerChoice, computerChoice);
            break;
    }
}

function main() {
    rock_btn.addEventListener('click', () => choice('rock')); 
    paper_btn.addEventListener('click', () => choice('paper'));
    scissors_btn.addEventListener('click', () => choice('scissors'))
}


console.log(main());