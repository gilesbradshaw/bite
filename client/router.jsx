import React from 'react';
import Router, {Route, DefaultRoute, NotFoundRoute}  from "react-router";
import request from "superagent";

import App from "./components/app"
import Home from "./components/home";
import {userNav, adminNav} from "./components/nav";
import OpportunityTypes from "./components/opportunityTypes";
import OpportunityStatuses from "./components/opportunityStatuses";
import OpportunityAgentRatings from "./components/opportunityAgentRatings";
import OpportunityRatePeriods from "./components/opportunityRatePeriods";
import Agencies from "./components/agencies";
import Agents from "./components/agents";
import Profiles from "./components/profiles";
import Opportunities from "./components/opportunities";
import Tasks from "./components/tasks";
import Notes from "./components/notes";
import Emails from "./components/emails";
import Users from "./components/users";
import User from "./components/user.edit";
import Me from "./components/user.me";
import UserSignUp from "./components/user.sign.up";
import UserSignIn from "./components/user.sign.in";
import UserSignOut from "./components/user.sign.out";
import NotFound from "./components/notfound";


var getRoute=(name, pluralName, id, components)=> 
  <Route name={pluralName} handler={components.listHead} >
    <DefaultRoute name={pluralName + ".list"} handler={components.list}/>   
    <Route name={name} path={name}>
      <DefaultRoute handler={components.create} />
      <Route name={name + "-item"} path={":" + id} handler={components.head}>
        <DefaultRoute name={name + "-view"}  handler={components.view} />
        <Route name={name + "-edit"}  path="edit" handler={components.edit} />
        <Route name={name + "-delete"}  path="delete" handler={components.del} />    
      </Route>   
    </Route>
  </Route>


