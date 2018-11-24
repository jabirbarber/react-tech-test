import React from 'react';

const LeaderBoardRow = ({userId, wins, losses, averageScore, userName}) => (
  <div className="row">
    <div>{userName || userId}</div>
    <div>{wins}</div>
    <div>{losses}</div>
    <div>{averageScore}</div>       
  </div>
);

export default LeaderBoardRow;