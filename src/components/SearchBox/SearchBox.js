import React from "react";
import "./Styles.css";

export default class SearchBox extends React.Component {
  state = {
    show: true,
  };

  handleSubmission = (e) => {
    if (e.key === "Enter") {
      console.log("enter key hit");
      console.log(e.target.value);
      this.setState({ show: false });
    }
  };

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="PUBG ID..."
          id={this.state.show ? "search" : "search-hide"}
          onKeyDown={this.handleSubmission}
        />
      </div>
    );
  }
  // }
}
