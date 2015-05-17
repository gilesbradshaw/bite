import React from "react";
import {PropTypes,Link} from "react-router";
import style from '../styles/style';
import _ from 'lodash';



export const links=(links,router, params)=>
{
  //a route is selected
  const currentRoutes=router.getCurrentRoutes();
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







