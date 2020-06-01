import React from "react";
import "./Styles.css";
import TOKEN from "../../TOKEN";

export default class Dashboard extends React.Component {
  render() {
    return (
      <div className="container">
        <header className="header"></header>
        <aside className="side-options"></aside>
        <main className="dashboard"></main>
        <footer className="footer"></footer>
      </div>
    );
  }
  // }
}
