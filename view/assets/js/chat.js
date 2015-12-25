'use strict';

var socket = io.connect("http://localhost:3000");

var CommentBox = React.createClass({ displayName: 'CommentBox',
  render: function render() {
    return React.createElement('div', { className: "commentBox" }, "Hello, world! I am a CommentBox.");
  }
});
ReactDOM.render(React.createElement(CommentBox, null), document.getElementById('content'));
//# sourceMappingURL=chat.js.map
