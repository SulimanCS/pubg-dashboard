import React from "react";
import SearchBox from "./components/SearchBox/SearchBox";
import "./App.css";

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <SearchBox />
        </header>
      </div>
    );
  }
}
