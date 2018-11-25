import React from 'react';

const MembersDropdown = ({ members, onMemberChange }) => {
	const options = [];
	for (var key in members) {
		if (members.hasOwnProperty(key))
		options.push(
			<option
				key={members[key].id}
				value={members[key].id}
			>
				{members[key].name}
			</option>
		)
	}
	return (
		<select onChange={onMemberChange}>
		  { options }
		</select>
	);
}

export default MembersDropdown;