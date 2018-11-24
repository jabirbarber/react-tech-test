import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUsers, getLeaderboard } from '../actions';
import { Link } from "react-router-dom";
import LeaderBoardRow from '../components/leaderboardrow';
import SortableHeaderCell from '../components/sortableheadercell';

class LeaderboardPage extends Component {

	constructor(props) {
		super(props);
		this.leaderBoardFetchPrams = {
			_page: 1,
			_sort: 'wins',
			_order: 'asc'
		}
		this.props.getUsers();
		this.totalPages = 10;
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
  	this.props.getLeaderboard(this.leaderBoardFetchPrams);
  }

  onPageNumberClick(number) {
  	this.leaderBoardFetchPrams['_page'] = number;
  	this.props.getLeaderboard(this.leaderBoardFetchPrams);
  }

  renderPagination() {
  	var pageNumbers = [];
  	var currentPage = this.leaderBoardFetchPrams['_page'];
  	for (var i = 1; i <= this.totalPages; i++) {
  		pageNumbers.push(
  			<div className={i == currentPage ? 'selected' : ''} onClick={this.onPageNumberClick.bind(this, i)}>{i}</div>
  		);
  	}
  	return <div className="pagination-container">{pageNumbers}</div>;
  }

  render() {
  	const rows = this.props.leaderboardData.map( (data) => {
  		// check if user exists - fyi userId 0 does not map to a user
  		let username = this.props.users[data.userId] && this.props.users[data.userId].username;
  		let rowProps = {...data, userName: username, key: data.userId};
  		return username && <LeaderBoardRow {...rowProps} />;
  	});
    return (
    	<div>
    		<h3>Leaderboard</h3>
	    	<div className="table">
	        <div className="table-header">
	          <div>Username</div>
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
    leaderboardData: state.leaderboardReducer.data
  };
}

export default connect(mapStateToProps, { getUsers, getLeaderboard })(LeaderboardPage);
