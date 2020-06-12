const numbers = [
  {
    id: "one",
    value: 1,
  },
  {
    id: "two",
    value: 2,
  },
  {
    id: "three",
    value: 3,
  },
  {
    id: "four",
    value: 4,
  },
  {
    id: "five",
    value: 5,
  },
  {
    id: "six",
    value: 6,
  },
  {
    id: "seven",
    value: 7,
  },
  {
    id: "eight",
    value: 8,
  },
  {
    id: "nine",
    value: 9,
  },
  {
    id: "zero",
    value: 0,
  },
  {
    id: "decimal",
    value: ".",
  },
];

const operators = [
  {
    id: "clear",
    value: "AC",
  },
  {
    id: "add",
    value: "+",
  },
  {
    id: "subtract",
    value: "-",
  },
  {
    id: "multiply",
    value: "*",
  },
  {
    id: "divide",
    value: "/",
  },
  {
    id: "equals",
    value: "=",
  },
];

class Buttons extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      number: 0,
      operator: "",
    };

    this.onNumberClick = this.onNumberClick.bind(this);
    this.onOperatorClick = this.onOperatorClick.bind(this);
  }

  onNumberClick(num) {
    this.setState({
      number: num,
    });
    this.props.getNumber(num);
  }

  onOperatorClick(op) {
    this.setState({
      operator: op,
    });
    this.props.getOperator(op);
  }

  render() {
    const numPad = this.props.numbers.map((item) => (
      <div
        className="btn number"
        id={item.id}
        onClick={() => this.onNumberClick(item.value)}
      >
        {item.value}
      </div>
    ));

    const opPad = this.props.operators.map((item) => (
      <div
        className="btn operator"
        id={item.id}
        onClick={() => this.onOperatorClick(item.value)}
      >
        {item.value}
      </div>
    ));
    return (
      <div id="buttons">
        <div id="numbers">{numPad}</div>
        <div id="operators">{opPad}</div>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      x: "",
      operations: [],
      calculation: "",
      lastKey: "",
      display: "",
      isInput: true,
      isMinus: 1,
    };

    this.getNumber = this.getNumber.bind(this);
    this.getOperator = this.getOperator.bind(this);
    this.calculate = this.calculate.bind(this);
    this.resetState = this.resetState.bind(this);
    this.handleZero = this.handleZero.bind(this);
    this.handleFirstDecimal = this.handleFirstDecimal.bind(this);
    this.handleMultiTrailingDecimal = this.handleMultiTrailingDecimal.bind(
      this
    );
    this.handleSecondDecimal = this.handleSecondDecimal.bind(this);
    this.addOperatorToArray = this.addOperatorToArray.bind(this);
    this.addOperandToArray = this.addOperandToArray.bind(this);
  }

  addOperandToArray(op) {
    this.state.operations.push(parseFloat(this.state.x));
    this.setState({ lastKey: op, isInput: false, x: "", isMinus: 1 });
    this.state.x = "";
    console.log(this.state.x);
  }

  addOperatorToArray(op) {
    if (
      this.state.operations[this.state.operations.length - 1] == "+" ||
      this.state.operations[this.state.operations.length - 1] == "-" ||
      this.state.operations[this.state.operations.length - 1] == "*" ||
      this.state.operations[this.state.operations.length - 1] == "/"
    ) {
      this.state.operations.pop();
    }
    this.state.operations.push(op);
  }

  handleZero(num) {
    if (/^0/.test(this.state.x) && num == 0) {
      this.state.x = "";
    }
  }

  handleFirstDecimal(num) {
    if (/^\./.test(this.state.x) && num == ".") {
      this.state.x = "";
    }
  }

  handleMultiTrailingDecimal(num) {
    if (/\.$/.test(this.state.x) && num == ".") {
      console.log(this.state.x);
      this.state.x = this.state.x.substring(0, this.state.x.length - 1);
    }
  }

  handleSecondDecimal(num) {
    console.log(typeof this.state.x);
    if (this.state.x.includes(".") && num == ".") {
      return "";
    }
    return num;
  }

  resetState() {
    this.setState({
      x: "",
      operations: [],
      calculation: "",
      lastKey: "",
      display: "",
      isInput: true,
      isMinus: 1,
    });
  }

  calculate() {
    let first = this.state.operations.shift();
    let operator = this.state.operations.shift();
    let second = this.state.operations.shift();
    console.log(first, operator, second);

    switch (operator) {
      case "+":
        this.state.operations.unshift(parseFloat(first) + parseFloat(second));
        break;
      case "-":
        this.state.operations.unshift(parseFloat(first) - parseFloat(second));
        break;
      case "*":
        this.state.operations.unshift(parseFloat(first) * parseFloat(second));
        break;
      case "/":
        this.state.operations.unshift(parseFloat(first) / parseFloat(second));
        break;
    }
    this.setState({
      display: this.state.operations[0],
    });
  }

  getNumber(num) {
    this.setState({
      isInput: true,
    });
    this.handleZero(num);
    this.handleFirstDecimal(num);
    this.handleMultiTrailingDecimal(num);
    num = this.handleSecondDecimal(num);
    this.setState({
      x: this.state.x + num,
      lastKey: num,
      display: this.state.x,
    });
  }

  getOperator(op) {
    if (op == "-" && this.state.x == "") {
      console.log("here");
      this.setState({ isMinus: -1 });
      this.state.x = "-";
      console.log(this.state);
    } else if (op == "AC") {
      this.resetState();
    } else {
      if (this.state.x == "-") {
        this.state.x = "";
      }
      if (this.state.x != "") {
        this.addOperandToArray(op);
      }
      if (this.state.lastKey == op) {
        console.log("operator entered consecutively");
      } else if (this.state.operations.length > 0 && op != "=") {
        this.addOperatorToArray(op);
      }
      if (this.state.operations.length >= 3) {
        this.setState({
          isInput: false,
        });
        this.calculate();
      }
      console.log(this.state);
    }
  }

  render() {
    return (
      <div>
        <div id="bank">{this.state.operations[0]}</div>
        <div id="calculation">{this.state.calculation}</div>
        <div id="display">
          {!this.state.isInput
            ? this.state.operations[0]
            : this.state.x == ""
            ? "0"
            : this.state.x}
        </div>
        <Buttons
          operators={operators}
          numbers={numbers}
          getNumber={this.getNumber}
          getOperator={this.getOperator}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
