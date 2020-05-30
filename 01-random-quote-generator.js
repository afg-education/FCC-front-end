let quotes = [];

const apicall = axios
  .get(
    "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
  )
  .then((res) => {
    quotes = [...res.data["quotes"]];
    ReactDOM.render(
      <App quotes={quotes} />,
      document.getElementById("quote-box")
    );
  });

class QuoteBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      random: 1,
    };

    this.changeQuote = this.changeQuote.bind(this);
  }

  changeQuote() {
    this.setState({
      random: Math.floor(Math.random() * this.props.quotes.length),
    });
  }

  render() {
    return (
      <div className="quote-box">
        <div id="text">{this.props.quotes[this.state.random].quote}</div>
        <div id="author">{this.props.quotes[this.state.random].author}</div>
        <div id="buttons">
          <div id="socials-buttons">
            <a href="twitter.com/intent/tweet" id="tweet-quote">
              Tweet
            </a>
          </div>
          <div id="quote-button">
            <a href="#" onClick={this.changeQuote} id="new-quote">
              New Quote
            </a>
          </div>
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.quotes.length > 0) {
      return <QuoteBox quotes={this.props.quotes} />;
    } else {
      return <div>Waiting Data</div>;
    }
  }
}
