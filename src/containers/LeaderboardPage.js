import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUsers, getLeaderboard } from '../actions';
import { Link } from "react-router-dom";
import LeaderBoardRow from '../components/leaderboardrow';
import SortableHeaderCell from '../components/sortableheadercell';
import LoadingIndicator from '../components/loadingindicator';

class LeaderboardPage extends Component {

	constructor(props) {
		super(props);
		this.leaderBoardFetchPrams = {
			_page: 1,
			_limit: 10,
			_sort: 'wins',
			_order: 'asc'
		}
		this.props.getUsers();
	}

	componentDidMount() {
		this.props.getLeaderboard(this.leaderBoardFetchPrams);
	}

	getColumnDirection(key) {
		let sortKey = this.leaderBoardFetchPrams._sort;
		let dir = this.leaderBoardFetchPrams._order;
		if (sortKey == key) return dir;
		return '';
	}

	onSortableHeaderClick(key) {
		this.leaderBoardFetchPrams['_sort'] = key;
		this.leaderBoardFetchPrams['_order'] = this.leaderBoardFetchPrams._order == 'asc' ? 'desc' : 'asc';
		this.leaderBoardFetchPrams['_page'] = 1;
		this.props.getLeaderboard(this.leaderBoardFetchPrams);
	}

	onPageNumberClick(number) {
		this.leaderBoardFetchPrams['_page'] = number;
		this.props.getLeaderboard(this.leaderBoardFetchPrams);
	}

	renderPagination() {
		var pageNumbers = [];
		var currentPage = this.leaderBoardFetchPrams['_page'];
		var totalPages = Math.ceil(this.props.totalResults / this.leaderBoardFetchPrams['_limit']);
		for (var i = 1; i <= totalPages; i++) {
			pageNumbers.push(
				<div key={i} className={i == currentPage ? 'selected' : ''} onClick={this.onPageNumberClick.bind(this, i)}>{i}</div>
			);
		}
		return <div className="pagination-container">{pageNumbers}</div>;
	}

	onLeaderBoardRowClick(data) {
		this.props.history.push({
			pathname: '/profile/',
			state: data
		})
	}

	render() {
		const rows = this.props.leaderboardData.map( (data) => {
			// check if user exists - fyi userId 0 does not map to a user
			let name = this.props.users[data.userId] && this.props.users[data.userId].name;
			let rowProps = {...data, name: name, key: data.userId, onRowClick: this.onLeaderBoardRowClick.bind(this, data)};
			return name && <LeaderBoardRow {...rowProps} />;
		});
		if (this.props.isLoading) {
			return <LoadingIndicator />
		}
		return (
			<div>
				<h3>Leaderboard</h3>
				<div className="table">
					<div className="table-header">
						<div>Name</div>
						<SortableHeaderCell
							title="Wins"
							onClickHandler={() => this.onSortableHeaderClick('wins')}
							direction={this.getColumnDirection('wins')}
						/>
						<div>Losses</div>
						<SortableHeaderCell
							title="Average Score"
							onClickHandler={() => this.onSortableHeaderClick('averageScore')}
							direction={this.getColumnDirection('averageScore')}
						/>
					</div>
					<div className="body">
						{rows}
					</div>
				</div>
				{ this.renderPagination() }
			</div>
		 )
	}
}


function mapStateToProps(state) {
	return {
		users: state.usersReducer.users,
		leaderboardData: state.leaderboardReducer.data,
		totalResults: state.leaderboardReducer.totalResults,
		isLoading: state.usersReducer.usersLoading || state.leaderboardReducer.leaderboardLoading
	};
}

export default connect(mapStateToProps, { getUsers, getLeaderboard })(LeaderboardPage);
