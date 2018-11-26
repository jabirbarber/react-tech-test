import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUsers, getLeaderboard, updateUser, resetUpdateUserError } from '../actions';
import { Link } from "react-router-dom";
import MembersDropdown from '../components/membersdropdown';
import LoadingIndicator from '../components/loadingindicator';

class MembersPage extends Component {

	constructor(props) {
		super(props);
		this.handleFormInputChange = this.handleFormInputChange.bind(this);
		this.handleUpdateMemberSubmit = this.handleUpdateMemberSubmit.bind(this);
		this.state = {
			selectedMemberId: 1
		}
	}

	nullifyChangedMemberDetails() {
		this.changedMemberDetails = {
			name: null,
			email: null,
			username: null
		}
	}

	componentDidMount() {
		this.nullifyChangedMemberDetails();
		if (!Object.keys(this.props.users).length) {
			this.props.getUsers();
		}
	}

	componentWillReceiveProps(newProps) {
	}

	render() {
		if (this.props.usersLoading) {
			return <LoadingIndicator />
		}
		return (
			<div>
				<h3>Members</h3>
				{ this.renderDropdown() }
				{ this.renderMemberForm() }
				{ this.renderFormErrors() }
			</div>
		 )
	}

	renderMemberForm() {
		this.selectedMember = this.props.users[this.state.selectedMemberId];
		if (this.selectedMember) {
			return (
				<form
					className="members-form"
					onSubmit={this.handleUpdateMemberSubmit}
					ref={(el) => this.memberFormRef = el}
				>
					<label>
						Name:
						<input
							name="membername"
							placeholder={this.selectedMember.name}
							type="text"
							onChange={this.handleFormInputChange} />
					</label>
					<br />
					<label>
						Email:
						<input
							name="memberemail"
							placeholder={this.selectedMember.email}
							type="email"
							onChange={this.handleFormInputChange} />
					</label>
					<br />
					<label>
						Username:
						<input
							name="memberusername"
							placeholder={this.selectedMember.username}
							type="text"
							onChange={this.handleFormInputChange} />
					</label>
					<br />
					<button type="submit" className="btn btn-primary">
						{ this.props.updateUserLoading ? '...' : 'Update' }
					</button>
				</form>
			)
		}
	}

	handleUpdateMemberSubmit(e) {
		e.preventDefault();
		if (this.validateIfDetailsNotChanged()) return;
		let newParams = this.constructUpdateUserParams();
		this.props.updateUser(this.selectedMember.id, newParams);
	}

	validateIfDetailsNotChanged() {
		if (
			!this.changedMemberDetails.name &&
			!this.changedMemberDetails.email &&
			!this.changedMemberDetails.username
		){
			return true;
		}
		return false;
	}

	constructUpdateUserParams() {
		var updateParams = {};
		if (this.changedMemberDetails.name) {
			updateParams.name = this.changedMemberDetails.name;
		}
		if (this.changedMemberDetails.email) {
			updateParams.email = this.changedMemberDetails.email;
		}
		if (this.changedMemberDetails.username) {
			updateParams.username = this.changedMemberDetails.username;
		}
		return updateParams;
	}

	handleFormInputChange(event) {
		const target = event.target;
		if (target.name == 'membername') {
			this.changedMemberDetails.name = target.value;
		}
		if (target.name == 'memberemail') {
			this.changedMemberDetails.email = target.value;
		}
		if (target.name == 'memberusername') {
			this.changedMemberDetails.username = target.value;
		}
	}

	handleOnMemberItemChange(event) {
		this.nullifyChangedMemberDetails();
		this.memberFormRef && this.memberFormRef.reset();
		this.props.resetUpdateUserError();
		this.setState({selectedMemberId: event.target.value});
	}

	renderDropdown() {
		const userIds = Object.keys(this.props.users);
		if (userIds.length) {
				return <MembersDropdown
					members={this.props.users}
					onMemberChange={this.handleOnMemberItemChange.bind(this)}
				/>
		}
	}

	renderFormErrors() {
		const {updateUserError} = this.props;
		var errorDivs = [];
		if (updateUserError) {
			if (typeof updateUserError == 'object') {
				var errors = updateUserError.errors;
				if (errors) {
					errors.forEach(err => {
						let errString = (err.msg && err.param) ? `${err.param} - ${err.msg}`: err.value;
						errorDivs.push(<div key={Math.random()} className="form-error">{ errString }</div>);
					})
				}
			} else {
				errorDivs.push(<div key={Math.random()} className="form-error">{ updateUserError }</div>);
			}
			return errorDivs;
		}
	}
}


function mapStateToProps(state) {
	return {
		users: state.usersReducer.users,
		usersLoading: state.usersReducer.usersLoading,
		updateUserError: state.usersReducer.updateUserError,
		updateUserLoading: state.usersReducer.updateUserLoading
	};
}

export default connect(mapStateToProps, { getUsers, getLeaderboard, updateUser, resetUpdateUserError })(MembersPage);
