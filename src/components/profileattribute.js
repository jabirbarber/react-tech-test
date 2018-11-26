import React from 'react';

const ProfileAttribute = ({title, value, klassList}) => {
	var klass = 'attribute-container ';
	if (klassList) { klass += klassList; }
	return (
		<div className={klass}>
			<div className="attribute-title">{ title }</div>
			<div className="attribute-value">{ value }</div>
		</div>
	);
}

export default ProfileAttribute;