import React from "react";
import "./Styles.css";
import TOKEN from "../../TOKEN";

export default class Dashboard extends React.Component {
  state = {
    lifetimeStats: {},
  };

  async componentDidMount() {
    let options = {
      headers: {
        "Authorization": "Bearer " + TOKEN,
        "Accept": "application/vnd.api+json",
      },
    };
    let url = `https://api.pubg.com/shards/steam/players/${this.props.accountID}/seasons/lifetime`;
    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(data["data"]["attributes"]["gameModeStats"]);
        this.setState({
          lifetimeStats: data["data"]["attributes"]["gameModeStats"],
        });
      })
      .catch((err) => null);
  }

  render() {
    return (
      <div className="container">
        <header className="header"></header>
        <aside className="side-options"></aside>
        <main className="dashboard">
          <div className="dashboard-header">
            <div>Hello {this.props.gameID}</div>
            <div>STEAM</div>
          </div>
          <div className="dashboard-widgets">
            <div className="widget">
              <div>info</div>
              <div>:</div>
              <div>info</div>
            </div>
            <div className="widget">
              <div>info</div>
              <div>:</div>
              <div>info</div>
            </div>
            <div className="widget">
              <div>info</div>
              <div>:</div>
              <div>info</div>
            </div>
            <div className="widget">
              <div>info</div>
              <div>:</div>
              <div>info</div>
            </div>
          </div>
          <div className="dashboard-space">
            <div className="space">
              <div className="space-row">
                <div>info</div>
                <div>:</div>
                <div>info</div>
              </div>
              <div className="space-row">
                <div>info</div>
                <div>:</div>
                <div>info</div>
              </div>
              <div className="space-row">
                <div>info</div>
                <div>:</div>
                <div>info</div>
              </div>
              <div className="space-row">
                <div>info</div>
                <div>:</div>
                <div>info</div>
              </div>
              <div className="space-row">
                <div>info</div>
                <div>:</div>
                <div>info</div>
              </div>
              <div className="space-row">
                <div>info</div>
                <div>:</div>
                <div>info</div>
              </div>
              <div className="space-row">
                <div>info</div>
                <div>:</div>
                <div>info</div>
              </div>
            </div>
            <div className="space">Placeholder</div>
            <div className="space">Placeholder</div>
          </div>
        </main>
        <footer className="footer"></footer>
      </div>
    );
  }
  // }
}
