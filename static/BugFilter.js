'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BugFilter = _react2.default.createClass({
	displayName: 'BugFilter',

	render: function render() {
		console.log('BugFilter - render');
		return _react2.default.createElement(
			'div',
			null,
			'This is the filter'
		);
	}
});

module.exports = BugFilter;