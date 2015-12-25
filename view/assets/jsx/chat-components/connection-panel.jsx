const FlatButton = require('material-ui/lib/flat-button');
const Dialog = require('material-ui/lib/dialog');
const TextField = require('material-ui/lib/text-field');
const RaisedButton = require('material-ui/lib/raised-button');
var React = require('react');
var sha1 = require('sha1');


var ConnectionPanel = React.createClass({
    getInitialState () {
        return {liked: false, messages: [], nick: '', showDialogStandardActions: false, disButtonState: true,
            conButtonState: false};
    },
    connectToChat () {
        this.props.socket.connect();
        if(this.props.socket.connected) {
            this.setState({showDialogStandardActions: true});
            this.setState({liked: 1, disButtonState: false, conButtonState: true});
            this.props.onSubmit();
        }
    },
    disconnectFromChat () {
        this.props.socket.disconnect();
        this.setState({liked: 0});
    },
    _handleCustomDialogCancel () {
        this.setState({showDialogStandardActions: false});
    },
    _handleCustomDialogSubmit () {
        this.setState({showDialogStandardActions: false});
        let message = JSON.stringify({login: this._userInput.getValue(), password: sha1(this._passwordInput.getValue())});
        this.props.socket.emit('login', message);
    },
    render () {
        let customActions = [
            <FlatButton
                label="Cancel"
                secondary={true}
                onTouchTap={this._handleCustomDialogCancel} />,
            <FlatButton
                label="Submit"
                primary={true}
                onTouchTap={this._handleCustomDialogSubmit} />
        ];
        return (
            <div className="buttons-panel">
                <RaisedButton label="Disconnect" disabled={this.state.disButtonState} secondary={true} onClick={this.disconnectFromChat}/>
                <RaisedButton label="Connect" disabled={this.state.conButtonState} secondary={true} onClick={this.connectToChat}/>
                <Dialog
                    ref={component => this._loginDialog = component}
                    title="Log into chat"
                    actions={customActions}
                    open={this.state.showDialogStandardActions}
                    onRequestClose={this._handleRequestClose}>
                    <TextField hintText="Username" floatingLabelText="Username" ref={component => this._userInput = component}/>
                    <TextField hintText="Password" type="password" floatingLabelText="Password" ref={component => this._passwordInput = component}/>
                </Dialog>
            </div>
        )
    }
})

module.exports = ConnectionPanel;