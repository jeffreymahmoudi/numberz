import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import _ from "lodash";

const randomNumberBetween = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

class Number extends React.Component {
  render() {
    return <div className="number">{this.props.value}</div>;
  }
}

class Game extends React.Component {
  state = {
    gameStatus: 'new', //new, playing, won, lost
    remainingSeconds: this.props.initialSeconds,
    selectedIds: [],
  }

  challengeNumbers = Array.from({ length: this.props.challengeSize }).map(() =>
    randomNumberBetween(...this.props.challengeRange)
  );

  target = _.sampleSize(
    this.challengeNumbers,
    this.props.challengeSize - 2
  ).reduce((acc, curr) => acc + curr, 0);

  render() {
    return (
      <div className="game">
        <h1 className="title">Numberz</h1>
        <div className="help">
          Pick {this.props.challengeSize - 2} numbers that sum to the target in {this.props.initialSeconds} seconds
        </div>
        <div className="target">{this.target}</div>
        <div className="challenge-numbers">
          {this.challengeNumbers.map((value, index) => (
            <Number key={index} value={value} />
          ))}
        </div>
        <div className="footer">
          <div className="timer-value">{this.props.initialSeconds}</div>
          <button>Start</button>
        </div>
      </div>
    );
  }

  static bgColors = {
    playing: '#ccc',
    won: 'green',
    lost: 'red',
  };
}

ReactDOM.render(
  <Game challengeSize={6} challengeRange={[2, 9]} initialSeconds={10} />,
  document.getElementById("root")
);
registerServiceWorker();
