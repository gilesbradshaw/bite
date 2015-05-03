import React from "react";

import {Link} from "react-router";

// Component
var Nav = React.createClass({
  displayName: "Nav",
  propTypes: {},
  mixins: [],

  getInitialState: function () { return null; },

  componentWillMount: function () {},

  componentWillUnmount: function () {},

  render: function () {
    return (
      <div>
        <span className="navLink"><Link to="app">Home</Link> </span>

        <span className="navLink"><Link to="opportunityTypes">OpportunityTypes</Link></span>
        <span className="navLink"><Link to="opportunityType-create">Create</Link></span>

        <span className="navLink"><Link to="agencies">Agencies</Link></span>
        <span className="navLink"><Link to="agency">Create</Link></span>

        <span className="navLink"><Link to="agents">Agents</Link></span>
        <span className="navLink"><Link to="agent">Create</Link></span>

        <span className="navLink"><Link to="profiles">Profiles</Link></span>
        <span className="navLink"><Link to="profile">Create</Link></span>

        <span className="navLink"><Link to="opportunities">Opportunities</Link></span>
        <span className="navLink"><Link to="opportunity">Create</Link></span>

        <span className="navLink"><Link to="notes">Notes</Link></span>
        <span className="navLink"><Link to="note">Create</Link></span>

        <span className="navLink"><Link to="tasks">Tasks</Link></span>
        <span className="navLink"><Link to="task">Create</Link></span>

        <span className="navLink"><Link to="emails">Emails</Link></span>
        <span className="navLink"><Link to="email">Create</Link></span>

        <span className="navLink"><Link to="users">Users</Link></span>
        <span className="navLink"><Link to="me">Me</Link></span>
        <span className="navLink"><Link to="signup">Sign up</Link></span>
        <span className="navLink"><Link to="signin">Sign in</Link></span>
      </div>
    );
  }
});

export default Nav;

// Note {...this.props}, see:
// http://facebook.github.io/react/docs/jsx-spread.html
// https://github.com/rackt/react-router/blob/master/docs/guides/overview.md#dynamic-segments
