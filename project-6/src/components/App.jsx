import React from 'react'
import Header from './Header.jsx'
import Status from './Status.jsx'
import LanguagesComp from './LanguagesComp.jsx'
import { languages } from '../../languages.js'

export default function App() {
    const [currentWord, setCurrentWord] = React.useState("react")

    const wordElements = currentWord.split("").map((letter, index) => {
        return (
            <span key={index} className="letter">
                {letter.toUpperCase()}
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

    const keyboardElements = alphabet.split("").map((letter) => {
        return (
            <button className="key" key={letter}> {letter.toUpperCase()} </button>
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
