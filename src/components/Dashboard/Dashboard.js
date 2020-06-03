import React from "react";
import "./Styles.css";
import TOKEN from "../../TOKEN";
import Graph from "../Graph/Graph";

export default class Dashboard extends React.Component {
  // props set to state on purpose to disable component re-render
  // when a prop gets updated. This is necessary to enable
  // the "return-back" to the search page feature,
  state = {
    gameID: this.props.gameID,
    accountID: this.props.accountID,
    matches: this.props.matches,
    lifetimeStats: {},
    loaded: false,
    mode: "solo",
    lastMatchStats: null,
    show: true,
  };

  async componentDidMount() {
    // get player lifetime stats for all modes
    const options = {
      headers: {
        "Authorization": "Bearer " + TOKEN,
        "Accept": "application/vnd.api+json",
      },
    };
    let url = `https://api.pubg.com/shards/steam/players/${this.state.accountID}/seasons/lifetime`;
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
    const lastMatchID = this.getLastGameID(this.state.matches);
    if (lastMatchID !== null) {
      const matchObj = await this.getMatchStats(lastMatchID);
      const playerStats = this.extractPlayerStats(matchObj);
      this.setState({ lastMatchStats: playerStats, loaded: true });
    } else this.setState({ loaded: true });
  }

  getLastGameID = (matches) => {
    if (matches["data"] == undefined || matches["data"].length === 0)
      return null;
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
          if (stats["name"] == this.state.gameID) {
            matchStats = stats;
          }
        }
      }
    });
    return matchStats;
  };

  handleOptionClick = (mode) => {
    this.setState({ mode: mode }, () => console.log(`mode changed to ${mode}`));
  };

  currentMode = (mode) => {
    return mode === this.state.mode;
  };

  handleAnotherSearch = () => {
    this.setState({ show: false }, () => {
      setTimeout(() => this.props.callback(null, null, null), 3000);
    });
  };

  render() {
    // extract data based on mode
    const data = this.state.lifetimeStats[this.state.mode];

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
      <div
        className={this.state.show ? "disable-particles" : "enable-particles"}
      >
        <div className={this.state.show ? "container" : "container-hide"}>
          <aside className="side-options">
            <div className="options-list">
              <ul>
                <li
                  className={
                    this.currentMode("solo") ? "option option-active" : "option"
                  }
                  onClick={() => {
                    this.handleOptionClick("solo");
                  }}
                >
                  Solo
                </li>
                <li
                  className={
                    this.currentMode("solo-fpp")
                      ? "option option-active"
                      : "option"
                  }
                  onClick={() => {
                    this.handleOptionClick("solo-fpp");
                  }}
                >
                  Solo-FPP
                </li>
                <li
                  className={
                    this.currentMode("duo") ? "option option-active" : "option"
                  }
                  onClick={() => {
                    this.handleOptionClick("duo");
                  }}
                >
                  Duo
                </li>
                <li
                  className={
                    this.currentMode("duo-fpp")
                      ? "option option-active"
                      : "option"
                  }
                  onClick={() => {
                    this.handleOptionClick("duo-fpp");
                  }}
                >
                  Duo-FPP
                </li>
                <li
                  className={
                    this.currentMode("squad")
                      ? "option option-active"
                      : "option"
                  }
                  onClick={() => {
                    this.handleOptionClick("squad");
                  }}
                >
                  Squads
                </li>
                <li
                  className={
                    this.currentMode("squad-fpp")
                      ? "option option-active"
                      : "option"
                  }
                  onClick={() => {
                    this.handleOptionClick("squad-fpp");
                  }}
                >
                  Squads-FPP
                </li>
                <li className="option" onClick={this.handleAnotherSearch}>
                  Search another player
                </li>
              </ul>
            </div>
          </aside>
          <main className="dashboard">
            <div className="dashboard-header">
              <div>Hello {this.state.gameID}</div>
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
              <div className="space">
                <Graph
                  style={{ position: "relative", backgroundColor: "#F5DEB3" }}
                  matches={this.state.matches}
                />
              </div>
              <div className="space">Placeholder</div>
            </div>
          </main>
          <footer className="footer"></footer>
        </div>
      </div>
    ) : null;
  }
  // }
}
