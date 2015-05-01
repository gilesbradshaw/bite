import React from 'react';
import Router, {Route, DefaultRoute, NotFoundRoute}  from "react-router";
import request from "superagent";

import App from "./components/app"
import Home from "./components/home";
import Agencies from "./components/agencies";
import Agents from "./components/agents";
import Profiles from "./components/profiles";
import Opportunities from "./components/opportunities";
import Users from "./components/users";
import User from "./components/user.edit";
import Me from "./components/user.me";
import UserSignUp from "./components/user.sign.up";
import UserSignIn from "./components/user.sign.in";
import UserSignOut from "./components/user.sign.out";
import NotFound from "./components/notfound";


// Declare routes
var routes = (
  <Route handler={App} path="/">
    <DefaultRoute name="app" handler={Home} />
    <Route name="agencies" handler={Agencies.list} />
    <Route name="agency" path="agency/:agencyId" handler={Agencies.view} >
      <Route name="agency-agents" path='agents' handler={Agents.list} >
        <Route name="agency-agents-create" path='create' handler={Agents.create} />
        <Route name="agency-agents-view" path='view/:agentId' handler={Agents.view} />
        <Route name="agency-agents-edit" path='edit/:agentId' handler={Agents.edit} />
        <Route name="agency-agents-delete" path='delete/:agentId' handler={Agents.del} />
      </Route>    
    </Route>
    <Route name="agency-create" handler={Agencies.create} />
    <Route name="agency-edit"  path="agency-edit/:agencyId" handler={Agencies.edit} />
    <Route name="agency-delete"  path="agency-delete/:agencyId" handler={Agencies.del} />
    
    <Route name="agents" handler={Agents.list} />
    <Route name="agent" path="agent/:agentId" handler={Agents.view} />
    <Route name="agent-create" handler={Agents.create} />
    <Route name="agent-edit"  path="agent-edit/:agentId" handler={Agents.edit} />
    <Route name="agent-delete"  path="agent-delete/:agentId" handler={Agents.del} />

    <Route name="profiles" handler={Profiles.list} />
    <Route name="profile" path="profile/:profileId" handler={Profiles.view} >
      <Route name="profile-opportunities" path='opportunities' handler={Opportunities.list} >
        <Route name="profile-opportunities-create" path='create' handler={Opportunities.create} />
        <Route name="profile-opportunities-view" path='view/:opportunityId' handler={Opportunities.view} />
        <Route name="profile-opportunities-edit" path='edit/:opportunityId' handler={Opportunities.edit} />
        <Route name="profile-opportunities-delete" path='delete/:opportunityId' handler={Opportunities.del} />
      </Route>
    </Route>
    <Route name="profile-create" handler={Profiles.create} />
    <Route name="profile-edit"  path="profile-edit/:profileId" handler={Profiles.edit} />
    <Route name="profile-delete"  path="profile-delete/:profileId" handler={Profiles.del} />

    <Route name="opportunities" handler={Opportunities.list} />
    <Route name="opportunity" path="opportunity/:opportunityId" handler={Opportunities.view} />
    <Route name="opportunity-create" handler={Opportunities.create} />
    <Route name="opportunity-edit"  path="opportunity-edit/:opportunityId" handler={Opportunities.edit} />
    <Route name="opportunity-delete"  path="opportunity-delete/:opportunityId" handler={Opportunities.del} />


    <Route name="users" handler={Users}>
      <Route name="user" path="user/:userId" handler={User} />

    </Route>
    <Route name="me" path="me" handler={Me} props={{userId:'hey'}} />
    <Route name="signup" handler={UserSignUp} />
    <Route name="signin" handler={UserSignIn} />
    <Route name="signout" handler={UserSignOut} />
    <NotFoundRoute handler={NotFound} />
  </Route>
);

export default {
  run: (el)=> {
    Router.run(routes, function (Handler, state) {
          // "Alternatively, you can pass the param data down..."
          // https://github.com/rackt/react-router/blob/master/docs/guides/
          // overview.md#dynamic-segments
          var params = state.params;
          React.render(<Handler params={params} />, el);
        });
   
  }
};
