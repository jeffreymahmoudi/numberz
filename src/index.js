import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";

class Number extends React.Component {
  render() {
    return <div className="number">{this.props.value}</div>;
  }
}

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
          <Number value={8} />
          <Number value={5} />
          <Number value={12} />
          <Number value={13} />
          <Number value={5} />
          <Number value={16} />
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
