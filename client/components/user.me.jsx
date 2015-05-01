import React from "react";
import UserStore from "../stores/user-current-store";

import {RouteHandler} from  "react-router";

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

export default User;
