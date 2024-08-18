import { React, useContext } from 'react'
import './PlayerInfo.css'
import { PlayerContext } from './InfoProvider'

function PlayerInfo(props) {

    const { player1, player2, isBot } = useContext(PlayerContext)

    function victoryLines() {
        let lines = []
        for (let index = 0; index < (props.number === 'one' ? player1.victories : player2.victories); index++) {
            lines.push(<hr key={index} className='playerinfo-victory-lines-line' />)
        }
        return (lines)
    }

    return (
        <>
            <section className="playerinfo">
                <div className={`info-${props.number} playerinfo-container`}>
                    <div className="playerinfo-title-container">
                        <p className="playerinfo-title">{props.number === 'one'
                            ? player1.nameC
                            : (isBot ? 'Bot' : player2.nameC)
                        }</p>
                    </div>
                    <hr className='playerinfo-line' />
                    <p className='playerinfo-description'>Victories: {props.number === 'one'
                        ? player1.victories
                        : (isBot ? 0 : player2.victories)
                    }</p>
                    <div className="playerinfo-victory-linea-container">
                        <ul className='playerinfo-victory-lines'>{victoryLines()}</ul>
                    </div>
                </div>
            </section>
        </>
    )
}

export default PlayerInfo