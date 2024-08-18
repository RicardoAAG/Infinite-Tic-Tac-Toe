import { React, useContext, useEffect, useRef } from 'react'
import PlayerConfig from '../PlayerConfig'
import './Home.css'
import { PlayerContext } from '../InfoProvider'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'


function Home() {

    const { player1, player2, setIsBot, isBot } = useContext(PlayerContext)

    function handleGameMode() {
        setIsBot(i => !i)
    }

    return (
        <div className='home-page'>
            <section className='home-input-container'
                initial={{}}
                animate={{}}>
                <PlayerConfig number={isBot ? "one-change" : "one"} player={player1.nameC} symbol={player1.symbolC} />
                {isBot ?
                    null :
                    <PlayerConfig number='two' player={player2.nameC} symbol={player2.symbolC} />
                }
            </section>
            <section className="home-button-container">
                <Link to='/game' className="home-button button" >PLAY</Link>
                <button className="home-button button" onClick={() => handleGameMode()}>{isBot ? "Change to 1 v 1" : "Change to 1 v Bot"}</button>
            </section>
        </div>
    )
}

export default Home