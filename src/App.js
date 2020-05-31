import React from "react";
import SearchBox from "./components/SearchBox/SearchBox";
import "./App.css";

export default class App extends React.Component {
  state = {
    gameID: null,
    accountID: null,
    search: true,
  };

  callback = (gameID, accountID) => {
    this.setState({
      gameID: gameID,
      accountID: accountID,
    });
  };

  render() {
    return this.state.search ? (
      <div className="App">
        <header className="App-header">
          <SearchBox callback={this.callback} />
        </header>
      </div>
    ) : (
      <div className="App">
        <header className="App-header disable-particles"></header>
      </div>
    );
  }
}
