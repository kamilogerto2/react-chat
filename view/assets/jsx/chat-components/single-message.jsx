var React = require('react');

var SingleMessage = React.createClass({
    render: function () {
        return (
            <div>
                <p>{this.props.message}</p>
            </div>
        )
    }
});

module.exports = SingleMessage;