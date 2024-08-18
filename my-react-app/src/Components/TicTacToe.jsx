import { React, useState, useEffect, useRef, useContext } from 'react'
import './TicTacToe.css'
import { PlayerContext } from './InfoProvider'

function TicTacToe(props) {

    const { player1, setPlayer1, player2, setPlayer2 } = useContext(PlayerContext)
    const [test, setTest] = useState(['', '', '', '', '', '', '', '', ''])
    const start = [0, 1, 2, 3, 4, 5, 6, 7, 8]
    const oldestMove = useRef([[], []])
    const playerState = useRef('`s turn')
    const turn = useRef(player1.victories === player2.victories ?
        true : player1.victories < player2.victories ? true : false)
    const limitMovement = useRef([0, 0])


    useEffect(() => {
        if (checkVictory(player1)) {
            console.log(`${player1.nameC} Ganador`)
            const victory = player1.victories + 1
            turn.current = !turn.current
            playerState.current = ' WINNER'
            setPlayer1(prevState => ({ ...prevState, victories: victory }))
        } else if (checkVictory(player2)) {
            console.log(`${player2.nameC} Ganador`)
            const victory = player2.victories + 1
            turn.current = !turn.current
            playerState.current = ' WINNER'
            setPlayer2(prevState => ({ ...prevState, victories: victory }))
        }

        if (test[oldestMove.current[0][0]] === '') {
            oldestMove.current[0].shift()
        }
        if (test[oldestMove.current[1][0]] === '') {
            oldestMove.current[1].shift()
        }
    }, [test])

    function checkVictory(player) {
        return (
            (test[0] === player.symbolC && test[1] === player.symbolC && test[2] === player.symbolC) ||
            (test[3] === player.symbolC && test[4] === player.symbolC && test[5] === player.symbolC) ||
            (test[6] === player.symbolC && test[7] === player.symbolC && test[8] === player.symbolC) ||
            (test[0] === player.symbolC && test[3] === player.symbolC && test[6] === player.symbolC) ||
            (test[1] === player.symbolC && test[4] === player.symbolC && test[7] === player.symbolC) ||
            (test[2] === player.symbolC && test[5] === player.symbolC && test[8] === player.symbolC) ||
            (test[0] === player.symbolC && test[4] === player.symbolC && test[8] === player.symbolC) ||
            (test[6] === player.symbolC && test[4] === player.symbolC && test[2] === player.symbolC)
        )
    }

    function handleCellClick(number, condition) {
        if (condition === '') {
            if (turn.current) {
                limitMovement.current[0]++
                oldestMove.current[0].push(number)
                setTest(prevState => ({ ...prevState, [number]: player1.symbolC }))
            } else {
                if (props.bot) {
                    let random = Math.floor(Math.random() * 10)
                    while (test[random] != '') {
                        random = Math.floor(Math.random() * 10)
                    }
                    limitMovement.current[1]++
                    oldestMove.current[1].push(random)
                    setTest(prevState => ({ ...prevState, [random]: player2.symbolC }))
                } else {
                    limitMovement.current[1]++
                    oldestMove.current[1].push(number)
                    setTest(prevState => ({ ...prevState, [number]: player2.symbolC }))
                }
            }
            turn.current = !turn.current
        }
    }

    function eraseOld() {
        if (limitMovement.current[0] == 4) {
            setTest(prevState => ({ ...prevState, [oldestMove.current[0][0]]: '' }))
            limitMovement.current[0] = 3
        } else if (limitMovement.current[1] == 4) {
            setTest(prevState => ({ ...prevState, [oldestMove.current[1][0]]: '' }))
            limitMovement.current[1] = 3
        }
    }

    function prepareOld() {
        if (limitMovement.current[1] == 3) {
            if (turn.current) {
            } else {
                setTest(prevState => ({ ...prevState, [oldestMove.current[1][0]]: <small style={{ color: '#555555', textShadow: '0px 0px 5px #444444' }}>{player2.symbolC}</small> }))
            }
        }
        if (limitMovement.current[0] == 3) {
            if (turn.current) {
                setTest(prevState => ({ ...prevState, [oldestMove.current[0][0]]: <small style={{ color: '#555555', textShadow: '0px 0px 5px #444444' }}>{player1.symbolC}</small> }))
            }
        }
    }



    return (
        <>
            <section className="tictactoe">
                <div className="tictactoe-container">
                    {start.map((value, index) => (
                        < div key={index} className='cell' onClick={() => { handleCellClick(value, test[value]); prepareOld(); eraseOld() }}>{test[value]}</div>
                    ))}
                </div>
                <div className="turn-container">
                    <p className="turn">{turn.current
                        ? player1.nameC
                        : (props.bot ? 'Bot' : player2.nameC)
                    }{playerState.current}</p>
                    <p className="turn click" onClick={() => { handleCellClick(null, ""); prepareOld(); eraseOld() }}>{turn.current
                        ? null
                        : (props.bot ? 'CLICK ME' : null)
                    }</p>
                </div>
            </section >
        </>
    )
}

export default TicTacToe