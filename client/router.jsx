import React from 'react';
import Router, {Route, DefaultRoute, NotFoundRoute}  from "react-router";
import request from "superagent";

import App from "./components/app"
import Home from "./components/home";
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





// Declare routes
var routes = (
  <Route handler={App} path="/">
    <DefaultRoute name="app" handler={Home} />
   
    <Route name="agencies" handler={Agencies.list} />   
    <Route name="agency" path="agency">
      <DefaultRoute handler={Agencies.create} />
      <Route name="agency-item" path=":agencyId" handler={Agencies.head}>
        <DefaultRoute name="agency-view" handler={Agencies.view} />
        <Route name="agency-edit"  path="edit" handler={Agencies.edit} />
        <Route name="agency-delete"  path="delete" handler={Agencies.del} />    
        <Route name="agency-agents" path='agents'  >
          <DefaultRoute handler={Agents.list} />
          <Route name="agency-agents-create" path='create' handler={Agents.create} />
          <Route name="agency-agents-id" path=':agentId' handler={Agents.head}>
            <DefaultRoute name="agency-agents-view" handler={Agents.view} />
            <Route name="agency-agents-edit" path='edit' handler={Agents.edit} />
            <Route name="agency-agents-delete" path='delete' handler={Agents.del} />
          </Route> 
        </Route>  
      </Route>    
    </Route>
    

  <Route name="agents" handler={Agents.list} />   
    <Route name="agent" path="agent">
      <DefaultRoute handler={Agents.create} />
      <Route name="agent-item" path=":agentId">
        <DefaultRoute name="agent-view" handler={Agents.view} />
        <Route name="agent-edit"  path="edit" handler={Agents.edit} />
        <Route name="agent-delete"  path="delete" handler={Agents.del} />    
      </Route>    
    </Route>


    <Route name="profiles" handler={Profiles.list} />   
    <Route name="profile" path="profile">
      <DefaultRoute handler={Profiles.create} />
      <Route name="profile-item" path=":profileId" handler={Profiles.head}>
        <DefaultRoute name="profile-view" handler={Profiles.view} />
        <Route name="profile-edit"  path="edit" handler={Profiles.edit} />
        <Route name="profile-delete"  path="delete" handler={Profiles.del} />    
        <Route name="profile-opportunities" path='opportunities'  >
          <DefaultRoute handler={Opportunities.list} />
          <Route name="profile-opportunities-create" path='create' handler={Opportunities.create} />
          <Route name="profile-opportunities-id" path=':opportunityId' handler={Opportunities.head}>
            <DefaultRoute name="profile-opportunities-view" handler={Opportunities.view} />
            <Route name="profile-opportunities-edit" path='edit' handler={Opportunities.edit} />
            <Route name="profile-opportunities-delete" path='delete' handler={Opportunities.del} />
          </Route> 
        </Route>
        <Route name="profile-tasks" path='tasks'  >
          <DefaultRoute handler={Tasks.list} />
          <Route name="profile-tasks-create" path='create' handler={Tasks.create} />
          <Route name="profile-tasks-id" path=':taskId' handler={Tasks.head}>
            <DefaultRoute name="profile-tasks-view" handler={Tasks.view} />
            <Route name="profile-tasks-edit" path='edit' handler={Tasks.edit} />
            <Route name="profile-tasks-delete" path='delete' handler={Tasks.del} />
          </Route> 
        </Route> 
        <Route name="profile-notes" path='notes'  >
          <DefaultRoute handler={Notes.list} />
          <Route name="profile-notes-create" path='create' handler={Notes.create} />
          <Route name="profile-notes-id" path=':noteId'  handler={Notes.head} >
            <DefaultRoute name="profile-notes-view" handler={Notes.view} />
            <Route name="profile-notes-edit" path='edit' handler={Notes.edit} />
            <Route name="profile-notes-delete" path='delete' handler={Notes.del} />
          </Route>
        </Route>
        <Route name="profile-emails" path='emails'  >
          <DefaultRoute handler={Emails.list} />
          <Route name="profile-emails-create" path='create' handler={Emails.create} />
          <Route name="profile-emails-id" path=':emailId' handler={Emails.head}>
            <DefaultRoute name="profile-emails-view" handler={Emails.view} />
            <Route name="profile-emails-edit" path='edit' handler={Emails.edit} />
            <Route name="profile-emails-delete" path='delete' handler={Emails.del} />
          </Route> 
        </Route> 
      </Route>    
    </Route> 


    <Route name="opportunities" handler={Opportunities.list} />   
    <Route name="opportunity" path="opportunity">
      <DefaultRoute handler={Opportunities.create} />
      <Route name="opportunity-item" path=":opportunityId" handler={Opportunities.head}>
        <DefaultRoute name="opportunity-view" handler={Opportunities.view} />
        <Route name="opportunity-edit"  path="edit" handler={Opportunities.edit} />
        <Route name="opportunity-delete"  path="delete" handler={Opportunities.del} />    
        <Route name="opportunity-tasks" path='tasks'  >
          <DefaultRoute handler={Tasks.list} />
          <Route name="opportunity-tasks-create" path='create' handler={Tasks.create} />
          <Route name="opportunity-tasks-id" path=':taskId' handler={Tasks.head}>
            <DefaultRoute name="opportunity-tasks-view" handler={Tasks.view} />
            <Route name="opportunity-tasks-edit" path='edit' handler={Tasks.edit} />
            <Route name="opportunity-tasks-delete" path='delete' handler={Tasks.del} />
          </Route>
        </Route> 
        <Route name="opportunity-notes" path='notes'  >
          <DefaultRoute handler={Notes.list} />
          <Route name="opportunity-notes-create" path='create' handler={Notes.create} />
          <Route name="opportunity-notes-id" path=':noteId' handler={Notes.head}>
            <DefaultRoute name="opportunity-notes-view" handler={Notes.view} />
            <Route name="opportunity-notes-edit" path='edit' handler={Notes.edit} />
            <Route name="opportunity-notes-delete" path='delete' handler={Notes.del} />
          </Route>
        </Route> 
        <Route name="opportunity-emails" path='emails'  >
          <DefaultRoute handler={Emails.list} />
          <Route name="opportunity-emails-create" path='create' handler={Emails.create} />
          <Route name="opportunity-emails-id" path=':emailId' handler={Emails.head}>
            <DefaultRoute name="opportunity-emails-view" handler={Emails.view} />
            <Route name="opportunity-emails-edit" path='edit' handler={Emails.edit} />
            <Route name="opportunity-emails-delete" path='delete' handler={Emails.del} />
          </Route>
        </Route> 
      </Route>   
    </Route>



    <Route name="notes" handler={Notes.list} />   
    <Route name="note" path="note">
      <DefaultRoute handler={Notes.create} />
      <Route name="note-item" path=":noteId" handler={Notes.head}>
        <DefaultRoute name="note-view" handler={Notes.view} />
        <Route name="note-edit"  path="edit" handler={Notes.edit} />
        <Route name="note-delete"  path="delete" handler={Notes.del} />    
      </Route>   
    </Route>

    <Route name="tasks" handler={Tasks.list} /> 
    <Route name="task" path="task">
      <DefaultRoute handler={Tasks.create} />
      <Route name="task-item" path=":taskId" handler={Tasks.head}>
        <DefaultRoute name="task-view"  handler={Tasks.view} />
        <Route name="task-edit"  path="edit" handler={Tasks.edit} />
        <Route name="task-delete"  path="delete" handler={Tasks.del} />    
      </Route>   
    </Route>
    
    <Route name="emails" handler={Emails.list} />   
    <Route name="email" path="email">
      <DefaultRoute handler={Emails.create} />
      <Route name="email-item" path=":emailId" handler={Emails.head}>
        <DefaultRoute name="email-view" handler={Emails.view} />
        <Route name="email-edit"  path="edit" handler={Emails.edit} />
        <Route name="email-delete"  path="delete" handler={Emails.del} />    
      </Route>   
    </Route>

    <Route name="opportunityTypes" handler={OpportunityTypes.list} />   
    <Route name="opportunityType" path="opportunityType">
      <DefaultRoute handler={OpportunityTypes.create} />
      <Route name="opportunityType-item" path=":opportunityTypeId" handler={OpportunityTypes.head}>
        <DefaultRoute name="opportunityType-view" handler={OpportunityTypes.view} />
        <Route name="opportunityType-edit"  path="edit" handler={OpportunityTypes.edit} />
        <Route name="opportunityType-delete"  path="delete" handler={OpportunityTypes.del} />    
      </Route>   
    </Route>
   
    <Route name="opportunityStatuses" handler={OpportunityStatuses.list} />   
    <Route name="opportunityStatus" path="opportunityStatus">
      <DefaultRoute handler={OpportunityStatuses.create} />
      <Route name="opportunityStatus-item" path=":opportunityStatusId" handler={OpportunityStatuses.head}>
        <DefaultRoute name="opportunityStatus-view" handler={OpportunityStatuses.view} />
        <Route name="opportunityStatus-edit"  path="edit" handler={OpportunityStatuses.edit} />
        <Route name="opportunityStatus-delete"  path="delete" handler={OpportunityStatuses.del} />    
      </Route>   
    </Route>

    <Route name="opportunityAgentRatings" handler={OpportunityAgentRatings.list} />   
    <Route name="opportunityAgentRating" path="opportunityAgentRating">
      <DefaultRoute handler={OpportunityAgentRatings.create} />
      <Route name="opportunityAgentRating-item" path=":opportunityAgentRatingId" handler={OpportunityAgentRatings.head}>
        <DefaultRoute name="opportunityAgentRating-view" handler={OpportunityAgentRatings.view} />
        <Route name="opportunityAgentRating-edit"  path="edit" handler={OpportunityAgentRatings.edit} />
        <Route name="opportunityAgentRating-delete"  path="delete" handler={OpportunityAgentRatings.del} />    
      </Route>   
    </Route>

    <Route name="opportunityRatePeriods" handler={OpportunityRatePeriods.list} />   
    <Route name="opportunityRatePeriod" path="opportunityRatePeriod">
      <DefaultRoute handler={OpportunityRatePeriods.create} />
      <Route name="opportunityRatePeriod-item" path=":opportunityRatePeriodId" handler={OpportunityRatePeriods.head}>
        <DefaultRoute name="opportunityRatePeriod-view" handler={OpportunityRatePeriods.view} />
        <Route name="opportunityRatePeriod-edit"  path="edit" handler={OpportunityRatePeriods.edit} />
        <Route name="opportunityRatePeriod-delete"  path="delete" handler={OpportunityRatePeriods.del} />    
      </Route>   
    </Route>

    <Route name="users" handler={Users}>
      <Route name="user" path="user/:userId" handler={User} />

    </Route>
    <Route name="me" path="me" handler={Me} >
      <Route name="me-profile" path=":profileId">
          <DefaultRoute handler={Opportunities.list} />
         <Route name="me-profile-opportunities" path='opportunities'  >
          <DefaultRoute handler={Opportunities.list} />
          <Route name="me-profile-opportunities-create" path='create' handler={Opportunities.create} />
          <Route name="me-profile-opportunities-id" path=':opportunityId' handler={Opportunities.head}>
            <Route name="me-profile-opportunities-view" path='view' handler={Opportunities.view} />
            <Route name="me-profile-opportunities-edit" path='edit' handler={Opportunities.edit} />
            <Route name="me-profile-opportunities-delete" path='delete' handler={Opportunities.del} />
          </Route>
        </Route>
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
