import React from "react";

import {RouteHandler} from "react-router";
import UserLoggedIn from "./user.LoggedIn";
import {PathDisplay} from "./path-display";
import {links,routeClass} from './link/links';
import {pathRender} from './Path';
import {Grid,Row,Col} from 'react-flexgrid';

const myPathRender =(self,myLinks, myRender)=>
  pathRender(
    self,
    myRender || (()=> <RouteHandler {...self.props} />),    
    (isRoute)=>
      links(myLinks,self.context.router,self.props.params,isRoute)
  );


const TitleNav = (title)=>
{
  class TitleNav extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
        return <h1>{title}</h1>

    }
  }
  TitleNav.displayName = "TitleNav";
  return TitleNav;
}
export {TitleNav};


@routeClass
class NavRoot extends React.Component {
  constructor(props) {
    super(props);
  }
  getInitialState(){
    return getState();
  }
  render() {
    return myPathRender(this,[{to:"app", name:"Home", linkedIf:'.'}],()=>
        <div>
         <UserLoggedIn/>
        
          <PathDisplay isRoute={true}/>          
          <RouteHandler {...this.props} />
          <PathDisplay isRoute={false}/>    
      </div>
    );
  }
}
NavRoot.displayName = "NavRoot";
export {NavRoot};



@routeClass
class Nav extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
     return myPathRender(this,[
        //{to:"app", name:"Home", linkedIf:'.'},
        {to:"mixRadio", name:"Mix Radio"},
        {to:"jobsArea", name:"Jobs"},
        {to:"signup", name:"SignUp"}
      ]
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
    return myPathRender(
        this,
        [
          {to:"Agency-list", name:"Agencies" },
          {to:"Agent-list", name:"Agents" },
          {to:"Opportunity-list", name:"Opportunities" },
          {to:"Note-list", name:"Notes" },
          {to:"Task-list", name:"Tasks" },
          {to:"Email-list", name:"Emails" },
          {to:"me", name:"Me" }
        ]
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
    return myPathRender(
      this,
      [
        {to:"Country-list", linkedIf:'Country' ,  name:"Countries"}
      ]
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
    return myPathRender(this,[
      {to:"Profile-list", name:"Profiles" }, 
      {to:"OpportunityType-list", name:"OpportunityTypes" },
      {to:"OpportunityStatus-list", name:"OpportunityStatuses" },
      {to:"OpportunityAgentRating-list", name:"OpportunityAgentRatings" },
      {to:"OpportunityRatePeriod-list", name:"OpportunityRatePeriods" }
    ]);
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
    return myPathRender(this,[
      {to:"userArea", name:"Main"},
      {to:"adminArea", name:"Admin"}
    ]);
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
    return myPathRender(
      this,
      [
        {to:"Country-ChartAlbum-list", name:"Albums"},
        {to:"Country-ChartTrack-list", name:"Tracks"}
      ]
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
    return myPathRender(
      this,
      [
        {to:"Country-NewReleaseAlbum-list", name:"Albums"},
        {to:"Country-NewReleaseTrack-list", name:"Tracks"},
        {to:"Country-NewReleaseSingle-list", name:"Singles"}
      ]
    );
  }
}
NewReleasesNav.displayName = "NewReleasesNav";
export {NewReleasesNav};