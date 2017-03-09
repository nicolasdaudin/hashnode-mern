'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.BugRow = exports.BugTable = exports.BugList = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _BugFilter = require('./BugFilter');

var _BugFilter2 = _interopRequireDefault(_BugFilter);

var _BugAdd = require('./BugAdd');

var _BugAdd2 = _interopRequireDefault(_BugAdd);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* 
 Here we could have passed directly {mybugs} instead of {this.props.bugs}
*/
var BugList = _react2.default.createClass({
	displayName: 'BugList',

	getInitialState: function getInitialState() {
		return { bugs: [] };
	},

	componentDidMount: function componentDidMount() {
		var _this = this;

		$.ajax({
			url: '/api/bugs',
			method: 'GET'
		}).done(function (data) {
			_this.setState({ bugs: data });
		}).error(function (jqxhr) {
			console.log('error : ' + jqxhr);
		});
	},

	addBug: function addBug(bug) {
		var _this2 = this;

		$.ajax({
			url: '/api/bugs',
			method: 'POST',
			data: bug
		}).done(function (data) {
			console.log('bug received from API: ' + data);
			var bugs = _this2.state.bugs.slice();
			bugs.push(data);
			_this2.setState({ bugs: bugs });
		}).error(function (jqxhr) {
			console.log('error : ' + jqxhr);
		});
	},

	render: function render() {
		console.log('BugList - render');
		return _react2.default.createElement(
			'div',
			{ className: 'bugList' },
			_react2.default.createElement(
				'h1',
				null,
				'Quiet some bugs Nicolas, don\'t you think?'
			),
			_react2.default.createElement(_BugFilter2.default, null),
			_react2.default.createElement(BugTable, { bugs: this.state.bugs }),
			_react2.default.createElement(_BugAdd2.default, { onAddBug: this.addBug })
		);
	}
});

var BugTable = _react2.default.createClass({
	displayName: 'BugTable',

	render: function render() {
		console.log('BugTable - render');
		console.log('BugTable - all bugs :' + JSON.stringify(this.props.bugs));
		var bugs = this.props.bugs.map(function (bug) {
			return _react2.default.createElement(BugRow, { key: bug._id, bug: bug });
		});

		return _react2.default.createElement(
			'table',
			null,
			_react2.default.createElement(
				'thead',
				null,
				_react2.default.createElement(
					'tr',
					null,
					_react2.default.createElement(
						'th',
						null,
						'id'
					),
					_react2.default.createElement(
						'th',
						null,
						'status'
					),
					_react2.default.createElement(
						'th',
						null,
						'priority'
					),
					_react2.default.createElement(
						'th',
						null,
						'owner'
					),
					_react2.default.createElement(
						'th',
						null,
						'title'
					)
				)
			),
			_react2.default.createElement(
				'tbody',
				null,
				bugs
			)
		);
	}
});

var BugRow = _react2.default.createClass({
	displayName: 'BugRow',

	render: function render() {
		console.log('BugRow - renokokokder');
		return _react2.default.createElement(
			'tr',
			null,
			_react2.default.createElement(
				'td',
				null,
				this.props.bug._id
			),
			_react2.default.createElement(
				'td',
				null,
				this.props.bug.status
			),
			_react2.default.createElement(
				'td',
				null,
				this.props.bug.priority
			),
			_react2.default.createElement(
				'td',
				null,
				this.props.bug.owner
			),
			_react2.default.createElement(
				'td',
				null,
				this.props.bug.title
			)
		);
	}
});

exports.BugList = BugList;
exports.BugTable = BugTable;
exports.BugRow = BugRow;