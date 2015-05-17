import React from "react";

import {RouteHandler} from "react-router";
import UserLoggedIn from "./user.LoggedIn";
import {PathDisplay} from "./path-display";
import {links,routeClass} from './link/links';
import {pathRender} from './Path';




@routeClass
class Nav extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const route = this.context.router.getRouteAtDepth(this.context.routeDepth-1);
    return (
      <div>
        <UserLoggedIn/>
        {links([
          {to:"app", name:"Home", linkedIf:'.'},
        ],this.context.router)}
        {links([
          {to:"mixRadio", name:"Mix Radio"},
          {to:"jobsArea", name:"Jobs"},
          {to:"signup", name:"SignUp"}
        ],this.context.router)}
        {this.context.router.getCurrentRoutes().map(route=><span><PathDisplay name={`${route.path}&&${route.name}`}/></span>)}
        <RouteHandler {...this.props} />
      </div>
    );
  }
}
Nav.displayName = "Nav";
export default Nav;

@routeClass
class UserNav extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <span>
        {links([
          {to:"Agency-list", name:"Agencies" },
          {to:"Agent-list", name:"Agents" },
          {to:"Opportunity-list", name:"Opportunities" },
          {to:"Note-list", name:"Notes" },
          {to:"Task-list", name:"Tasks" },
          {to:"Email-list", name:"Emails" },
          {to:"me", name:"Me" }
        ],this.context.router)}
        
        <RouteHandler {...this.props} />
       </span>
    );
  }
}
UserNav.displayName = "UserNav";
export {UserNav};

@routeClass
class MixRadioNav extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return pathRender(
      this,
      ()=> <RouteHandler {...this.props} />,    
      ()=>
        <span>
          {links([
            {to:"Country-list", linkedIf:'Country' ,  name:"Countries"}
          ],this.context.router,this.props.params)}
        </span>
    );
  }
}
MixRadioNav.displayName = "MixRadioNav";
export {MixRadioNav};

@routeClass
class AdminNav extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <span>
        {links([
          {to:"Profile-list", name:"Profiles" },
          {to:"OpportunityType-list", name:"OpportunityTypes" },
          {to:"OpportunityStatus-list", name:"OpportunityStatuses" },
          {to:"OpportunityAgentRating-list", name:"OpportunityAgentRatings" },
          {to:"OpportunityRatePeriod-list", name:"OpportunityRatePeriods" }
        ],this.context.router)}
        <RouteHandler {...this.props} />
       </span>
    );
  }
}
AdminNav.displayName = "AdminNav";
export {AdminNav};

@routeClass
class JobSearchNav extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <span>
        {links([
          {to:"userArea", name:"Main"},
          {to:"adminArea", name:"Admin"}
        ],this.context.router)}
        <RouteHandler {...this.props} />
       </span>
    );
  }
}
JobSearchNav.displayName = "JobSearchNav";
export {JobSearchNav};

@routeClass
class ChartsNav extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return pathRender(
      this,
      ()=> <RouteHandler {...this.props} />,    
      ()=>
        <span>
          {links([
            {to:"Country-AlbumChart", name:"Albums"},
            {to:"Country-TrackChart", name:"Tracks"}
          ],this.context.router,this.props.params)}
        </span>
    );
  }
}
ChartsNav.displayName = "ChartsNav";
export {ChartsNav};

@routeClass
class NewReleasesNav extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return pathRender(
      this,
      ()=> <RouteHandler {...this.props} />,    
      ()=>
        <span>
          {links([
            {to:"Country-AlbumNewRelease", name:"Albums"},
            {to:"Country-TrackNewRelease", name:"Tracks"},
            {to:"Country-SingleNewRelease", name:"Singles"}
          ],this.context.router,this.props.params)}
        </span>
    );
  }
}
NewReleasesNav.displayName = "NewReleasesNav";
export {NewReleasesNav};