const keys = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  },
];

class DrumMachine extends React.Component {
  constructor(props) {
    super(props);

    this.playSound = this.playSound.bind(this);
    this.changeDisplay = this.changeDisplay.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }
  handleKeyPress(e) {
    const keyResult = this.props.keys.filter(
      (item) => item.keyCode == e.keyCode
    );
    this.playSound(keyResult[0].keyTrigger, keyResult[0].id);
  }

  changeDisplay(text) {
    document.getElementById("display").innerHTML = text;
  }

  playSound(keyTrigger, displayText) {
    const clip = document.getElementById(keyTrigger);
    clip.play();
    this.changeDisplay(displayText);
  }

  render() {
    const renderedKeys = this.props.keys.map((item) => (
      <div
        onClick={() => this.playSound(item.keyTrigger, item.id)}
        className="drum-pad"
        id={item.keyCode}
      >
        {item.keyTrigger}
        <audio className="clip" src={item.url} id={item.keyTrigger}></audio>
      </div>
    ));
    return <div id="drum-elements">{renderedKeys}</div>;
  }
}

ReactDOM.render(
  <DrumMachine keys={keys} />,
  document.getElementById("drum-deck")
);
