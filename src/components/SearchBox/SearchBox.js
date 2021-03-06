import React from "react";
import "./Styles.css";
import TOKEN from "../../TOKEN";

export default class SearchBox extends React.Component {
  state = {
    show: true,
    class: "search-begin",
  };

  checkIDValidity = (ID) => {
    let options = {
      headers: {
        "Authorization": "Bearer " + TOKEN,
        "Accept": "application/vnd.api+json",
      },
    };
    let url = `https://api.pubg.com/shards/steam/players?filter[playerNames]=${ID}`;
    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        const gameID = data["data"][0]["attributes"]["name"];
        const accountID = data["data"][0]["id"];
        const matches = data["data"][0]["relationships"]["matches"];
        console.log(gameID, accountID);
        this.setState({
          show: false,
          class: "search-hide",
        });
        this.props.callback(gameID, accountID, matches);
      })
      .catch((err) => {
        console.log(err);
        this.setState(
          {
            show: false,
            class: "search error",
          },
          () => {
            setTimeout(() => {
              this.setState({ class: "search" });
            }, 4000);
          }
        );
      });
  };

  handleSubmission = (e) => {
    if (e.key === "Enter") {
      console.log("enter key hit");
      this.checkIDValidity(e.target.value);
      // this.setState({ show: false });
    }
  };

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="PUBG ID..."
          className={this.state.class}
          onKeyDown={this.handleSubmission}
          autoComplete="off"
          spellCheck="false"
        />
      </div>
    );
  }
  // }
}
