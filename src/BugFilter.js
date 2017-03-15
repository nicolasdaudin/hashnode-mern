import React from 'react';

var BugFilter = React.createClass({
	getInitialState : function() {
		return {priority:'',status:''};
	},
	handleFilter: function(){
		this.props.handleFilterParent(
			{
				priority:this.state.priority,
				status:this.state.status
			});
	},

	handlePriorityChange: function(e){
		this.setState({priority: e.target.value});
	},

	handleStatusChange: function(e){
		this.setState({status: e.target.value});
	},

	render: function(){
		console.log('BugFilter - render');
		return(
				<div>
					Status: <select value={this.state.status} onChange={this.handleStatusChange}>
					    <option value="">...</option>
					    <option value="open">open</option>
					    <option value="closed">closed</option>
					    <option value="new"> new</option>
					</select>
					<br/>
					Priority: <select value={this.state.priority} onChange={this.handlePriorityChange}>
					    <option value="">...</option>
					    <option value="low">low</option>
					    <option value="high">high</option>
					    <option value="P2">P2</option>
					</select>
					<button onClick={this.handleFilter}>Apply</button>
				</div>
		);
	}
});

module.exports = BugFilter;