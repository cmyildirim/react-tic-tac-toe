import React from "react";
import Board from "./Board";
import Options from "./Options";
import calculateWinner from "../utilities/calculateWinner";

export default class Game extends React.Component {
  constructor() {
    super();
    const size = 3;
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
        this.resetGame();
        break;
      case "increaseSize":
        this.setState({
          size: this.state.size + 1
        });
        this.resetGame();
        break;
      case "decreaseSize":
        this.setState({
          size: this.state.size - 1
        });
        this.resetGame();
        break;
      default:
    }
  }
  resetGame() {
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
