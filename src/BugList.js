import React from 'react';
import BugFilter from './BugFilter';
import BugAdd from './BugAdd';
import $ from 'jquery';

/* 
 Here we could have passed directly {mybugs} instead of {this.props.bugs}
*/
var BugList = React.createClass({
	getInitialState : function(){
		return {bugs : []};
	},

	componentDidMount : function(){
		this.loadData({});
	},

	loadData : function(filter){
		console.log('query',filter);
		$.ajax({
			url:'/api/bugs',
			data:filter,
			method:'GET'
		})
		.done((data) => {
			this.setState({bugs:data});
			console.log('Number of Bugs received',Object.keys(data).length);
		})
		.fail((jqxhr) => {
			console.log('error : ' + jqxhr);
		})
	},

	addBug : function(bug){
		$.ajax({
			url:'/api/bugs',
			method: 'POST',
			data:bug
		})
		.done((data) => {
			console.log('bug received from API: ' + data);
			let bugs = this.state.bugs.slice();	
			bugs.push(data);
			this.setState({bugs: bugs});
		})
		.fail((jqxhr) => {
			console.log('error : ' + jqxhr);
		})	
	},

	render: function(){
		console.log('BugList - render');
		return (
			<div className="bugList">
				<h1>Quiet some bugs Nicolas, don't you think?</h1>				
				<BugFilter handleFilterParent={this.loadData}/>
				<BugTable bugs={this.state.bugs} />
				<BugAdd onAddBug={this.addBug} />
			</div>
		);
	}
});

var BugTable = React.createClass({
	render: function(){
		console.log('BugTable - render');
		console.log('BugTable - all bugs :' + JSON.stringify(this.props.bugs));
		let bugs = this.props.bugs.map((bug) => 
				<BugRow key={bug._id} bug={bug} />			
		);

		return (
			<table>
				<thead>
					<tr>
						<th>id</th>
						<th>status</th>
						<th>priority</th>
						<th>owner</th>
						<th>title</th>
					</tr>					
				</thead>
				<tbody>				
					{bugs}
				</tbody>
			</table>
		);
	}
});

var BugRow = React.createClass({
	render: function(){
		console.log('BugRow - render');
		return(
			<tr>
				<td>{this.props.bug._id}</td>
				<td>{this.props.bug.status}</td>
				<td>{this.props.bug.priority}</td>
				<td>{this.props.bug.owner}</td>
				<td>{this.props.bug.title}</td>
			</tr>
		);
	}
});

module.exports = {BugList,BugTable,BugRow};