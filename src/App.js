import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import LeaderboardPage from './containers/LeaderboardPage';
import ProfilePage from './containers/ProfilePage';

class App extends Component {

  componentDidMount() {
  }

  render() {
    return <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Leaderboard</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>

        <hr />

        <Route exact path="/" component={LeaderboardPage} />
        <Route path="/profile" component={ProfilePage} />
      </div>
    </Router>
  }
}

export default App;
