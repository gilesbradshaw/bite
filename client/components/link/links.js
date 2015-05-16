import React from "react";
import {PropTypes,Link} from "react-router";
export const links=(links,router, params)=>
{
  //a route is selected
  const currentRoutes=router.getCurrentRoutes();
  const isRoute = links.reduce(((isRoute,link)=>isRoute|| (!link.preserve && currentRoutes.some(r=> link.to===r.name))), false);
  return links
  .filter((link=>link.preserve || !isRoute || currentRoutes.some(r=> link.to===r.name)))
  .map(link=>
    <span key={link.to} className="navLink"><Link to={link.to} params={params}>{link.name}</Link> </span>);
}

export function routeClass(c){
  c.contextTypes = {
    routeDepth: PropTypes.number.isRequired,
    router: PropTypes.router.isRequired
  };
  return c;
}