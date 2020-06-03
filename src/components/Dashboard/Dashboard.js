import React from "react";
import "./Styles.css";
import TOKEN from "../../TOKEN";

export default class Dashboard extends React.Component {
  state = {
    lifetimeStats: {},
    loaded: false,
    mode: "solo",
    lastMatchStats: null,
  };

  async componentDidMount() {
    // get player lifetime stats for all modes
    const options = {
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
        });
      })
      .catch((err) => null);

    // get ID of the last match played
    const lastMatchID = this.getLastGameID(this.props.matches);
    if (lastMatchID !== null) {
      const matchObj = await this.getMatchStats(lastMatchID);
      const playerStats = this.extractPlayerStats(matchObj);
      this.setState({ lastMatchStats: playerStats, loaded: true });
    } else this.setState({ loaded: true });
  }

  getLastGameID = (matches) => {
    if (matches["data"].length === 0) return null;
    return matches["data"][0]["id"];
  };

  getMatchStats = async (matchID) => {
    const options = {
      headers: {
        "Authorization": "Bearer " + TOKEN,
        "Accept": "application/vnd.api+json",
      },
    };
    const url = `https://api.pubg.com/shards/steam/matches/${matchID}`;
    const response = await fetch(url, options);
    const game = await response.json();
    return game;
  };

  extractPlayerStats = (matchObj) => {
    const players = matchObj["included"];
    let matchStats = null;
    players.forEach((element) => {
      const attributes = element["attributes"];
      if (attributes.hasOwnProperty("stats")) {
        const stats = attributes["stats"];
        if (stats.hasOwnProperty("name")) {
          if (stats["name"] == this.props.gameID) {
            matchStats = stats;
          }
        }
      }
    });
    return matchStats;
  };

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

    const lastMatchStats = this.state.lastMatchStats;
    const lastMatchRank = lastMatchStats ? lastMatchStats["winPlace"] : "N/A";
    const lastMatchKills = lastMatchStats ? lastMatchStats["kills"] : "N/A";
    const lastMatchAssists = lastMatchStats ? lastMatchStats["Assists"] : "N/A";

    return this.state.loaded ? (
      <div className="container">
        <header className="header"></header>
        <aside className="side-options">
          <ul>
            <li>Placeholder option</li>
            <li>Placeholder option</li>
            <li>Placeholder option</li>
            <li>Placeholder option</li>
          </ul>
        </aside>
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
              <div>Rank</div>
              <div>:</div>
              <div>{lastMatchRank}</div>
            </div>
            <div className="widget">
              <div>Kills</div>
              <div>:</div>
              <div>{lastMatchKills}</div>
            </div>
            <div className="widget">
              <div>Assists</div>
              <div>:</div>
              <div>{lastMatchAssists}</div>
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
