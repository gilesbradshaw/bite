// React
var React = require("react");

// Router
var Router = require("react-router");
var RouteHandler = Router.RouteHandler;

// Component
var User = React.createClass({
  displayName: "UserEdit",
  propTypes: {},
  mixins: [],

  getInitialState: function () { return null; },

  componentWillMount: function () {},

  componentWillUnmount: function () {},

  render: function () {
    return (
      <div className="user">yabbadabadooo! {this.props.params.userId}
        <RouteHandler {...this.props}/>
      </div>
    );
  }
});

module.exports = User;
