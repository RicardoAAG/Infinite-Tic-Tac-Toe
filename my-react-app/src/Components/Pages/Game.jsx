import { React, useEffect, useContext, useRef, useState } from 'react'
import PlayerInfo from '../PlayerInfo'
import './Game.css'
import TicTacToe from '../TicTacToe'
import { PlayerContext } from '../InfoProvider'

function Game() {
    const { player1, setPlayer1, player2, setPlayer2, isBot } = useContext(PlayerContext)
    const [seed, setSeed] = useState(1)
    const resetRef = useRef(null)
    const ticTacToeContainerRef = useRef(null)

    useEffect(() => {
        if (player1.victories !== 0 || player2.victories !== 0) {
            resetRef.current.style.display = "flex";
            if (ticTacToeContainerRef.current) {
                ticTacToeContainerRef.current.style.pointerEvents = "none"
                ticTacToeContainerRef.current.style.opacity = "0.5"
            }
        }
    }, [player1.victories, player2.victories]);

    function resetGame() {
        resetRef.current.style.display = "none";
        if (ticTacToeContainerRef.current) {
            ticTacToeContainerRef.current.style.pointerEvents = "auto"
            ticTacToeContainerRef.current.style.opacity = "1"
        }
        setSeed(Math.random());
    }

    return (
        <>
            <div className="game-page">
                <section className="game-player-one">
                    <PlayerInfo number='one' />
                </section>
                <section className="tic-tac-toe">
                    <button className="reset-button" onClick={resetGame} ref={resetRef} style={{ display: 'none' }}>Play Again</button>
                    <div className="tic-tac-toe-container" ref={ticTacToeContainerRef}>
                        <TicTacToe key={seed} bot={isBot} />
                    </div>
                </section>
                <section className="game-player-two">
                    <PlayerInfo number='two' />
                </section>
            </div>
        </>
    );
}


export default Game