import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUsers, getLeaderboard } from '../actions';
import { Link } from "react-router-dom";
import MembersDropdown from '../components/membersdropdown';

class MembersPage extends Component {

	constructor(props) {
		super(props);
    this.state = {
      selectedMemberId: null
    }
	}

  componentDidMount() {
    if (!Object.keys(this.props.users).length) {
      this.props.getUsers();
    }
  }

  render() {
    return (
      <div>
        <h3>Members</h3>
        { this.renderDropdown() }
        { this.renderMemberForm() }
      </div>
     )
  }

  renderMemberForm() {
    this.selectedMember = this.props.users[this.state.selectedMemberId];
    if (this.selectedMember) {
      return (
        <ul>
          <li>{ this.selectedMember.name }</li>
          <li>{ this.selectedMember.email }</li>
          <li>{ this.selectedMember.username }</li>
        </ul>
      )
    }
  }

  handleOnMemberItemChange(event) {
    this.setState({selectedMemberId: event.target.value});
  }

  renderDropdown() {
    if (Object.keys(this.props.users).length) {
        return <MembersDropdown
          members={this.props.users}
          onMemberChange={this.handleOnMemberItemChange.bind(this)}
        />
    }
  }
}


function mapStateToProps(state) {
  return {
    users: state.usersReducer.users,
  };
}

export default connect(mapStateToProps, { getUsers, getLeaderboard })(MembersPage);
