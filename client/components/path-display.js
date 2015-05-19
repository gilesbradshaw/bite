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

const singleLink=(link,text, className)=>
    link.current 
    ? <a className="menu-link-none" key={link.link.to} title={link.link.name}>{(text?text:(link.link.render? link.link.render() : link.link.name))}</a>
    : <Link className={"menu-link " + (className||"")} key={link.link.to}  to={link.link.to} title={link.link.name} params={link.params}>
      {text?text:(link.link.render? link.link.render() : link.link.name)}
    </Link>

const getLink=(link)=> 
{
  if(!link.childLinks.length)
  {
    return [
      (link.backLink
        ? <li  key={link.backLink.link.to} >
          {singleLink(link.backLink.link,'<','menu-link-small')}
        </li>
        :undefined),
      <li  key={link.link.link.to} >
        {singleLink(link.link)}      
      </li>
    ]
  }
  else
  {
    return [
      (link.backLink
        ? <li  key={link.backLink.link.to} >
          {singleLink(link.backLink.link,'<', 'menu-link-small')}
        </li>
        :undefined),
      <li  key={link.link.link.to} title={link.link.link.name}> 
        { false && !link.link.current
          ? singleLink(link.link,'.')
          : <script/>
        }
        <a className='menu-link-dropdown' key={link.link.link.to} title={link.link.link.name}>
          {link.link.link.render? link.link.link.render() : link.link.link.name}
        </a>
        <ul className='hidden'>
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
   //const allLinks = allStructure(this.context.router.getCurrentRoutes(), true, this.state.path);
   //const allLinks1 = allStructure(this.context.router.getCurrentRoutes(), false, this.state.path);
    return (
      <div>

        

        <MediaQuery query='(min-width: 761px)'>
            <div className="menu desktop-menu">
              <ul>{links.map(getLink)}</ul>
              <div style={{height:'50px'}}/>
          </div>
        </MediaQuery>
        <MediaQuery query='(max-width: 760px)'> 
            <MobilePathDisplay links={links}/>
        </MediaQuery>
          
        
      </div>
    );
  }
}
export {PathDisplay}



class MobilePathDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state= {show:false};
    this.toggleShow=()=>
      this.setState(s=>s.show=!s.show)

  }
  render() {
    return (
       <div className="menu mobile-menu">
          <ul>
            <li>
              <a className={this.state.show?'menu-hide':'menu-show'} onClick={this.toggleShow}>
                {this.state.show?'hide':'show'}
              </a>
             </li>

            {this.state.show?this.props.links.map(getLink):undefined}
          </ul>
        </div>
    );
  }
}
export {PathDisplay}

