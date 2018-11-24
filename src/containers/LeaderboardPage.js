import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../actions';
import { Link } from "react-router-dom";

class LeaderboardPage extends Component {

	constructor(props) {
		super(props);
		this.props.getUsers();
	}

  componentDidMount() {
  }

  render() {
    return <h1>LeaderBoardPage</h1>
  }
}


function mapStateToProps(state) {
  return {
    users: state.usersReducer.users
  };
}

export default connect(mapStateToProps, { getUsers })(LeaderboardPage);
