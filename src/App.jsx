import { useState } from "react"
import { Board } from "./components/Board"
import { Slot } from "./components/Slot"
import { WinnerModal } from "./components/WinnerModal"
import { TURNS } from "./constants"
import { checkWinner, checkEndGame } from "./logic/board"
import { resetGameStorage, saveGameToStorage } from "./logic/storage"
import confetti from "canvas-confetti"

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })

  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    resetGameStorage()
  }

  const updateBoard = (index) => {
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    })

    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reiniciar</button>
      <Board board={board} updateBoard={updateBoard} />

      <section className="turn">
        <Slot isSelected={turn === TURNS.X}>{TURNS.X}</Slot>
        <Slot isSelected={turn === TURNS.O}>{TURNS.O}</Slot>
      </section>

      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  )
}

export default App
