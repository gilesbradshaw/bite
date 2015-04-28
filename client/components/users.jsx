// React
var React = require("react");
var UserStore = require("../stores/user-store");
var UserActions = require("../actions/user-actions");
var User = require("./user");

// Router
var Router = require("react-router");
var RouteHandler = Router.RouteHandler;

// Component
function getState() {
  return {
    store: UserStore.getUsers()
  };
}

var Users = React.createClass({
  displayName: "Users",
  mixins: [UserStore.mixin],

  getInitialState: function () {
    return getState();
  },

  componentWillMount: function () {
    UserActions.loadUsers();
  },

  componentWillUnmount: function () {},

  createUserNodes: function () {
    var nodes = this.state.store.toArray().map(function (user) {
      return (
        <User user={user} key={user.get('_id')} />
      );
    });
    return nodes;
  },

  storeDidChange: function () {
    this.setState(getState());
  },

  render: function () {
    var userNodes = this.createUserNodes();

    return (
      <div className="Users">
        <p className="Users-title">User Bank:</p>
        {userNodes}
        <RouteHandler {...this.props} />
      </div>
    );
  }
});

module.exports = Users;
