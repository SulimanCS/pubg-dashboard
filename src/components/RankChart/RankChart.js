import React from "react";
import CanvasJSReact from "../../assests/canvasjs.react";
import "./Styles.css";
import TOKEN from "../../TOKEN";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class RankChart extends React.Component {
  state = {
    gameID: this.props.gameID,
    matches: this.props.matches,
    needMore: false,
    loaded: false,
    stats: [],
  };

  async componentDidMount() {
    await this.getChartData();
    this.setState({ loaded: true });
  }

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
          if (stats["name"] === this.state.gameID) {
            matchStats = stats;
          }
        }
      }
    });
    return matchStats;
  };

  getChartData = async () => {
    if (this.state.matches["data"].length < 10) {
      this.setState({ needMore: true });
      return;
    }
    let x = 1;
    for (let i = 9; i > -1; i--) {
      const matchID = this.state.matches["data"][i]["id"];
      const game = await this.getMatchStats(matchID);
      const stats = await this.extractPlayerStats(game);
      console.log(matchID);
      console.log(stats);
      const obj = { x: x, y: stats["winPlace"] };
      x++;
      this.setState({ stats: [obj, ...this.state.stats] });
    }
    // console.log(this.state.stats);
  };

  render() {
    const options = {
      backgroundColor: "silver",
      animationEnabled: true,
      exportEnabled: false,
      theme: "light1",
      title: {
        text: "Performance Over the Past 10 Games [rank]",
      },
      axisY: {
        reversed: true,
        title: "Rank",
        includeZero: false,
        suffix: "",
      },
      axisX: {
        title: "Games",
        prefix: "G",
        interval: 1,
      },
      data: [
        {
          type: "line",
          toolTipContent: "Game {x}: rank {y}",
          dataPoints: this.state.stats,
        },
      ],
    };
    return this.state.loaded ? (
      <div className="chart">
        {this.state.needMore ? (
          "There isn't enough data to generate a rank chart -  play more matches"
        ) : (
          <CanvasJSChart options={options} />
        )}
      </div>
    ) : (
      <div className="chart">Loading...</div>
    );
  }
}
