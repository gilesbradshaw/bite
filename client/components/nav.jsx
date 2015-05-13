import React from "react";

import {RouteHandler, Link} from "react-router";
import UserLoggedIn from "./user.LoggedIn";
import {PathDisplay} from "./path-display";

export default class Nav extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
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
}
Nav.displayName = "Nav";


export class UserNav extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <span className="navLink"><Link to="Agency-list">Agencies</Link></span>
        <span className="navLink"><Link to="Agent-list">Agents</Link></span>
        <span className="navLink"><Link to="Opportunity-list">Opportunities</Link></span>
        <span className="navLink"><Link to="Note-list">Notes</Link></span>
        <span className="navLink"><Link to="Task-list">Tasks</Link></span>
        <span className="navLink"><Link to="Email-list">Emails</Link></span>
        <span className="navLink"><Link to="me">Me</Link></span>
        <RouteHandler {...this.props} />
       </div>
    );
  }
}
UserNav.displayName = "UserNav";

export class AdminNav extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <span className="navLink"><Link to="Profile-list">Profiles</Link></span>
        <span className="navLink"><Link to="OpportunityType-list">OpportunityTypes</Link></span>
        <span className="navLink"><Link to="OpportunityStatus-list">OpportunityStatuses</Link></span>
        <span className="navLink"><Link to="OpportunityAgentRating-list">OpportunityAgentRatings</Link></span>
        <span className="navLink"><Link to="OpportunityRatePeriod-list">OpportunityRatePeriods</Link></span>
        <RouteHandler {...this.props} />
       </div>
    );
  }
}
AdminNav.displayName = "AdminNav";

// Note {...this.props}, see:
// http://facebook.github.io/react/docs/jsx-spread.html
// https://github.com/rackt/react-router/blob/master/docs/guides/overview.md#dynamic-segments
