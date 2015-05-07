import React from "react";
import  {Navigation,State,Link} from "react-router";

// Child Components



var Silly = React.createClass({
	mixins: [
		Navigation
	],
  displayName: "Silly",
  propTypes: {},
  render: function () {  
  	var currentRoutes = this.context.router.getCurrentRoutes();
	var lastRoute = currentRoutes[currentRoutes.length - 1];
	console.log(lastRoute.name);
	var params = this.context.router.getCurrentParams();
    return <script/>
    return(
      <div>
      	<span><Link to="Opportunity-Task-list" params={params} >Tasks</Link></span>
      	<span><Link to="Opportunity-Note-list" params={params} >Notes</Link></span>
      	<span><Link to="Opportunity-Email-list" params={params} >Emails</Link></span>
      	{this.props.children}
      </div>
      ); 
  }
});

var Billy = React.createClass({
  mixins: [
    Navigation
  ],
  displayName: "Billy",
  propTypes: {},
  render: function () {  
    return(
      <div>I am a silly billy!</div>
      ); 
  }
});


export default Silly;
export {Billy};