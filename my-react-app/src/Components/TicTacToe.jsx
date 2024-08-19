import { React, useState, useEffect, useRef, useContext } from 'react'
import './TicTacToe.css'
import { PlayerContext } from './InfoProvider'
import MinimaxBot from '../MinimaxBot'

function TicTacToe(props) {

    const { player1, setPlayer1, player2, setPlayer2 } = useContext(PlayerContext)
    const [board, setBoard] = useState(['', '', '', '', '', '', '', '', ''])
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

        if (board[oldestMove.current[0][0]] === '') {
            oldestMove.current[0].shift()
        }
        if (board[oldestMove.current[1][0]] === '') {
            oldestMove.current[1].shift()
        }
    }, [board])

    function checkVictory(player) {
        return (
            (board[0] === player.symbolC && board[1] === player.symbolC && board[2] === player.symbolC) ||
            (board[3] === player.symbolC && board[4] === player.symbolC && board[5] === player.symbolC) ||
            (board[6] === player.symbolC && board[7] === player.symbolC && board[8] === player.symbolC) ||
            (board[0] === player.symbolC && board[3] === player.symbolC && board[6] === player.symbolC) ||
            (board[1] === player.symbolC && board[4] === player.symbolC && board[7] === player.symbolC) ||
            (board[2] === player.symbolC && board[5] === player.symbolC && board[8] === player.symbolC) ||
            (board[0] === player.symbolC && board[4] === player.symbolC && board[8] === player.symbolC) ||
            (board[6] === player.symbolC && board[4] === player.symbolC && board[2] === player.symbolC)
        )
    }

    function handleCellClick(number, condition) {
        if (condition === '') {
            if (turn.current) {
                limitMovement.current[0]++
                oldestMove.current[0].push(number)
                setBoard(prevState => {
                    const newBoard = [...prevState]
                    newBoard[number] = player1.symbolC
                    return newBoard
                })
            } else {
                if (props.bot) {

                    let botMove = MinimaxBot(board, player2.symbolC, player1.symbolC)

                    limitMovement.current[1]++
                    oldestMove.current[1].push(botMove)
                    setBoard(prevState => {
                        const newBoard = [...prevState]
                        newBoard[botMove] = player2.symbolC
                        return newBoard
                    })
                } else {
                    limitMovement.current[1]++
                    oldestMove.current[1].push(number)
                    setBoard(prevState => {
                        const newBoard = [...prevState]
                        newBoard[number] = player2.symbolC
                        return newBoard
                    })
                }
            }
            turn.current = !turn.current
        }
    }

    function eraseOld() {
        if (limitMovement.current[0] == 4) {
            setBoard(prevState => {
                const newBoard = [...prevState]
                newBoard[oldestMove.current[0][0]] = ''
                return newBoard
            })
            limitMovement.current[0] = 3
        } else if (limitMovement.current[1] == 4) {
            setBoard(prevState => {
                const newBoard = [...prevState]
                newBoard[oldestMove.current[1][0]] = ''
                return newBoard
            })
            limitMovement.current[1] = 3
        }
    }

    function prepareOld() {
        if (limitMovement.current[1] == 3) {
            if (turn.current) {
            } else {
                setBoard(prevState => {
                    const newBoard = [...prevState]
                    newBoard[oldestMove.current[1][0]] = <small style={{ color: '#555555', textShadow: '0px 0px 5px #444444' }}>{player2.symbolC}</small>
                    return newBoard
                })
            }
        }
        if (limitMovement.current[0] == 3) {
            if (turn.current) {
                setBoard(prevState => {
                    const newBoard = [...prevState]
                    newBoard[oldestMove.current[0][0]] = <small style={{ color: '#555555', textShadow: '0px 0px 5px #444444' }}>{player1.symbolC}</small>
                    return newBoard
                })
            }
        }
    }



    return (
        <>
            <section className="tictactoe">
                <div className="tictactoe-container">
                    {start.map((value, index) => (
                        < div key={index} className='cell' onClick={() => { handleCellClick(value, board[value]); prepareOld(); eraseOld() }}>{board[value]}</div>
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