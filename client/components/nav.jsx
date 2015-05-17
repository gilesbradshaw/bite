import React from "react";
import Radium from "radium";

import {RouteHandler} from "react-router";
import UserLoggedIn from "./user.LoggedIn";
import {PathDisplay} from "./path-display";
import {links,routeClass} from './link/links';
import {pathRender} from './Path';





@Radium.Enhancer
export default class Nav extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const route = this.context.router.getRouteAtDepth(this.context.routeDepth-1);
    return (
      <div>
        <UserLoggedIn/>
        {links([
          {to:"app", name:"Home" , preserve:true},
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
routeClass(Nav);
Nav.displayName = "Nav";


export class UserNav extends React.Component {
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
routeClass(UserNav);
UserNav.displayName = "UserNav";


export class MixRadioNav extends React.Component {
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
routeClass(MixRadioNav);
MixRadioNav.displayName = "MixRadioNav";

export class AdminNav extends React.Component {
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
routeClass(AdminNav);
AdminNav.displayName = "AdminNav";

export class JobSearchNav extends React.Component {
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
routeClass(JobSearchNav);
JobSearchNav.displayName = "JobSearchNav";



export class ChartsNav extends React.Component {
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
routeClass(ChartsNav);
ChartsNav.displayName = "ChartsNav";


export class NewReleasesNav extends React.Component {
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
routeClass(NewReleasesNav);
NewReleasesNav.displayName = "NewReleasesNav";
