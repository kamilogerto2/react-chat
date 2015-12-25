'use strict';

var socket = io("http://localhost:3000");
var TextField = require('material-ui/lib/text-field');
var RaisedButton = require('material-ui/lib/raised-button');
var ConnectionPanel = require('./chat-components/connection-panel');
var GridList = require('material-ui/lib/grid-list/grid-list');

var MessageList = require('./chat-components/message-list');
var React = require('react');
var ReactDOM = require('react-dom');
var sha1 = require('sha1');

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

var Chat = React.createClass({
    getInitialState: function getInitialState() {
        return {
            liked: false, messages: [], nick: '', showDialogStandardActions: false, disButtonState: true,
            conButtonState: false
        };
    },
    renderMessage: function renderMessage(msg) {
        var messages = this.state.messages;
        var new_message = JSON.parse(msg);
        messages.push(new Date().toJSON().substring(10, 19).replace('T', ' ') + ' ' + new_message['nick'] + ': ' + new_message['message']);
        console.log(messages);
        this.setState({ messages: messages });
    },
    componentDidMount: function componentDidMount() {
        socket.on('message', this.renderMessage);
    },
    sendToChat: function sendToChat() {
        var message = JSON.stringify({ message: this.state.message, nick: this.state.nick });
        socket.emit('message', message);
        this._textInput.clearValue();
    },
    _handleInputChange: function _handleInputChange(e) {
        this.setState({ message: e.target.value });
    },
    _activeSendButton: function _activeSendButton(value) {
        this.setState({ disButtonState: value });
    },
    render: function render() {
        var _this = this;

        var messages = this.state.messages;

        return React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                { className: 'chat-window' },
                React.createElement(
                    GridList,
                    { className: 'grid-list', cols: 1, cellHeight: 200, padding: 1 },
                    React.createElement(MessageList, { messages: messages })
                )
            ),
            React.createElement(
                'div',
                { className: 'message-panel' },
                React.createElement(TextField, { hintText: 'Message', ref: function ref(component) {
                        return _this._textInput = component;
                    },
                    onChange: this._handleInputChange }),
                React.createElement(RaisedButton, { label: 'Send', disabled: this.state.disButtonState, secondary: true,
                    onClick: this.sendToChat })
            ),
            React.createElement(ConnectionPanel, { socket: socket, onSubmit: this._activeSendButton })
        );
    }
});

ReactDOM.render(React.createElement(Chat, null), document.getElementById('content'));
//# sourceMappingURL=chat-button.js.map
