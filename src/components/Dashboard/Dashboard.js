import React from "react";
import "./Styles.css";
import TOKEN from "../../TOKEN";

export default class Dashboard extends React.Component {
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
