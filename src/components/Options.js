import React from "react";
export default class Options extends React.Component {
  // renderSquare(i) {
  //   return (
  //     <Square
  //         value={this.props.squares[i]}
  //         onClick={() => this.props.onClick(i)}
  //     />
  //   );
  // }

  render() {
    return (
      <div className="buttons">
          <button className="resetGame" onClick={() => this.props.onClick("resetGame")}>
            Sıfırla
          </button>
          <button className="toggle" onClick={() => this.props.onClick("toggle")}>
            Sıralamayı Değiştir
          </button>
      </div>
    );
  }
}
