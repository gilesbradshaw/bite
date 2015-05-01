import React from "react";

import  {RouteHandler} from "react-router";
import FormInput from "./formInput";


// Component
var Home = React.createClass({
  displayName: "Home",
  propTypes: {},
  mixins: [],

  getInitialState: function () { return null; },

  componentWillMount: function () {},

  componentWillUnmount: function () {},

  render: function () {
    return (
      <div>
        <p>
          home rendered
        </p>
        <RouteHandler />
      </div>
    );
  }
});

export default Home;
