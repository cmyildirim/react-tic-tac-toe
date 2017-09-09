import React from "react";
import Square from "./Square";
export default class Board extends React.Component {
  renderSquare(i,key) {
    return (
      <Square
          key={key}
          value={this.props.squares[i]}
          onClick={() => this.props.onClick(i)}
          style={
          this.props.winner && this.props.winner.winnerSquares.includes(i) ? 
            { backgroundColor: "GREENYELLOW" }
           : null
        }
      />
    );
  }

  render() {
    let board = [],
      row = [];
    let size = this.props.size;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        row.push(this.renderSquare(j + i * size, j));
      }
      board.push(
        <div key={i} className="board-row">
          {row}
        </div>
      );
      row = [];
    }
    return <div>{board}</div>;
  }
}
