import React from "react";
import Board from "./Board";
import Options from "./Options";

export default class Game extends React.Component {
  constructor() {
    super();
    const size = 4;
    this.state = {
      history: [
        {
          squares: Array(size * size).fill(null),
          coordinates: Array(2).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      size: size,
      isDesc: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares, this.state.size) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
          coordinates: [
            Math.ceil((i + 1) / this.state.size),
            i % this.state.size + 1
          ]
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  handleOptions(option) {
    switch (option) {
      case "toggle":
        this.setState({
          isDesc: !this.state.isDesc
        });
        break;
      case "resetGame":
        this.setState({
          history: [
            {
              squares: Array(this.state.size * this.state.size).fill(null),
              coordinates: Array(2).fill(null)
            }
          ],
          stepNumber: 0,
          xIsNext: true
        });
        break;
      default:
    }
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares, this.state.size);
    const moves = history.map((step, move) => {
      let isCurrentMove = move === this.state.stepNumber;
      const desc = move
        ? "Hamle #" +
          move.toString() +
          " " +
          (move % 2 === 0 ? "O" : "X") +
          ">" +
          step.coordinates[0] +
          "," +
          step.coordinates[1]
        : "Oyun Başlangıcı";
      return (
        <li key={move}>
          {
            <button onClick={() => this.jumpTo(move)}>
              {(() => {
                return isCurrentMove ? <strong> {desc} </strong> : desc;
              })()}
            </button>
          }
        </li>
      );
    });
    if (!this.state.isDesc) moves.reverse();
    let status;
    if (winner) {
      status = "Kazanan: " + winner.winner;
    } else {
      status = "Hamle sırası: " + (this.state.xIsNext ? "X" : "O");
    }
    return (
      <div className="game">
        <div className="options">
          <Options onClick={option => this.handleOptions(option)} />
        </div>
        <div className="game-board">
          <Board
              squares={current.squares}
              winner={winner}
              onClick={i => this.handleClick(i)}
              size={this.state.size}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares, size) {
  if (!size) throw new Error("Size parameter is required");
  let winnerSquares = Array(size).fill(null);
  //first checking horizontal lines
  for (let i = 0; i < size * size; i = i + size) {
    if (squares[i]) {
      let curVal = squares[i];
      let weHaveAWinner = true;
      winnerSquares.push(i);
      for (let j = i + 1; j < i + size; j++) {
        winnerSquares.push(j);
        if (squares[j] !== curVal) {
          weHaveAWinner = false;
          winnerSquares = [];
          break;
        }
      }
      if (weHaveAWinner)
        return { winner: curVal, winnerSquares: winnerSquares };
    }
  }
  //now checking verticals
  for (let i = 0; i < size; i++) {
    if (squares[i]) {
      let curVal = squares[i];
      let weHaveAWinner = true;
      winnerSquares.push(i);
      for (let j = i + size; j < size * size; j = j + size) {
        winnerSquares.push(j);
        if (squares[j] !== curVal) {
          weHaveAWinner = false;
          winnerSquares = [];
          break;
        }
      }
      if (weHaveAWinner)
        return { winner: curVal, winnerSquares: winnerSquares };
    }
  }
  //now checking diagonals
  if (squares[0]) {
    let curVal = squares[0];
    let weHaveAWinner = true;
    winnerSquares.push(0);
    for (let i = size + 1; i < size * size; i = i + size + 1) {
      winnerSquares.push(i);
      if (squares[i] !== curVal) {
        weHaveAWinner = false;
        winnerSquares = [];
        break;
      }
    }
    if (weHaveAWinner) return { winner: curVal, winnerSquares: winnerSquares };
  }

  if (squares[size - 1]) {
    let curVal = squares[size - 1];
    let weHaveAWinner = true;
    winnerSquares.push(size - 1);
    for (let i = 2 * size - 2; i < size * size - 1; i = i + size - 1) {
      winnerSquares.push(i);
      if (squares[i] !== curVal) {
        weHaveAWinner = false;
        winnerSquares = [];
        break;
      }
    }
    if (weHaveAWinner) return { winner: curVal, winnerSquares: winnerSquares };
  }
  return null;
}
