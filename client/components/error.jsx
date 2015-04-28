// React
var React = require("react");

// Child Components



var Error = React.createClass({
  displayName: "Error",
  propTypes: {},
  
  
  render: function () {  
    return(
      <div>{this.props.error}</div>
      ); 
  }
});

module.exports = Error;
