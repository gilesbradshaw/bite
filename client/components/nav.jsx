import React from "react";

import {RouteHandler, Link} from "react-router";
import UserLoggedIn from "./user.LoggedIn";
import {PathDisplay} from "./path-display";
import {links,routeClass} from './link/links';
import {pathRender} from './Path';





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
          {to:"userArea", name:"Main"},
          {to:"adminArea", name:"Admin"},
          {to:"signup", name:"SignUp"}
        ],this.context.router)}
        {this.context.router.getCurrentRoutes().map(route=><div><PathDisplay name={`${route.path}&&${route.name}`}/></div>)}
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


export class MixRadioNav extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
  /*return(
    <div>
        {links([
          {to:"Country-list", name:"Countries"}
        ],this.context.router,this.props.params)}
        <RouteHandler {...this.props} />
       </div>
    );*/
    return pathRender(
      this,
      ()=> <RouteHandler {...this.props} />,    
      ()=>
        <div>
          {links([
            {to:"Country-list", name:"Countries"}
          ],this.context.router,this.props.params)}
        </div>
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

export class ChartsNav extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return pathRender(
      this,
      ()=> <RouteHandler {...this.props} />,    
      ()=>
        <div>
          {links([
            {to:"Country-AlbumChart", name:"Albums"},
            {to:"Country-TrackChart", name:"Tracks"}
          ],this.context.router,this.props.params)}
        </div>
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
        <div>
          {links([
            {to:"Country-AlbumNewRelease", name:"Albums"},
            {to:"Country-TrackNewRelease", name:"Tracks"},
            {to:"Country-SingleNewRelease", name:"Singles"}
          ],this.context.router,this.props.params)}
        </div>
    );
  }
}
routeClass(NewReleasesNav);
NewReleasesNav.displayName = "NewReleasesNav";
