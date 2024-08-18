import { React, useState, useContext, useEffect } from 'react'
import './PlayerConfig.css'
import { PlayerContext } from './InfoProvider'

function PlayerConfig(props) {

    const { player1, setPlayer1, player2, setPlayer2 } = useContext(PlayerContext)
    const [name, setName] = useState(props.player)
    const [symbol, setSymbol] = useState(props.symbol)

    useEffect(() => {
        if (props.number === 'two') {
            setPlayer2({ nameC: name, symbolC: symbol, victories: 0 })
        } else {
            setPlayer1({ nameC: name, symbolC: symbol, victories: 0 })
        }
    }, [name, symbol, setPlayer1, setPlayer2, props.number])

    function handleNameChange(event) {
        setName(event.target.value)
    }

    function handleSymbolChange(event) {
        setSymbol(event.target.value)
    }

    return (
        <>
            <section className="playerconfig">
                <div className={`${props.number} playerconfig-container`}>
                    <div className="playerconfig-title-container">
                        <p className="playerconfig-title">{name} / {symbol}</p>
                    </div>
                    <hr className='playerconfig-line' />
                    <ul className="playerconfig-options">
                        <li className="playerconfig-options-item">
                            <p className="playerconfig-type">Name:</p>
                            <input className='playerconfig-input' type="text" value={name} onChange={handleNameChange} maxLength={15} />
                        </li>
                        <li className="playerconfig-options-item">
                            <p className="playerconfig-type">Token:</p>
                            <input className='playerconfig-input' type="text" value={symbol} onChange={handleSymbolChange} maxLength={1} />
                        </li>
                    </ul>
                </div>
            </section>
        </>
    )
}

export default PlayerConfig