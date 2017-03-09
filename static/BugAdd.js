'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BugAdd = _react2.default.createClass({
	displayName: 'BugAdd',


	handleAddBugSubmit: function handleAddBugSubmit(event) {
		event.preventDefault();
		var addBugForm = document.forms.addBug;
		var bug = {
			status: addBugForm.status.value,
			priority: addBugForm.priority.value,
			owner: addBugForm.owner.value,
			title: addBugForm.title.value
		};
		this.props.onAddBug(bug);
		addBugForm.status.value = '';
		addBugForm.priority.value = '';
		addBugForm.owner.value = '';
		addBugForm.title.value = '';
	},

	render: function render() {
		console.log('BugAdd - render');
		return _react2.default.createElement(
			'div',
			null,
			_react2.default.createElement(
				'form',
				{ name: 'addBug', onSubmit: this.handleAddBugSubmit },
				_react2.default.createElement('br', null),
				'Status ',
				_react2.default.createElement('input', { name: 'status', type: 'text' }),
				_react2.default.createElement('br', null),
				'Priority ',
				_react2.default.createElement('input', { name: 'priority', type: 'text' }),
				_react2.default.createElement('br', null),
				'Owner ',
				_react2.default.createElement('input', { name: 'owner', type: 'text' }),
				_react2.default.createElement('br', null),
				'Title ',
				_react2.default.createElement('input', { name: 'title', type: 'text' }),
				_react2.default.createElement('br', null),
				_react2.default.createElement('input', { type: 'submit', value: 'Add a bug' })
			)
		);
	}
});

module.exports = BugAdd;