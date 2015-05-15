import React from 'react';
import Router, {Route, DefaultRoute, NotFoundRoute}  from "react-router";
import request from "superagent";

import App from "./components/app"
import Home from "./components/home";
import {MixRadioNav,ChartsNav,NewReleasesNav,UserNav, AdminNav} from "./components/nav";
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
import Countries from "./components/countries";
import Genres from "./components/genres";
import Artists from "./components/artists";
import Tracks from "./components/tracks";
import Albums from "./components/albums";
import AlbumCharts from "./components/albumCharts";
import TrackCharts from "./components/trackCharts";
import AlbumNewReleases from "./components/albumNewReleases";
import TrackNewReleases from "./components/trackNewReleases";
import SingleNewReleases from "./components/singleNewReleases";
import Singles from "./components/singles";
import Users from "./components/users";
import User from "./components/user.edit";
import Me from "./components/user.me";
import UserSignUp from "./components/user.sign.up";
import UserSignIn from "./components/user.sign.in";
import UserSignOut from "./components/user.sign.out";
import NotFound from "./components/notfound";


var getRoute=(prefix, name, pluralName, id, components, ...childRoutes)=> 
  //React.addOns.createFragment(
    <Route key={prefix} name={prefix} path={pluralName} handler={components.listHead} >
      <DefaultRoute name={prefix + "-list"}  handler={components.list}/>   
      <Route path={name}>
        <DefaultRoute name={prefix + "-create"}  handler={components.create} />
        <Route path={":" + id} handler={components.head}>
          <DefaultRoute name={prefix + "-view"}  handler={components.view} />
          <Route name={prefix + "-edit"}  path="edit" handler={components.edit} />
          <Route name={prefix + "-delete"}  path="delete" handler={components.del} />    
          {childRoutes}
        </Route>   
      </Route>
    </Route>
  //);

// Declare routes
var routes = (
  <Route handler={App} path="/">
    <DefaultRoute name="app" handler={Home} />
    <Route name="mixRadio" path="mixRadio" handler={MixRadioNav} > 
      {getRoute("Country", "Country", "Countries", "countryCode" , Countries,
          <Route name="Country-Chart" path="Charts" handler={ChartsNav} >
            {getRoute("Country-AlbumChart", "AlbumChart", "AlbumCharts", "albumChartId" , AlbumCharts)}
            {getRoute("Country-TrackChart", "TrackChart", "TrackCharts", "trackChartId" , TrackCharts)}
          </Route>,
          <Route name="Country-NewRelease" path="NewReleases" handler={NewReleasesNav} >
            {getRoute("Country-AlbumNewRelease", "AlbumNewRelease", "AlbumNewReleases", "albumNewReleaseId" , AlbumNewReleases)}
            {getRoute("Country-TrackNewRelease", "TrackNewRelease", "TrackNewReleases", "trackNewReleaseId" , TrackNewReleases)}
            {getRoute("Country-SingleNewRelease", "SingleNewRelease", "SingleNewReleases", "trackNewReleaseId" , SingleNewReleases)}
          </Route>,
          getRoute("Country-Genre", "Genre", "Genres", "genreId" , Genres,            
            getRoute("Country-Genre-Artist", "Artist", "Artists", "artistId" , Artists),
            getRoute("Country-Genre-Album", "Album", "Albums", "albumId" , Albums),
            getRoute("Country-Genre-Single", "Single", "Singles", "singleId" , Singles),
            getRoute("Country-Genre-Track", "Track", "Tracks", "trackId" , Tracks)
          ),
          getRoute("Country-Artist", "Artist", "Artists", "artistId" , Artists,
            getRoute("Country-Artist-Album", "Album", "Albums", "albumId" , Albums),
            getRoute("Country-Artist-Single", "Single", "Singles", "singleId" , Singles),
            getRoute("Country-Artist-Track", "Track", "Tracks", "trackId" , Tracks)
          ),
          getRoute("Country-Album", "Album", "Albums", "albumId" , Albums,
            getRoute("Country-Album-Track", "Track", "Tracks", "trackId" , Tracks)
          ),
          getRoute("Country-Single", "Single", "Singles", "singleId" , Singles),
          getRoute("Country-Track", "Track", "Tracks", "trackId" , Tracks)
      )},
    </Route>
    <Route name="userArea" path="userArea" handler={UserNav} > 


    {getRoute("Agency", "Agency", "Agencies", "agencyId" , Agencies,
      getRoute("Agency-Agent", "Agent", "Agents", "agentId" , Agents)
    )}
    {getRoute("Agent", "Agent", "Agents", "agentId" , Agents)}
    {getRoute("Profile", "Profiles","Profile", "Profiles", "profileId" , Profiles,
      getRoute("Profile-Opportunity", "Opportunity", "Opportunities", "opportunityId" , Opportunities),
      getRoute("Profile-Note", "Note", "Notes", "noteId" , Notes),
      getRoute("Profile-Task", "Task", "Tasks", "taskId" , Tasks),
      getRoute("Profile-Email","Email", "Emails", "emailId" , Emails)
    )}

    {getRoute("Opportunity", "Opportunity", "Opportunities", "opportunityId" , Opportunities,
      getRoute("Opportunity-Task", "Task", "Tasks", "taskId" , Tasks),
      getRoute("Opportunity-Note", "Note", "Notes", "noteId" , Notes),
      getRoute("Opportunity-Email", "Email", "Emails", "emailId" , Emails)      
    )}



    {getRoute("Note", "Note", "Notes", "noteId" , Notes)}
    {getRoute("Task", "Task", "Tasks", "taskId" , Tasks)}
    {getRoute("Email", "Email", "Emails", "emailId" , Emails)}
    
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
<Route name="adminArea" path="adminArea" handler={AdminNav} > 

  {getRoute("OpportunityType", "OpportunityType", "OpportunityTypes", "opportunityTypeId" , OpportunityTypes)}
  {getRoute("OpportunityStatus", "OpportunityStatus", "OpportunityStatuses", "opportunityStatusId" , OpportunityStatuses)}
  {getRoute("OpportunityAgentRating", "OpportunityAgentRating", "OpportunityAgentRatings", "opportunityAgentRatingId" , OpportunityAgentRatings)}
  {getRoute("OpportunityRatePeriod", "OpportunityRatePeriod", "OpportunityRatePeriods", "opportunityRatePeriodId" , OpportunityRatePeriods)}


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
