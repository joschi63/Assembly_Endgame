import React from 'react'
import Header from './Header.jsx'
import Status from './Status.jsx'
import LanguagesComp from './LanguagesComp.jsx'
import { languages } from '../../languages.js'
import { getFarewellText } from '../../utils.js'

export default function App() {

    // State values
    const [currentWord, setCurrentWord] = React.useState("react")
    const [guessedLetters, setGuessedLetters] = React.useState([])
    
    // Derived values
    const wrongGuessesCount = guessedLetters.filter( letter => !currentWord.includes(letter) ).length
    const gameWon = currentWord.split("").every( letter => guessedLetters.includes(letter) )
    const gameLost = wrongGuessesCount >= languages.length - 1
    const gameOver = gameWon || gameLost

    // Static values
    const wordElements = currentWord.split("").map((letter, index) => {
        return (
            <span key={index} className="letter">
                {guessedLetters.includes(letter) ? letter.toUpperCase() : " "}
            </span>
        )
    })

    const languagesComp = languages.map((language, index) => {
        const className = index < wrongGuessesCount ? "language lost" : "language"
        return <LanguagesComp 
            key={language.name} 
            backgroundColor={language.backgroundColor} 
            color={language.color} 
            className={className}
            name={language.name} 
            />
    })

    const alphabet = "abcdefghijklmnopqrstuvwxyz"

    function setLetter(letter) {
        setGuessedLetters(prevLetters => {
            if (prevLetters.includes(letter)) {
                return prevLetters
            }
            return [...prevLetters, letter]
        })
        console.log(guessedLetters)
    }

    function setClass(letter) {
        if (guessedLetters.includes(letter)) {
            if (currentWord.includes(letter)) {
                return "right-guessed"
            } else {
                return "wrong-guessed"
            }
        } 
        return "key"
    }

    const keyboardElements = alphabet.split("").map((letter) => {
        return (
            <button 
                className={setClass(letter)} 
                key={letter} 
                onClick={() => setLetter(letter)} 
                disabled={gameOver || guessedLetters.includes(letter)}>
                {letter.toUpperCase()} 
            </button>
        )
    })

    function startNewGame() {
        setGuessedLetters([])

    }

    function getMessage() {
        if (wrongGuessesCount === 0 || currentWord.includes(guessedLetters[guessedLetters.length - 1])) {
            return ""
        } else {
            return getFarewellText(languages[wrongGuessesCount - 1]?.name)
        }
    }

    return (
        <main>
            <Header />
            <Status won={gameWon} lost={gameLost} message={getMessage} />
            <section className="languages-container">
                {languagesComp}
            </section>
            <section className="word-container">
                {wordElements}
            </section>
            <section className="keyboard-container">
                {keyboardElements}
            </section>

            { gameOver &&
                <button className="new-game-button" onClick={startNewGame}>New Game</button>
            }
        </main>
    )
}
