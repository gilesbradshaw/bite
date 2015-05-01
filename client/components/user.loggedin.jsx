import React from "react";
import UserStore from "../stores/user-current-store";
import UserActions from "../actions/user-actions";

// Router
import {RouteHandler, Link} from "react-router";


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
          <span className="navLink"><Link to="me">{this.state.user.get('displayName')}</Link></span>
          <span className="navLink"><Link to="signout">sign out</Link></span>
        </div>
      );
    }else
    {
      return (
        <span className="navLink"><Link to="signin">Sign in</Link></span>
      );
    }
  }
});

export default UserLoggedIn;
