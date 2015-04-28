// React
var React = require("react");
var UserStore = require("../stores/user-current-store");
var UserActions = require("../actions/user-actions");

// Router
var Router = require("react-router");
var RouteHandler = Router.RouteHandler;


// Component
function getState() {
  return {user:UserStore.getCurrentUser()};
}

function signOut() {
  UserActions.signOut();
}


var UserLoggedIn= React.createClass({
  displayName: "UserLoggedIn",
  propTypes: {},
  mixins: [UserStore.mixin],

  getInitialState: function () {
    
    // Create the blank user in the store to edit
    // this will create an empty record if they leave
    return getState();
  },

  componentWillMount: function () {},

  componentWillUnmount: function () {
   
  },

  storeDidChange: function () {
    this.setState(getState());
  },

 

  render: function () {   
    if(this.state.user)
    {
      return (
        <div>
          <span className="navLink"><Router.Link to="me">{this.state.user.get('displayName')}</Router.Link></span>
          <span className="navLink"><Router.Link to="signout">sign out</Router.Link></span>
        </div>
      );
    }else
    {
      return (
        <span className="navLink"><Router.Link to="signin">Sign in</Router.Link></span>
      );
    }
  }
});

module.exports = UserLoggedIn;
