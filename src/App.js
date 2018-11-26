import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import LeaderboardPage from './containers/LeaderboardPage';
import ProfilePage from './containers/ProfilePage';
import MembersPage from './containers/MembersPage';

class App extends Component {

	componentDidMount() {
	}

	render() {
		return <Router>
			<div>
				<ul className="nav">
					<li>
						<Link to="/">Leaderboard</Link>
					</li>
					<li>
						<Link to="/members">Members</Link>
					</li>
				</ul>

				<hr />

				<Route exact path="/" component={LeaderboardPage} />
				<Route path="/profile" component={ProfilePage} />
				<Route path="/members" component={MembersPage} />
			</div>
		</Router>
	}
}

export default App;
