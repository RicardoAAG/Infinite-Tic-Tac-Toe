function MinimaxBot(board, bot, player) {


    function minimax(boardState, depth, isMaximize) {

        if (isTerminal(boardState, bot, 'victory')) {
            return (10)
        } else if (isTerminal(boardState, player, 'victory')) {
            return (-10)
        } else if (isTerminal(boardState, '', 'tie')) {
            return (0)
        }

        if (isMaximize) {
            let possibleHighestValue = -Infinity
            for (let currentSpaceCheck = 0; currentSpaceCheck < boardState.length; currentSpaceCheck++) {
                if (boardState[currentSpaceCheck] == '') {
                    boardState[currentSpaceCheck] = bot
                    let nextMoveValue = minimax(boardState, depth + 1, false)
                    boardState[currentSpaceCheck] = ''
                    possibleHighestValue < nextMoveValue ? possibleHighestValue = nextMoveValue : null
                }
            }
            return (possibleHighestValue)
        } else {
            let possibleLowestValue = Infinity
            for (let currentSpaceCheck = 0; currentSpaceCheck < boardState.length; currentSpaceCheck++) {
                if (boardState[currentSpaceCheck] == '') {
                    boardState[currentSpaceCheck] = player
                    let nextMoveValue = minimax(boardState, depth + 1, true)
                    boardState[currentSpaceCheck] = ''
                    possibleLowestValue > nextMoveValue ? possibleLowestValue = nextMoveValue : null
                }
            }
            return (possibleLowestValue)
        }
    }

    function bestMove() {
        let highestMoveValue = -Infinity
        let move = null
        let boardState = [...board]

        if (checkFirstMove(boardState)) {
            let random = Math.floor(Math.random() * 10)

            while (boardState[random] != '') {
                random = Math.floor(Math.random() * 10)
            }

            return (random)
        }

        for (let currentSpaceCheck = 0; currentSpaceCheck < board.length; currentSpaceCheck++) {
            if (board[currentSpaceCheck] == '') {
                boardState[currentSpaceCheck] = bot
                let moveValue = minimax(boardState, 0, false)
                boardState[currentSpaceCheck] = ''

                if (moveValue > highestMoveValue) {
                    highestMoveValue = moveValue
                    move = currentSpaceCheck
                }
            }
        }

        return (move)
    }

    function isTerminal(boardState, check, condition) {
        if (condition == 'victory') {
            if ((boardState[0] === check && boardState[1] === check && boardState[2] === check) ||
                (boardState[3] === check && boardState[4] === check && boardState[5] === check) ||
                (boardState[6] === check && boardState[7] === check && boardState[8] === check) ||
                (boardState[0] === check && boardState[3] === check && boardState[6] === check) ||
                (boardState[1] === check && boardState[4] === check && boardState[7] === check) ||
                (boardState[2] === check && boardState[5] === check && boardState[8] === check) ||
                (boardState[0] === check && boardState[4] === check && boardState[8] === check) ||
                (boardState[6] === check && boardState[4] === check && boardState[2] === check)) {
                return (true)
            }
        } else if (condition == 'tie') {
            if ((boardState[0] != check &&
                boardState[1] != check &&
                boardState[2] != check &&
                boardState[3] != check &&
                boardState[4] != check &&
                boardState[5] != check &&
                boardState[6] != check &&
                boardState[7] != check &&
                boardState[8] != check)) {
                return (true)
            }
        }
    }

    function checkFirstMove(boardState) {
        let moveAmount = 0

        for (let i = 0; i < boardState.length; i++) {
            if (boardState[i] != '') {
                moveAmount = moveAmount + 1
            }
        }
        if (moveAmount <= 2) {
            return (true)
        } else {
            return (false)
        }
    }

    return (bestMove())
}

export default MinimaxBot
