import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../actions';
import { Link } from "react-router-dom";

class LeaderboardPage extends Component {

  componentDidMount() {
  }

  render() {
    return <h1>LeaderBoardPage</h1>
  }
}


function mapStateToProps(state) {
  return {
    users: state.users
  };
}

export default connect(mapStateToProps, { getUsers })(LeaderboardPage);
