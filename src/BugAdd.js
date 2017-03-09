import React from 'react';

var BugAdd = React.createClass({

	handleAddBugSubmit: function(event){
		event.preventDefault();
		var addBugForm = document.forms.addBug;
		var bug = {
			status : addBugForm.status.value,
			priority : addBugForm.priority.value,
			owner : addBugForm.owner.value,
			title : addBugForm.title.value
		};
		this.props.onAddBug(bug);
		addBugForm.status.value='';
		addBugForm.priority.value='';
		addBugForm.owner.value='';
		addBugForm.title.value='';
	},

	render: function(){
		console.log('BugAdd - render');
		return(
			<div>
				<form name="addBug" onSubmit={this.handleAddBugSubmit}>
					<br />
					Status <input name="status" type="text" />
					<br />
					Priority <input name="priority" type="text" />
					<br />
					Owner <input name="owner" type="text" />
					<br />
					Title <input name="title" type="text" />
					<br />
					<input type="submit" value="Add a bug" />
				</form>
			</div>
		);
	}
});

module.exports = BugAdd;