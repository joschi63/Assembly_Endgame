import React from 'react'
import Header from './Header.jsx'
import Status from './Status.jsx'
import LanguagesComp from './LanguagesComp.jsx'
import { languages } from '../../languages.js'

export default function App() {
    const [currentWord, setCurrentWord] = React.useState("react")

    const [guessedLetters, setGuessedLetters] = React.useState([])

    const wordElements = currentWord.split("").map((letter, index) => {
        return (
            <span key={index} className="letter">
                {guessedLetters.includes(letter) ? letter.toUpperCase() : " "}
            </span>
        )
    })

    const languagesComp = languages.map((language) => {
        return <LanguagesComp 
            key={language.name} 
            backgroundColor={language.backgroundColor} 
            color={language.color} 
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
                onClick={() => setLetter(letter)}> {letter.toUpperCase()} 
            </button>
        )
    })

    return (
        <main>
            <Header />
            <Status />
            <section className="languages-container">
                {languagesComp}
            </section>
            <section className="word-container">
                {wordElements}
            </section>
            <section className="keyboard-container">
                {keyboardElements}
            </section>

            <button className="new-game-button">New Game</button>

        </main>
    )
}
