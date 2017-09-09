import React from "react";
export default function Square(props) {
  return (
    <button className="square" onClick={props.onClick} style={props.style}>
      {props.value}
    </button>
  );
}

//This below is same with upper functional component
// class Square extends React.Component {
//   render() {
//     return (
//       <button className="square" onClick={() => this.props.onClick()}>
//         {this.props.value}
//       </button>
//     );
//   }
// }
