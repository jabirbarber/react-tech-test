import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../actions';
import { Link } from "react-router-dom";

class ProfilePage extends Component {

  componentDidMount() {
  }

  render() {
    return <h1>Profile Page</h1>
  }
}


function mapStateToProps(state) {
  return {
    users: state.users
  };
}

export default connect(mapStateToProps, { getUsers })(ProfilePage);
