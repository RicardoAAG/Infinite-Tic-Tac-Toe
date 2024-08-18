import { React, createContext, useState } from 'react'

export const PlayerContext = createContext()

function InfoProvider({ children }) {

    const [player1, setPlayer1] = useState({ nameC: 'Player 1', symbolC: 'X', victories: 0 })
    const [player2, setPlayer2] = useState({ nameC: 'Player 2', symbolC: 'O', victories: 0 })
    const [isBot, setIsBot] = useState(false);

    return (
        <PlayerContext.Provider value={{ player1, setPlayer1, player2, setPlayer2, isBot, setIsBot }}>
            {children}
        </PlayerContext.Provider>
    )
}

export default InfoProvider