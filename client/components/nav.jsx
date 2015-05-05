import React from "react";

import {RouteHandler, Link} from "react-router";
import UserLoggedIn from "./user.LoggedIn";


// Component
var Nav = React.createClass({
  displayName: "Nav",
  render: function () {
    return (
      <div>
        <span className="navLink"><Link to="app">Home</Link> </span>
        <span className="navLink"><Link to="userArea">Main</Link></span>
        <span className="navLink"><Link to="adminArea">Admin</Link></span>
        <span className="navLink"><Link to="signup">Sign up</Link></span>
        <span className="navLink"><Link to="signin">Sign in</Link></span>
        <UserLoggedIn/>
      </div>
    );
  }
});

export default Nav;

var userNav = React.createClass({
  displayName: "userNav",
  render: function () {
    return (
      <div>
        <span className="navLink"><Link to="Agencies">Agencies</Link></span>
        <span className="navLink"><Link to="Agents">Agents</Link></span>
        <span className="navLink"><Link to="Opportunities">Opportunities</Link></span>
        <span className="navLink"><Link to="Notes">Notes</Link></span>
        <span className="navLink"><Link to="Tasks">Tasks</Link></span>
        <span className="navLink"><Link to="Emails">Emails</Link></span>
        <span className="navLink"><Link to="me">Me</Link></span>
        <RouteHandler {...this.props} />
       </div>
    );
  }
});

export {userNav as userNav};

var adminNav = React.createClass({
  displayName: "adminNav",
  render: function () {
    return (
      <div>
        <span className="navLink"><Link to="OpportunityTypes">OpportunityTypes</Link></span>
        <span className="navLink"><Link to="OpportunityStatuses">OpportunityStatuses</Link></span>
        <span className="navLink"><Link to="OpportunityAgentRatings">OpportunityAgentRatings</Link></span>
        <span className="navLink"><Link to="OpportunityRatePeriods">OpportunityRatePeriods</Link></span>
        <RouteHandler {...this.props} />
       </div>
    );
  }
});

export {adminNav as adminNav};


// Note {...this.props}, see:
// http://facebook.github.io/react/docs/jsx-spread.html
// https://github.com/rackt/react-router/blob/master/docs/guides/overview.md#dynamic-segments
