import React from "react";
import {PropTypes,Link} from "react-router";

import _ from 'lodash';


//isRoute means that at least one of the links is for a selected route
export const links=(links,router, params, isRoute)=>
{
  //a route is selected
  const currentRoutes=router.getCurrentRoutes();
  const currentNamedRoutes=currentRoutes.filter(r=>r.name);
  const currentRoute = currentNamedRoutes[currentNamedRoutes.length-1]
  const ls = links;
  const _isRoute = links.some(link=>(!link.preserve && currentRoutes.some(r=> r.name && r.name.indexOf(link.linkedIf)>-1 ||  link.to===r.name)));
  const _isLeaf = links.some(link=>(link.isLeaf && currentRoutes.some(r=> r.name && r.name.indexOf(link.linkedIf)>-1 ||  link.to===r.name))) &&
                  !links.some(link=>(!link.isLeaf && currentRoutes.some(r=> r.name && r.name.indexOf(link.linkedIf)>-1 ||  link.to===r.name)));

  if(isRoute)
  {
    const okLinks=links
        .filter((link=> link.preserve || currentRoutes.some(r=> r.name && r.name.indexOf(link.linkedIf)>-1 || link.to===r.name)))
        .map(link=>({link,params, currentName:currentRoute.name, current: link.to==currentRoute.name}));
        /*.map(link=>
          link[0]!=ls.length-2 || !ls[ls.length-1].isLeaf 
          ? <span key={link[1].to} ><Link key={link[1].to} style={style.link} to={link[1].to} params={params}>{link[1].render? link[1].render() : link[1].name}</Link> </span>
          : <span key={link[1].to} >noooo</span>);*/
    return okLinks;
  }

  if(!isRoute && (!_isRoute || _isLeaf))
  {
    const okLinks=links
        .filter((link=>  !currentRoutes.some(r=> r.name && r.name.indexOf(link.linkedIf)>-1 || link.to===r.name)))
        .map(link=>({link,params}));
        /*.map(link=>
          <span key={link.to} ><Link key={link.to} style={style.link} to={link.to} params={params}>{link.render? link.render() : link.name}</Link> </span>);*/
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

export const makeLink= (to, params, paramName, paramValue, content)=>
  <Link key={`${to}_${paramValue}`} to={to} params ={_.extend({},params, {[paramName]:paramValue})}>{content()}</Link>







