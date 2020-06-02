import React from "react";
import "./Styles.css";
import TOKEN from "../../TOKEN";

export default class Dashboard extends React.Component {
  state = {
    lifetimeStats: {},
    loaded: false,
    mode: "solo",
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
        // console.log(data);
        // console.log(data["data"]["attributes"]["gameModeStats"]);
        this.setState({
          lifetimeStats: data["data"]["attributes"]["gameModeStats"],
          loaded: true,
        });
      })
      .catch((err) => null);
  }

  render() {
    // extract data based on mode
    const data = this.state.lifetimeStats[this.state.mode];
    console.log(data);

    // extract specific stats from data obj
    const wins = data ? data["wins"] : null;
    const kills = data ? data["kills"] : null;
    const assists = data ? data["assists"] : null;
    const boosts = data ? data["boosts"] : null;
    const revives = data ? data["revives"] : null;
    const heals = data ? data["heals"] : null;
    const dBNOs = data ? data["dBNOs"] : null;

    return this.state.loaded ? (
      <div className="container">
        <header className="header"></header>
        <aside className="side-options"></aside>
        <main className="dashboard">
          <div className="dashboard-header">
            <div>Hello {this.props.gameID}</div>
            <div>STEAM</div>
          </div>
          <div className="dashboard-widgets">
            <div
              className="widget"
              style={{ justifyContent: "center", fontSize: "1.3em" }}
            >
              <div>Last Game</div>
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
              <h1 style={{ marginBottom: 10 }}>Lifeitme Stats</h1>
              <div className="space-row">
                <div>Wins</div>
                <div className="separator">:</div>
                <div style={{ color: "#A0060F" }}>{wins}</div>
              </div>
              <div className="space-row">
                <div>Kills</div>
                <div className="separator">:</div>
                <div style={{ color: "#A0060F" }}>{kills}</div>
              </div>
              <div className="space-row">
                <div>Assists</div>
                <div className="separator">:</div>
                <div style={{ color: "#A0060F" }}>{assists}</div>
              </div>
              <div className="space-row">
                <div>Boosts</div>
                <div className="separator">:</div>
                <div style={{ color: "#A0060F" }}>{boosts}</div>
              </div>
              <div className="space-row">
                <div>Revives</div>
                <div className="separator">:</div>
                <div style={{ color: "#A0060F" }}>{revives}</div>
              </div>
              <div className="space-row">
                <div>Heals</div>
                <div className="separator">:</div>
                <div style={{ color: "#A0060F" }}>{heals}</div>
              </div>
              <div className="space-row">
                <div>dBNOs</div>
                <div className="separator">:</div>
                <div style={{ color: "#A0060F" }}>{dBNOs}</div>
              </div>
            </div>
            <div className="space">Placeholder</div>
            <div className="space">Placeholder</div>
          </div>
        </main>
        <footer className="footer"></footer>
      </div>
    ) : null;
  }
  // }
}
