'use strict';

var React = require('react');

var SingleMessage = React.createClass({
    render: function render() {
        return React.createElement(
            'div',
            null,
            React.createElement(
                'p',
                null,
                this.props.message
            )
        );
    }
});

module.exports = SingleMessage;
//# sourceMappingURL=single-message.js.map
