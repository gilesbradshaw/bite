import React from "react";
import {pathStore} from '../stores/path-store';
import _ from 'lodash';
import {Map} from "immutable";
import {links,routeClass} from './link/links';
import style from './styles/style';
import {PropTypes,Link} from "react-router";
import MediaQuery from 'react-responsive';
// Child Components

var getState=function()
{
  return {
    path:pathStore.get()
  };
}


const flatten = (arr, givenArr = []) => {
  arr.forEach((item) => {
    (Array.isArray(item)) && (flatten(item, givenArr));
    (!Array.isArray(item)) && (givenArr.push(item));
  });

  return givenArr;
};


const allStructure=(currentRoutes, isRoute, path)=>
{
  const self = this;
  return flatten(currentRoutes
   .filter(route=>path.get(`${route.path}&&${route.name}`))
   .map(route=>path.get(`${route.path}&&${route.name}`).toArray()
      .map(e=>
        e(isRoute)
      )
    )).filter(link=> 
      link && link.type!='script'
    );
    
}

const menuStructure=(currentRoutes, isRoute, path)=>
{
  const self = this;
   const links = flatten(currentRoutes
   .filter(route=>path.get(`${route.path}&&${route.name}`))
   .map(route=>path.get(`${route.path}&&${route.name}`).toArray()
      .map(e=>
        e(isRoute)
      )
    )).filter(link=> 
      link && link.type!='script'
    );
    


    return Array.from(links.entries()).map(entry=>
       entry[0]==links.length-1 || !links[entry[0]+1].link.isLeaf 
       ? (!entry[1].link.isLeaf || entry[0]==0 
          ? ( !isRoute || entry[0]!=links.length-1 
              ? {link:entry[1] , childLinks: []}
              : {link:entry[1] , childLinks: menuStructure(currentRoutes,false,path)}
            )
          :  {link:entry[1], backLink: {link:links[entry[0]-1],childLinks:[]}, childLinks:  isRoute && entry[0]==links.length-1 ? menuStructure(currentRoutes,false,path) : []  } 
          )
       : undefined
    ).filter(l=>l);

}

const singleLink=(link,text)=>
    link.current 
    ? <span title={link.link.name}>{(text?text:(link.link.render? link.link.render() : link.link.name))}</span>
    : <Link key={link.link.to} className="pure-menu-link" to={link.link.to} title={link.link.name} params={link.params}>
      {text?text:(link.link.render? link.link.render() : link.link.name)}
    </Link>

const getLink=(link)=> 
{
  if(!link.childLinks.length)
  {
    return [
      (link.backLink
        ? <li className="pure-menu-item pure-menu-selected" key={link.backLink.link.to} >
          {singleLink(link.backLink.link,'<')}
        </li>
        :undefined),
      <li className="pure-menu-item pure-menu-selected" key={link.link.link.to} >
        {singleLink(link.link)}      
      </li>
    ]
  }
  else
  {
    return [
      (link.backLink
        ? <li className="pure-menu-item pure-menu-selected" key={link.backLink.link.to} >
          {singleLink(link.backLink.link,'<')}
        </li>
        :undefined),
      <li className="pure-menu-item pure-menu-has-children pure-menu-allow-hover" key={link.link.link.to} title={link.link.link.name}> 
        { false && !link.link.current
          ? singleLink(link.link,'.')
          : <script/>
        }
        <span >
          {link.link.link.render? link.link.link.render() : link.link.link.name}
        </span>
        <ul className="pure-menu-children">
          {link.childLinks.map(getLink)}
        </ul>
    </li>]

  }
}

@routeClass
class PathDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state= getState();
    this.onStoreChange=this.onStoreChange.bind(this);
    
  }
  onStoreChange(){
    console.log("changed");
    var s=getState();
    this.setState(prev=>s);
  }
  componentDidMount() { 
    pathStore.addChangeListener(this.onStoreChange);
  }
  componentWillUnmount() {
    pathStore.removeChangeListener(this.onStoreChange);
  }
  render() {
   const self = this;
   const links = menuStructure(this.context.router.getCurrentRoutes(), true, this.state.path);
   const allLinks = allStructure(this.context.router.getCurrentRoutes(), true, this.state.path);
   const allLinks1 = allStructure(this.context.router.getCurrentRoutes(), false, this.state.path);
    return (
      <div>

        <div>
          <div>Device Test!</div>
          <MediaQuery query='(min-device-width: 1224px)'>
            <div>You are a desktop or laptop</div>
            <MediaQuery query='(min-device-width: 1824px)'>
              <div>You also have a huge screen</div>
            </MediaQuery>
            <MediaQuery query='(max-width: 1224px)'>
              <div>You are sized like a tablet or mobile phone though</div>
            </MediaQuery>
          </MediaQuery>
          <MediaQuery query='(max-device-width: 1224px)'>
            <div>You are a tablet or mobile phone</div>
          </MediaQuery>
          <MediaQuery query='(orientation: portrait)'>
            <div>You are portrait</div>
          </MediaQuery>
           <MediaQuery query='(orientation: landscape)'>
            <div>You are landscape</div>
          </MediaQuery>
          <MediaQuery query='(min-resolution: 2dppx)'>
            <div>You are retina</div>
          </MediaQuery>
        </div>

        <div className="pure-menu pure-menu-horizontal">
          <ul class="pure-menu-list">{links.map(getLink)}</ul>
        </div>
      </div>
    );
  }
}
export {PathDisplay}

