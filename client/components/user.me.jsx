// React
var React = require("react");
var UserStore = require("../stores/user-current-store");

// Router
var Router = require("react-router");
var RouteHandler = Router.RouteHandler;

function getState() {
  return {user:UserStore.getCurrentUser()};
}
// Component
var User = React.createClass({
  displayName: "UserEdit",
  propTypes: {},
  mixins: [],

  getInitialState: function () { return getState() },

  componentWillMount: function () {},

  componentWillUnmount: function () {},

  render: function () {
    
      if(this.state.user)
      {
        return (
        <div className="user"> {this.state.user.get('displayName')}
          <RouteHandler {...this.props}/>
        </div>
        );
      }
      else
      {
        return (
          <div className="user">No user logged in...</div>
        );
      }
    
  }
});

module.exports = User;
