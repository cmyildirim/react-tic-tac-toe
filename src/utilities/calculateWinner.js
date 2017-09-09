export default function calculateWinner(squares, size) {
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
    //other diagonal 
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
  