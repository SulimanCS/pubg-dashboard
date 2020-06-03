import React from "react";
import SearchBox from "./components/SearchBox/SearchBox";
import Dashboard from "./components/Dashboard/Dashboard";
import "./App.css";

export default class App extends React.Component {
  state = {
    gameID: null,
    accountID: null,
    matches: [],
    search: true,
  };

  callback = (gameID, accountID, matches) => {
    this.setState({
      gameID: gameID,
      accountID: accountID,
      matches: matches,
    });
  };

  searchCallback = () => {
    console.log("in SCB");
    this.setState({
      search: true,
      gameID: null,
      accountID: null,
      matches: [],
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.gameID !== this.state.gameID && this.state.gameID !== null) {
      setTimeout(() => this.setState({ search: false }), 750);
    }
  }

  render() {
    return this.state.search ? (
      <div className="App">
        <header className="App-header">
          <SearchBox callback={this.callback} />
        </header>
      </div>
    ) : (
      <div className="App">
        <header className="disable-particles">
          <Dashboard
            gameID={this.state.gameID}
            accountID={this.state.accountID}
            matches={this.state.matches}
            callback={this.searchCallback}
          />
        </header>
      </div>
    );
  }
}
