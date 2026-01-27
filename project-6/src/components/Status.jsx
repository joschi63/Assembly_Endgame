export default function Status({won, lost, message}) {
    const style = {
        backgroundColor: won ? 
            "#10A95B" : 
            lost ? 
                "#BA2A2A" : 
                !message() ? 
                    "" :
                    "#7A5EA7",
    }

    function createElement(h2Text, pText) {
        return ( 
            <>
                <h2>{h2Text}</h2>
                <p>{pText}</p>
            </>
        )
    }

    let element = null
    if (won) {
        element = createElement("You Win!", "Well done!🎉")
    } else if (lost) {
        element = createElement("Game Over!", "You lose! Better start learning Assembly!😭")
    } else {
        element = <h2>{message()}</h2>
    }
    
    return (
        <div className={`status-div`} style={style}>
            {element}
        </div>
    )
}