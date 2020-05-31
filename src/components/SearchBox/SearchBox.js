import React from "react";
import "./Styles.css";

export default class SearchBox extends React.Component {
  state = {
    show: true,
  };

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="PUBG ID..."
          id={this.state.show ? "search" : "search-hide"}
        />
      </div>
    );
  }
  // }
}
