import React from "react";

// Child Components



var Error = React.createClass({
  displayName: "Error",
  propTypes: {},
  
  
  render() {  
    return(
      <div>{this.props.error}</div>
      ); 
  }
});

export default Error;
