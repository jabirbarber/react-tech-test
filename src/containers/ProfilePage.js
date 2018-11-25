import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUsers, getGames } from '../actions';
import { Link } from "react-router-dom";
import ProfileAttribute from '../components/profileattribute';
import LoadingIndicator from '../components/loadingindicator';

class ProfilePage extends Component {
  constructor(props) {
	super(props);
	let pushedProps = this.props.location.state;
	this.selectedUser = this.props.users[pushedProps.userId];
	this.selectedUser.extendedData = pushedProps;
	this.gamesFetchParams = {
		winnerId: this.selectedUser.id,
		_page: 1,
		_limit: 5
	}
	this.props.getGames(this.gamesFetchParams);
  }

  render() {
  	const { wins, losses, averageScore, highestScore } = this.selectedUser.extendedData;
  	const againstUserName = this.props.users[highestScore.against].name;
  	const highScoreDate = new Date().toDateString(); // @todo - hookup
    if (this.props.isLoading) {
      return <LoadingIndicator />;
    }
    return (
    	<div>
    		<h3>{ this.selectedUser.name }</h3>
    		<ProfileAttribute title={'Wins'} value={wins} />
    		<ProfileAttribute title={'Losses:'} value={losses} />
    		<ProfileAttribute title={'Average Score:'} value={averageScore} />
    		<ProfileAttribute title={'Highest Score:'} value={highestScore.score} />
    		<ProfileAttribute title={'High Score Date:'} value={highScoreDate} klassList={'sub'} />
    		<ProfileAttribute title={'High Score Against:'} value={againstUserName} klassList={'sub'}/>
    		{ this.renderWonGames() }
    	</div>
    )
  }

  renderWonGames() {
  	const list = this.props.games.map((game) => {
  		var winDate = new Date(game.createdAt).toDateString(),
  			winScore, winOpponent;
  		game.scores.map((x) => {
  			if (x.memberId == this.selectedUser.id) {
  				winScore = x.score;
  				return;
  			} else {
  				winOpponent = this.props.users[x.memberId].name;
  			}
  		})
  		return <li key={winScore}> > {winDate}  >  Score: {winScore}  >  Against: {winOpponent}</li>
  	});
  	return (
  		<div className="games-won-container">
  			<h5> Games Won </h5>
  			<ul>
  				{ list }
  			</ul>
  			{ this.renderPagination() }
  		</div>
  	)
  }

  renderPagination() {
  	var pageNumbers = [];
  	var currentPage = this.gamesFetchParams['_page'];
    var totalPages = Math.ceil(this.props.totalGamesResults / this.gamesFetchParams['_limit']);
  	for (var i = 1; i <= totalPages; i++) {
  		pageNumbers.push(
  			<div key={i} className={i == currentPage ? 'selected' : ''} onClick={this.onGamesWonPageNumberClick.bind(this, i)}>{i}</div>
  		);
  	}
  	return <div className="pagination-container">{pageNumbers}</div>;
  }

  onGamesWonPageNumberClick(number) {
   	this.gamesFetchParams['_page'] = number;
  	this.props.getGames(this.gamesFetchParams);
  }
}


function mapStateToProps(state) {
  return {
    users: state.usersReducer.users,
    games: state.gamesReducer.games,
    totalGamesResults: state.gamesReducer.totalResults,
    isLoading: state.gamesReducer.gamesLoading
  };
}

export default connect(mapStateToProps, { getUsers, getGames })(ProfilePage);
