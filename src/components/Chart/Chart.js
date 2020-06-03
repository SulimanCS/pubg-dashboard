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
  };

  render() {
    const options = {
      backgroundColor: "silver",
      animationEnabled: true,
      exportEnabled: true,
      theme: "light1", // "light1", "dark1", "dark2"
      title: {
        text: "Bounce Rate by Week of Year",
      },
      axisY: {
        title: "Bounce Rate",
        includeZero: false,
        suffix: "%",
      },
      axisX: {
        title: "Week of Year",
        prefix: "W",
        interval: 2,
      },
      data: [
        {
          type: "line",
          toolTipContent: "Week {x}: {y}%",
          dataPoints: [
            { x: 1, y: 64 },
            { x: 2, y: 61 },
            { x: 3, y: 64 },
            { x: 4, y: 62 },
            { x: 5, y: 64 },
            { x: 6, y: 60 },
            { x: 7, y: 58 },
            { x: 8, y: 59 },
            { x: 9, y: 53 },
            { x: 10, y: 54 },
            { x: 11, y: 61 },
            { x: 12, y: 60 },
            { x: 13, y: 55 },
            { x: 14, y: 60 },
            { x: 15, y: 56 },
            { x: 16, y: 60 },
            { x: 17, y: 59.5 },
            { x: 18, y: 63 },
            { x: 19, y: 58 },
            { x: 20, y: 54 },
            { x: 21, y: 59 },
            { x: 22, y: 64 },
            { x: 23, y: 59 },
          ],
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
