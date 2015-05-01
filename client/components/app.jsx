// React
import React from "react";

// Router
import Router from "react-router";

var RouteHandler = Router.RouteHandler;

// Child Components
import Nav from "./nav";
import UserLoggedIn from "./user.LoggedIn";

// Component
var App = React.createClass({
  displayName: "App",
  propTypes: {},
  mixins: [],

  getInitialState: function () { return null; },

  componentWillMount: function () {},

  componentWillUnmount: function () {},

  render: function () {
    return (
      <div className="epicureContainer">
        <Nav />
        <UserLoggedIn/>
        <RouteHandler {...this.props} />
      </div>
    );
  }
});

export default App;
