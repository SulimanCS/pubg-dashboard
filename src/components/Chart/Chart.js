import React from "react";
import CanvasJSReact from "../../assests/canvasjs.react";
import "./Styles.css";
import TOKEN from "../../TOKEN";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class Chart extends React.Component {
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
          if (stats["name"] == this.state.gameID) {
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
    for (let i = 0; i < 10; i++) {
      const matchID = this.state.matches["data"][i]["id"];
      const game = await this.getMatchStats(matchID);
      const stats = await this.extractPlayerStats(game);
      console.log(matchID);
      console.log(stats);
      const obj = { x: i + 1, y: stats["kills"] };
      this.setState({ stats: [...this.state.stats, obj] });
    }
    console.log(this.state.stats);
  };

  render() {
    const options = {
      backgroundColor: "silver",
      animationEnabled: true,
      exportEnabled: false,
      theme: "light1", // "light1", "dark1", "dark2"
      title: {
        text: "Performance Over the Past 10 Games [kills]",
      },
      axisY: {
        title: "Kills",
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
          toolTipContent: "Game {x}: {y} kills",
          dataPoints: this.state.stats,
        },
      ],
    };
    return this.state.loaded ? (
      <div className="chart">
        {this.state.needMore ? (
          "There isn't enough data to generate a chart -  play more matches"
        ) : (
          <CanvasJSChart
            options={options}
            /* onRef={ref => this.chart = ref} */
          />
        )}
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    ) : (
      <div className="chart">Loading...</div>
    );
  }
}
