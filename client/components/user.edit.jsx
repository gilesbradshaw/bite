import React from "react";

import {RouteHandler} from "react-router";

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

export default User;
