import React from "react";
export default class Options extends React.Component {
  render() {
    return (
      <div className="buttons">
        <div className="buttonRow">
          <button
            className="btnResetGame"
            onClick={() => this.props.onClick("resetGame")}
          >
            Sıfırla
          </button>
          <button
            className="btnToggle"
            onClick={() => this.props.onClick("toggle")}
          >
            Sıralamayı Değiştir
          </button>
        </div>
        <div className="buttonRow">
          <button
            className="btnIncreaseSize"
            onClick={() => this.props.onClick("increaseSize")}
          >
            Boyutu Arttır
          </button>
          <button
            className="btnDecreaseSize"
            onClick={() => this.props.onClick("decreaseSize")}
          >
            Boyutu Azalt
          </button>
        </div>
      </div>
    );
  }
}
