// React
import React from "react";

// Router
import Router from "react-router";

var RouteHandler = Router.RouteHandler;

// Child Components
import Nav from "./nav";

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
        <RouteHandler {...this.props} />
      </div>
    );
  }
});

export default App;
