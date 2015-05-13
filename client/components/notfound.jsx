// React
import React from "react";

// Component
var NotFound = React.createClass({
  displayName: "404",
  propTypes: {},
  mixins: [],

  getInitialState() { return null; },

  componentWillMount() {},

  componentWillUnmount() {},

  render: function () {
    return (
      <p>
        Page not found
      </p>
    );
  }
});

export default NotFound;
