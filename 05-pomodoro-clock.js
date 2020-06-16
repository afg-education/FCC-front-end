class Setting extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      length: props.length,
      name: props.name,
    };

    this.decrement = this.decrement.bind(this);
    this.increment = this.increment.bind(this);
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.length !== prevProps.length) {
      this.setState({
        length: this.props.length,
      });
    }
  }

  decrement() {
    this.props.onChange(this.state.length - 1);
  }

  increment() {
    this.props.onChange(this.state.length + 1);
  }

  render() {
    return (
      <div>
        <div id={this.state.name.toLowerCase() + "-label"}>
          {this.state.name} Length
        </div>
        <div id={this.state.name.toLowerCase() + "-buttons"}>
          <div
            id={this.state.name.toLowerCase() + "-decrement"}
            onClick={this.decrement}
          >
            -
          </div>
          <div id={this.state.name.toLowerCase() + "-length"}>
            {this.state.length}
          </div>
          <div
            id={this.state.name.toLowerCase() + "-increment"}
            onClick={this.increment}
          >
            +
          </div>
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      break: 5,
      session: 25,
      minutes: 25,
      seconds: 0,
      isPlay: true,
      isSession: true,
    };

    this.playPause = this.playPause.bind(this);
    this.reset = this.reset.bind(this);
    this.handleBreak = this.handleBreak.bind(this);
    this.handleSession = this.handleSession.bind(this);
  }

  handleBreak(num) {
    if (num > 0 && num <= 60 && (this.state.isSession || this.state.isPlay)) {
      this.setState({
        break: num,
        minutes: this.state.isSession ? this.state.session : num,
      });
    }
  }

  handleSession(num) {
    if (num > 0 && num <= 60 && (!this.state.isSession || this.state.isPlay)) {
      this.setState({
        session: num,
        minutes: this.state.isSession ? num : this.state.break,
      });
    }
  }

  reset() {
    clearInterval(this.myInterval);
    this.setState({
      break: 5,
      session: 25,
      minutes: 25,
      seconds: 0,
      isPlay: true,
      isSession: true,
    });
    this.audioBeep.pause();
    this.audioBeep.currentTime = 0;
  }

  playPause() {
    if (this.state.isPlay) {
      this.setState({
        isPlay: false,
      });

      this.myInterval = setInterval(() => {
        if (this.state.seconds >= 0) {
          this.setState({
            seconds: this.state.seconds - 1,
          });
        }

        if (this.state.seconds === -1) {
          if (this.state.minutes === 0) {
            this.state.isSession = !this.state.isSession;
            this.audioBeep.play();
            this.setState({
              minutes: this.state.isSession
                ? this.state.session
                : this.state.break,
              seconds: 0,
            });
          } else {
            this.setState({
              minutes: this.state.minutes - 1,
              seconds: 59,
            });
          }
        }
      }, 1000);
    } else {
      this.setState({
        isPlay: true,
      });

      clearInterval(this.myInterval);
    }
  }

  render() {
    return (
      <div>
        <div id="title">
          <div>{this.state.session}</div>
          <h1>Whose Pomodoro Clock is This?</h1>
        </div>
        <div id="settings">
          <Setting
            name="Break"
            length={this.state.break}
            onChange={this.handleBreak}
          />
          <Setting
            name="Session"
            length={this.state.session}
            onChange={this.handleSession}
          />
        </div>
        <div id="clock">
          <div id="timer-label">
            Now in {this.state.isSession ? "Session" : "Break"}
          </div>
          <div id="time-left">
            {this.state.minutes < 10
              ? "0" + this.state.minutes
              : this.state.minutes}
            :
            {this.state.seconds < 10
              ? "0" + this.state.seconds
              : this.state.seconds}
          </div>
        </div>
        <div id="controls">
          <div id="start_stop" onClick={this.playPause}>
            play-pause
          </div>
          <div id="reset" onClick={this.reset}>
            reset
          </div>
        </div>
        <audio
          id="beep"
          preload="auto"
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
          ref={(audio) => {
            this.audioBeep = audio;
          }}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
