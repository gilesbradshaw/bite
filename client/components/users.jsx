import React from "react";
import UserStore from "../stores/user-store";
import UserActions from "../actions/user-actions";
import User from "./user";

import {RouteHandler} from  "react-router";

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

export default Users;
