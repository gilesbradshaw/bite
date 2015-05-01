import React from "react";

import {RouteHandler} from  "react-router";

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

export default  User;
