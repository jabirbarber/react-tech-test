import React from 'react';

const SortableHeaderCell = ({title, onClickHandler, direction}) => {
	let arrowDir = '';
	if (direction) {
		arrowDir = (direction == 'desc' ?  'up' : 'down');
	}
	return (
		<div className="clickable" onClick={() => onClickHandler()}>
			{title}
			<span className={'sortarrow ' + arrowDir}></span>
		</div>
	)
}

export default SortableHeaderCell;