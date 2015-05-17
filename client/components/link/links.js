import React from "react";
import {PropTypes,Link as RouterLink} from "react-router";
import Radium from "radium";
import style from '../styles/style';

function myStyler(target){
  return function(props,context){
    return new target(props,context);
  }
}
@myStyler
@Radium.Enhancer
export class Link extends RouterLink
{}
//seems a little crappy having to put these in!!
Link.contextTypes = RouterLink.contextTypes;
Link.propTypes = RouterLink.propTypes;
Link.defaultProps = RouterLink.defaultProps;


export const links=(links,router, params)=>
{
  //a route is selected
  const currentRoutes=router.getCurrentRoutes();
  const ls = links;
  const isRoute = links.reduce(((isRoute,link)=>isRoute|| (!link.preserve && currentRoutes.some(r=> r.name && r.name.indexOf(link.linkedIf)>-1 ||  link.to===r.name))), false);
  const myStyle = !isRoute ? style.block : {background:'green', ['font-size']:'2em'};
  
  return (
    <span key={links[0].to} style={myStyle}  umm= {[{background:'green'}, isRoute ? {background:'blue'}: {background:'red'}]}>
      {links
      .filter((link=>link.preserve || !isRoute || currentRoutes.some(r=> r.name && r.name.indexOf(link.linkedIf)>-1 || link.to===r.name)))
      .map(link=>
        <span key={link.to} ><Link key={link.to} style={style.link} to={link.to} params={params}>{link.name}</Link> </span>)}
    </span>
  );
} 

export function routeClass(c){
  c.contextTypes = {
    routeDepth: PropTypes.number.isRequired,
    router: PropTypes.router.isRequired
  };
  return c;
}







