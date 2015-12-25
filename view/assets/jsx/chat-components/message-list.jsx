const SingleMessage = require('./single-message');
var React = require('react');


var MessageList = React.createClass({
    render: function () {
        let messages = this.props.messages;
        return (<div>
                {messages.map(message => {
                    return (
                        <SingleMessage
                            message={message}
                        />
                    )}

                )}
            </div>

        )
    }
});

module.exports = MessageList;