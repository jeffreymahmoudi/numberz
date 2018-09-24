import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <h1 className="title">Numberz</h1>
        <div className="help">
          Pick 4 numbers that sum to the target in 15 seconds
        </div>
        <div className="target">42</div>
        <div className="challenge-numbers">
          <div className="number">8</div>
          <div className="number">5</div>
          <div className="number">12</div>
          <div className="number">13</div>
          <div className="number">5</div>
          <div className="number">16</div>
        </div>
        <div className="footer">
          <div className="timer-value">15</div>
          <button>Start</button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Game />, document.getElementById("root"));
registerServiceWorker();