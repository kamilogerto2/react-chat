'use strict';

var SingleMessage = require('./single-message');
var React = require('react');

var MessageList = React.createClass({
    render: function render() {
        var messages = this.props.messages;
        return React.createElement(
            'div',
            null,
            messages.map(function (message) {
                return React.createElement(SingleMessage, {
                    message: message
                });
            })
        );
    }
});

module.exports = MessageList;
//# sourceMappingURL=message-list.js.map
