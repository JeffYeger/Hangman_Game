
const hangmanImage = document.querySelector (".hangman-box img")
const wordDisplay = document.querySelector (".word-display")
const guessText = document.querySelector (".guess-text b")
const keyboardDiv = document.querySelector (".keyboard")
const gameModal = document.querySelector (".game-modal")
const playAgainButton = document.querySelector (".play-again")

let currentWord, correctLetters, wrongGuessCount
const maxGuesses = 6

const resetGame = () => {
    correctLetters = []
    wrongGuessCount = 0
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`
    guessText.innerText = `${wrongGuessCount} / ${maxGuesses}`
    keyboardDiv.querySelectorAll("button").forEach (button => button.disabled = false)
    wordDisplay.innerHTML = currentWord.split ("").map (()=> `<li class = "letter"></li>`).join("")
    gameModal.classList.remove ("show")
}

const getRandomWord = () => {
    const {word, hint} = wordList[Math.floor(Math.random() * wordList.length)]
    currentWord = word
    document.querySelector(".hint-text b").innerText = hint;
    resetGame ()
}

const gameOver = (isVictory)=> {
    setTimeout (()=> {
        const modalText = isVictory ? `You found the word` : `The correct word was`
        gameModal.querySelector("img").src = `images/${isVictory ? 'oh-yeah-dance' : 'ohno'}.gif`
        gameModal.querySelector("h4").innerText = `${isVictory ? 'Congrats!' : 'Game Over!'}`
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`
gameModal.classList.add ("show")
    },300)
}

const startGame = (button, clickedLetter) => {
   if (currentWord.includes (clickedLetter)){
   [...currentWord].forEach ((letter, index) => {
    if (letter === clickedLetter){
        correctLetters.push (letter)
        wordDisplay.querySelectorAll ("li")[index].innerText = letter
        wordDisplay.querySelectorAll ("li")[index].classList.add ("guessed")
    }
   })
   }
   else {
    wrongGuessCount ++;
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`
   }
   button.disabled = true
   guessText.innerText = `${wrongGuessCount} / ${maxGuesses}`
   if (correctLetters.length ===currentWord.length)return gameOver(true)
   if (wrongGuessCount === maxGuesses)return gameOver(false)
 
}
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button")
    button.innerText = String.fromCharCode(i)
    keyboardDiv.appendChild(button)
    button.addEventListener("click", e=> startGame(e.target, String.fromCharCode(i)))
}

getRandomWord()
playAgainButton.addEventListener("click",getRandomWord)