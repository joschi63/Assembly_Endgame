import React from 'react'
import Header from './Header.jsx'
import Status from './Status.jsx'
import LanguagesComp from './LanguagesComp.jsx'
import { languages } from '../../languages.js'
import { getFarewellText, chooseRandomWord } from '../../utils.js'
import { clsx } from 'clsx'
import Confetti from 'react-confetti'

export default function App() {

    // State values
    const [currentWord, setCurrentWord] = React.useState(() => chooseRandomWord()) //callback for lazy initial state
    const [guessedLetters, setGuessedLetters] = React.useState([])

    //only for debugging and testing
    console.log("Current word:", currentWord)
    
    // Derived values
    const wrongGuessesCount = guessedLetters.filter( letter => !currentWord.includes(letter) ).length
    const gameWon = currentWord.split("").every( letter => guessedLetters.includes(letter) )
    const gameLost = wrongGuessesCount >= languages.length - 1
    const gameOver = gameWon || gameLost
    const lastGuessedLetter = String(guessedLetters[guessedLetters.length - 1])
    const numberOfGuessesLeft = languages.length - 1 - wrongGuessesCount

    // Static values
    const wordElements = currentWord.split("").map((letter, index) => {
        const className = clsx("letter", {
            "revealed": !guessedLetters.includes(letter) && gameLost
        })
        return (
            <span key={index} className={className}>
                {guessedLetters.includes(letter) || gameLost ? letter.toUpperCase() : " "}
            </span>
        )
    })

    const languagesComp = languages.map((language, index) => {
        const className = clsx("language", {
            "lost": index < wrongGuessesCount
        })
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

    const keyboardElements = alphabet.split("").map((letter) => {
        const className = clsx("key", {
            "right-guessed": guessedLetters.includes(letter) && currentWord.includes(letter),
            "wrong-guessed": guessedLetters.includes(letter) && !currentWord.includes(letter)
        })
        return (
            <button 
                className={className} 
                key={letter} 
                onClick={() => setLetter(letter)} 
                disabled={gameOver || guessedLetters.includes(letter)}
                aria-disabled={gameOver || guessedLetters.includes(letter)}
                aria-label={`Letter ${letter}`}
            >
                {letter.toUpperCase()} 
            </button>
        )
    })

    function startNewGame() {
        setGuessedLetters([])
        setCurrentWord(chooseRandomWord())
    }

    function getMessage() {
        if (wrongGuessesCount === 0 || currentWord.includes(lastGuessedLetter)) {
            return ""
        } else {
            return getFarewellText(languages[wrongGuessesCount - 1]?.name)
        }
    }

    return (
        <main>
            { gameWon && 
                <Confetti 
                    recycle={false}
                    numberOfPieces={1000}
                />
            }

            { gameLost &&
                <Confetti
                    recycle={false}
                    numberOfPieces={150}
                    gravity={-0.8}
                    confettiSource={{
                        x: 0,
                        y: window.innerHeight,
                        w: window.innerWidth,
                        h: 0
                    }}
                />
            }

            <Header />
            <Status won={gameWon} lost={gameLost} message={getMessage} />
            <section aria-live="polite" role="status" className="languages-container">
                {languagesComp} 
            </section>  

            <section className="word-container">
                {wordElements}
            </section>

            {/* Combined visually-hidden aria-live region for status updates */}
            <section className="sr-only" aria-live="polite" role="status">
                <p>
                    {currentWord.includes(lastGuessedLetter) ?
                        `Good job! The letter "${lastGuessedLetter.toUpperCase()}" is in the word.` :
                        `Sorry, the letter "${lastGuessedLetter.toUpperCase()}" is not in the word.`
                    }
                    You have {numberOfGuessesLeft} guesses left.
                </p>
                <p>Current word: {currentWord.split("").map(letter => guessedLetters.includes(letter) ? letter + "." : "blank").join(" ")}</p>
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
