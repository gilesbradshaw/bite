import React from "react";

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

export default Error;
