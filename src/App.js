import React from "react";
import SearchBox from "./components/SearchBox/SearchBox";
import "./App.css";

export default class App extends React.Component {
  state = {
    gameID: null,
    accountID: null,
  };

  callback = (gameID, accountID) => {
    this.setState({
      gameID: gameID,
      accountID: accountID,
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <SearchBox callback={this.callback} />
        </header>
      </div>
    );
  }
}
