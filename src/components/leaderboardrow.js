import React from 'react';

const LeaderBoardRow = ({userId, wins, losses, averageScore, name, onRowClick}) => (
	<div className="row clickable" onClick={onRowClick}>
		<div>{name}</div>
		<div>{wins}</div>
		<div>{losses}</div>
		<div>{averageScore}</div>
	</div>
);

export default LeaderBoardRow;