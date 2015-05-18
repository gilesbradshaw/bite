import React from "react";
import {PropTypes,Link} from "react-router";
import style from '../styles/style';
import _ from 'lodash';

var index=0;
//isRoute means that at least one of the links is for a selected route
export const links=(links,router, params, isRoute)=>
{
  //a route is selected
  const currentRoutes=router.getCurrentRoutes();
  const ls = links;
  const _isRoute = links.some(link=>(!link.preserve && currentRoutes.some(r=> r.name && r.name.indexOf(link.linkedIf)>-1 ||  link.to===r.name)));
  const _isLeaf = links.some(link=>(link.isLeaf && currentRoutes.some(r=> r.name && r.name.indexOf(link.linkedIf)>-1 ||  link.to===r.name))) &&
                  !links.some(link=>(!link.isLeaf && currentRoutes.some(r=> r.name && r.name.indexOf(link.linkedIf)>-1 ||  link.to===r.name)));

  if(isRoute)
  {
    const okLinks=links
        .filter((link=> link.preserve || currentRoutes.some(r=> r.name && r.name.indexOf(link.linkedIf)>-1 || link.to===r.name)))
        .map(link=>
          <span key={link.to} ><Link key={link.to} style={style.link} to={link.to} params={params}>{link.render? link.render() : link.name}</Link> </span>);
    return okLinks;
  }

  if(!isRoute && (!_isRoute || _isLeaf))
  {
    const okLinks=links
        .filter((link=>  !currentRoutes.some(r=> r.name && r.name.indexOf(link.linkedIf)>-1 || link.to===r.name)))
        .map(link=>
          <span key={link.to} ><Link key={link.to} style={style.link} to={link.to} params={params}>{link.render? link.render() : link.name}</Link> </span>);
    return okLinks;
  }
  return [];

  if(isRoute==_isRoute)
  {
    const okLinks=links
        .filter((link=>_isLeaf || link.preserve || !_isRoute || currentRoutes.some(r=> r.name && r.name.indexOf(link.linkedIf)>-1 || link.to===r.name)))
        .map(link=>
          <span key={link.to} ><Link key={link.to} style={style.link} to={link.to} params={params}>{link.render? link.render() : link.name}</Link> </span>);

    return okLinks;


  }
} 

//decorator adds router context types
export function routeClass(target){ 
  target.contextTypes= _.extend( target.contextTypes || {} , 
    {
      routeDepth: PropTypes.number.isRequired,
      router: PropTypes.router.isRequired
    }
  );
  return target;
}







