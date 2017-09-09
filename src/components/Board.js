import React from 'react';
import Square from './Square';
export default class Board extends React.Component {
    renderSquare(i) {
      return (
        <Square
            value={this.props.squares[i]} 
            onClick={() => this.props.onClick(i)}
        />
      );
    }

    render() {
      let board = [], row = [];
      let size = this.props.size;
      for(let i=0; i<size; i++) {
        for(let j=0; j<size; j++){
          row.push(this.renderSquare(j + i*size));
        }
        board.push(<div key={i} className="board-row">{row}</div>);
        row = [];
      }
      return <div>{board}</div>;
    }
  }