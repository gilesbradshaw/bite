// React
var React = require("react");

// Router
var Router = require("react-router");
var RouteHandler = Router.RouteHandler;

// Component
var User = React.createClass({
  displayName: "User",
  propTypes: {},
  mixins: [],

  getInitialState: function () { return null; },

  componentWillMount: function () {},

  componentWillUnmount: function () {},

  render: function () {
    return (
      <div className="user">{this.props.user.get('lastName')}
      </div>
    );
  }
});

module.exports = User;
