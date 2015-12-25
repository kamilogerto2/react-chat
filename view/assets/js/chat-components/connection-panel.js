'use strict';

var FlatButton = require('material-ui/lib/flat-button');
var Dialog = require('material-ui/lib/dialog');
var TextField = require('material-ui/lib/text-field');
var RaisedButton = require('material-ui/lib/raised-button');
var Snackbar = require('material-ui/lib/snackbar');
var React = require('react');
var sha1 = require('sha1');

var ConnectionPanel = React.createClass({
    getInitialState: function getInitialState() {
        return { liked: false, messages: [], nick: '', showDialogStandardActions: false, disButtonState: true,
            conButtonState: false };
    },
    connectToChat: function connectToChat() {
        if (this.props.socket.connect()) {
            this.setState({ showDialogStandardActions: true });
            this.setState({ liked: 1, disButtonState: false, conButtonState: true });
            this.props.onSubmit(false);
        } else {
            this._snackBar.show();
        }
    },
    disconnectFromChat: function disconnectFromChat() {
        this.props.socket.disconnect();
        this.setState({ liked: 0, disButtonState: true, conButtonState: false });
        this.props.onSubmit(true);
    },
    _handleCustomDialogCancel: function _handleCustomDialogCancel() {
        this.setState({ showDialogStandardActions: false });
    },
    _handleCustomDialogSubmit: function _handleCustomDialogSubmit() {
        this.setState({ showDialogStandardActions: false });
        var message = JSON.stringify({ login: this._userInput.getValue(), password: sha1(this._passwordInput.getValue()) });
        this.props.socket.emit('login', message);
    },
    render: function render() {
        var _this = this;

        var customActions = [React.createElement(FlatButton, {
            label: 'Cancel',
            secondary: true,
            onTouchTap: this._handleCustomDialogCancel }), React.createElement(FlatButton, {
            label: 'Submit',
            primary: true,
            onTouchTap: this._handleCustomDialogSubmit })];
        return React.createElement(
            'div',
            { className: 'buttons-panel' },
            React.createElement(RaisedButton, { label: 'Disconnect', disabled: this.state.disButtonState, secondary: true, onClick: this.disconnectFromChat }),
            React.createElement(RaisedButton, { label: 'Connect', disabled: this.state.conButtonState, secondary: true, onClick: this.connectToChat }),
            React.createElement(
                Dialog,
                {
                    ref: function ref(component) {
                        return _this._loginDialog = component;
                    },
                    title: 'Log into chat',
                    actions: customActions,
                    open: this.state.showDialogStandardActions,
                    onRequestClose: this._handleRequestClose },
                React.createElement(TextField, { hintText: 'Username', floatingLabelText: 'Username', ref: function ref(component) {
                        return _this._userInput = component;
                    } }),
                React.createElement(TextField, { hintText: 'Password', type: 'password', floatingLabelText: 'Password', ref: function ref(component) {
                        return _this._passwordInput = component;
                    } })
            ),
            React.createElement(Snackbar, {
                ref: function ref(component) {
                    return _this._snackBar = component;
                },
                message: 'Something went wrong.',
                action: 'undo',
                autoHideDuration: 2000 })
        );
    }
});

module.exports = ConnectionPanel;
//# sourceMappingURL=connection-panel.js.map
