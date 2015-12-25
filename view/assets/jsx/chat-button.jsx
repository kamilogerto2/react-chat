var socket = io("http://localhost:3000");
const TextField = require('material-ui/lib/text-field');
const RaisedButton = require('material-ui/lib/raised-button');
const ConnectionPanel = require('./chat-components/connection-panel');
const GridList = require('material-ui/lib/grid-list/grid-list');

const MessageList = require('./chat-components/message-list');
var React = require('react');
var ReactDOM = require('react-dom');
var sha1 = require('sha1');

let injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

var Chat = React.createClass({
    getInitialState () {
        return {
            liked: false, messages: [], nick: '', showDialogStandardActions: false, disButtonState: true,
            conButtonState: false
        };
    },
    renderMessage (msg) {
        let messages = this.state.messages;
        let new_message = JSON.parse(msg);
        messages.push(new Date().toJSON().substring(10, 19).replace('T', ' ') + ' ' + new_message['nick'] + ': ' + new_message['message']);
        console.log(messages);
        this.setState({messages: messages})
    },
    componentDidMount() {
        socket.on('message', this.renderMessage);
    },
    sendToChat () {
        let message = JSON.stringify({message: this.state.message, nick: this.state.nick});
        socket.emit('message', message);
        this._textInput.clearValue();
    },
    _handleInputChange (e) {
        this.setState({message: e.target.value});
    },
    _activeSendButton (value) {
        this.setState({disButtonState: value});
    },
    render () {
        let messages = this.state.messages;

        return (
            <div>
                <div className="chat-window">
                    <GridList className='grid-list' cols={1} cellHeight={200} padding={1}>
                        <MessageList messages={messages}/>
                    </GridList>
                </div>
                <div className="message-panel">
                    <TextField hintText="Message" ref={component => this._textInput = component}
                               onChange={this._handleInputChange}/>
                    <RaisedButton label="Send" disabled={this.state.disButtonState} secondary={true}
                                  onClick={this.sendToChat}/>
                </div>
                <ConnectionPanel socket={socket} onSubmit={this._activeSendButton}/>
            </div>
        );
    }
});


ReactDOM.render(
    <Chat />,
    document.getElementById('content')
);