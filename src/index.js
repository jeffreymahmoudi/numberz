import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import _ from "lodash";

const randomNumberBetween = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

class Number extends React.Component {
  render() {
    return (
      <div
        className="number"
        style={{ opacity: this.props.clickable ? 1 : 0.3 }}
        onClick={() => console.log(this.props.id)}
      >
        {this.props.value}
      </div>
    );
  }
}

class Game extends React.Component {
  // state = {
  //   gameStatus: "new", //new, playing, won, lost
  //   remainingSeconds: this.props.initialSeconds,
  //   selectedIds: []
  // };

  state = {
    gameStatus: "playing",
    remainingSeconds: 7,
    selectedIds: [0, 3, 4]
  };

  challengeNumbers = Array.from({ length: this.props.challengeSize }).map(() =>
    randomNumberBetween(...this.props.challengeRange)
  );

  target = _.sampleSize(
    this.challengeNumbers,
    this.props.challengeSize - 2
  ).reduce((acc, curr) => acc + curr, 0);

  isNumberAvailable = numberIndex =>
    this.state.selectedIds.indexOf(numberIndex) === -1;

  startGame = () => {
    this.setState({ gameStatus: "playing" }, () => {
      this.intervalId = setInterval(() => {
        this.setState(prevState => {
          const newRemainingSeconds = prevState.remainingSeconds - 1;
          if (newRemainingSeconds === 0) {
            clearInterval(this.intervalId);
            return { gameStatus: "lost", remainingSeconds: 0 };
          }
          return { remainingSeconds: newRemainingSeconds };
        });
      }, 1000);
    });
  };

  selectNumber = numberIndex => {
    if (this.state.gameStatus !== "playing") {
      return;
    }
    this.setState(
      prevState => ({
        selectedIds: [...prevState.selectedIds, numberIndex],
        gameStatus: this.calcGameStatus([...prevState.selectedIds, numberIndex])
      }),
      () => {
        if (this.state.gameStatus !== "playing") {
          clearInterval(this.intervalId);
        }
      }
    );
  };

  calcGameStatus = selectedIds => {
    const sumSelected = selectedIds.reduce(
      (acc, curr) => acc + this.challengeNumbers[curr],
      0
    );
    if (sumSelected < this.target) {
      return "playing";
    }
    return sumSelected === this.target ? "won" : "lost";
  };

  render() {
    return (
      <div className="game">
        <h1 className="title">Numberz</h1>
        <div className="help">
          Pick {this.props.challengeSize - 2} numbers that sum to the target in{" "}
          {this.props.initialSeconds} seconds
        </div>
        <div
          className="target"
          style={{ backgroundColor: Game.bgColors[this.state.gameStatus] }}
        >
          {this.state.gameStatus === "new" ? "?" : this.target}
        </div>
        <div className="challenge-numbers">
          {this.challengeNumbers.map((value, index) => (
            <Number
              key={index}
              id={index}
              value={this.state.gameStatus === "new" ? "?" : value}
              clickable={this.isNumberAvailable(index)}
            />
          ))}
        </div>
        <div className="footer">
          {this.state.gameStatus === "new" ? (
            <button>Start</button>
          ) : (
            <div className="timer-value">{this.state.remainingSeconds}</div>
          )}
          {["won", "lost"].includes(this.state.gameStatus) && (
            <button>Play Again</button>
          )}
        </div>
      </div>
    );
  }

  static bgColors = {
    playing: "#ccc",
    won: "green",
    lost: "red"
  };
}

ReactDOM.render(
  <Game challengeSize={6} challengeRange={[2, 9]} initialSeconds={10} />,
  document.getElementById("root")
);
registerServiceWorker();