// Declare routes
var routes = (
  <Route handler={App} path="/">
    <DefaultRoute name="app" handler={Home} />
    <Route name="userArea" path="userArea" handler={userNav} > 
      <Route name="Agencies" path="agencies" handler={Agencies.listHead} > 
        <DefaultRoute name="Agencies.list" handler={Agencies.list}/>  
        <Route name="Agency" path="agency">
          <DefaultRoute handler={Agencies.create} />
          <Route name="Agency-item" path=":agencyId" handler={Agencies.head}>
            <DefaultRoute name="Agency-view" handler={Agencies.view} />
            <Route name="Agency-edit"  path="edit" handler={Agencies.edit} />
            <Route name="Agency-delete"  path="delete" handler={Agencies.del} />    
            <Route name="Agency-agents" path='agents'  >
              <DefaultRoute handler={Agents.list} />
              <Route name="Agency-agents-create" path='create' handler={Agents.create} />
              <Route name="Agency-agents-id" path=':agentId' handler={Agents.head}>
                <DefaultRoute name="agency-agents-view" handler={Agents.view} />
                <Route name="Agency-agents-edit" path='edit' handler={Agents.edit} />
                <Route name="Agency-agents-delete" path='delete' handler={Agents.del} />
              </Route> 
            </Route>  
          </Route>    
        </Route>
      </Route>
      <Route name="Agents" handler={Agents.listHead} >
        <DefaultRoute name= "Agents-list" handler={Agents.list}/>  
        <Route name="Agent" path="agent">
          <DefaultRoute handler={Agents.create} />
          <Route name="Agent-item" path=":agentId" handler={Agents.head}>
            <DefaultRoute name="Agent-view" handler={Agents.view} />
            <Route name="Agent-edit"  path="edit" handler={Agents.edit} />
            <Route name="Agent-delete"  path="delete" handler={Agents.del} />    
          </Route>    
        </Route>
      </Route>
    
    <Route name="Profiles" handler={Profiles.list}/>   
    <Route name="Profile" path="profile">
      <DefaultRoute handler={Profiles.create} />
      <Route name="Profile-item" path=":profileId" handler={Profiles.head}>
        <DefaultRoute name="profile-view" handler={Profiles.view} />
        <Route name="Profile-edit"  path="edit" handler={Profiles.edit} />
        <Route name="Profile-delete"  path="delete" handler={Profiles.del} />    
        <Route name="Profile-opportunities" path='opportunities'  >
          <DefaultRoute handler={Opportunities.list} />
          <Route name="Profile-opportunities-create" path='create' handler={Opportunities.create} />
          <Route name="Profile-opportunities-id" path=':opportunityId' handler={Opportunities.head}>
            <DefaultRoute name="profile-opportunities-view" handler={Opportunities.view} />
            <Route name="Profile-opportunities-edit" path='edit' handler={Opportunities.edit} />
            <Route name="Profile-opportunities-delete" path='delete' handler={Opportunities.del} />
          </Route> 
        </Route>
        <Route name="Profile-tasks" path='tasks'  >
          <DefaultRoute handler={Tasks.list} />
          <Route name="Profile-tasks-create" path='create' handler={Tasks.create} />
          <Route name="Profile-tasks-id" path=':taskId' handler={Tasks.head}>
            <DefaultRoute name="Profile-tasks-view" handler={Tasks.view} />
            <Route name="Profile-tasks-edit" path='edit' handler={Tasks.edit} />
            <Route name="Profile-tasks-delete" path='delete' handler={Tasks.del} />
          </Route> 
        </Route> 
        <Route name="Profile-notes" path='notes'  >
          <DefaultRoute handler={Notes.list} />
          <Route name="Profile-notes-create" path='create' handler={Notes.create} />
          <Route name="Profile-notes-id" path=':noteId'  handler={Notes.head} >
            <DefaultRoute name="Profile-notes-view" handler={Notes.view} />
            <Route name="Profile-notes-edit" path='edit' handler={Notes.edit} />
            <Route name="Profile-notes-delete" path='delete' handler={Notes.del} />
          </Route>
        </Route>
        <Route name="Profile-emails" path='emails'  >
          <DefaultRoute handler={Emails.list} />
          <Route name="Profile-emails-create" path='create' handler={Emails.create} />
          <Route name="Profile-emails-id" path=':emailId' handler={Emails.head}>
            <DefaultRoute name="Profile-emails-view" handler={Emails.view} />
            <Route name="Profile-emails-edit" path='edit' handler={Emails.edit} />
            <Route name="Profile-emails-delete" path='delete' handler={Emails.del} />
          </Route> 
        </Route> 
      </Route>    
    </Route> 


    <Route name="Opportunities" handler={Opportunities.list} />   
    <Route name="Opportunity" path="opportunity">
      <DefaultRoute handler={Opportunities.create} />
      <Route name="Opportunity-item" path=":opportunityId" handler={Opportunities.head}>
        <DefaultRoute name="Opportunity-view" handler={Opportunities.view} />
        <Route name="Opportunity-edit"  path="edit" handler={Opportunities.edit} />
        <Route name="Opportunity-delete"  path="delete" handler={Opportunities.del} />    
        <Route name="Opportunity-tasks" path='tasks'  >
          <DefaultRoute handler={Tasks.list} />
          <Route name="Oppportunity-tasks-create" path='create' handler={Tasks.create} />
          <Route name="Opportunity-tasks-id" path=':taskId' handler={Tasks.head}>
            <DefaultRoute name="Opportunity-tasks-view" handler={Tasks.view} />
            <Route name="Opportunity-tasks-edit" path='edit' handler={Tasks.edit} />
            <Route name="Opportunity-tasks-delete" path='delete' handler={Tasks.del} />
          </Route>
        </Route> 
        <Route name="Opportunity-notes" path='notes'  >
          <DefaultRoute handler={Notes.list} />
          <Route name="Opportunity-notes-create" path='create' handler={Notes.create} />
          <Route name="Opportunity-notes-id" path=':noteId' handler={Notes.head}>
            <DefaultRoute name="Opportunity-notes-view" handler={Notes.view} />
            <Route name="Opportunity-notes-edit" path='edit' handler={Notes.edit} />
            <Route name="Opportunity-notes-delete" path='delete' handler={Notes.del} />
          </Route>
        </Route> 
        <Route name="Opportunity-emails" path='emails'  >
          <DefaultRoute handler={Emails.list} />
          <Route name="Opportunity-emails-create" path='create' handler={Emails.create} />
          <Route name="Opportunity-emails-id" path=':emailId' handler={Emails.head}>
            <DefaultRoute name="Opportunity-emails-view" handler={Emails.view} />
            <Route name="Opportunity-emails-edit" path='edit' handler={Emails.edit} />
            <Route name="Opportunity-emails-delete" path='delete' handler={Emails.del} />
          </Route>
        </Route> 
      </Route>   
    </Route>



    {getRoute("Note", "Notes", "noteId" , Notes)}
    {getRoute("Task", "Tasks", "taskId" , Tasks)}
    {getRoute("Email", "Emails", "emailId" , Emails)}
    
    <Route name="me" path="me" handler={Me} >
        <DefaultRoute handler={Opportunities.list} />
         <Route name="me-profile-opportunities" path='opportunities'  >
          <DefaultRoute handler={Opportunities.list} />
          <Route name="me-profile-opportunities-create" path='create' handler={Opportunities.create} />
          <Route name="me-profile-opportunities-id" path=':opportunityId' handler={Opportunities.head}>
            <DefaultRoute name="me-profile-opportunities-view" handler={Opportunities.view} />
            <Route name="me-profile-opportunities-edit" path='edit' handler={Opportunities.edit} />
            <Route name="me-profile-opportunities-delete" path='delete' handler={Opportunities.del} />
          </Route>
        </Route>
    </Route>
    
</Route>
<Route name="adminArea" path="adminArea" handler={adminNav} > 

  {getRoute("OpportunityType", "OpportunityTypes", "opportunityTypeId" , OpportunityTypes)}
  {getRoute("OpportunityStatus", "OpportunityStatuses", "opportunityStatusId" , OpportunityStatuses)}
  {getRoute("OpportunityAgentRating", "OpportunityAgentRatings", "opportunityAgentRatingId" , OpportunityAgentRatings)}
  {getRoute("OpportunityRatePeriod", "OpportunityRatePeriods", "opportunityRatePeriodId" , OpportunityRatePeriods)}


    <Route name="users" handler={Users}>
      <Route name="user" path="user/:userId" handler={User} />

    </Route>
</Route>
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
