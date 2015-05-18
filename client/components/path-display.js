import React from "react";
import {pathStore} from '../stores/path-store';
import _ from 'lodash';
import {Map} from "immutable";
import {links,routeClass} from './link/links';
// Child Components

var getState=function()
{
  return {
    path:pathStore.get()
  };
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
   var links = this.context.router.getCurrentRoutes()
   .filter(route=>this.state.path.get(`${route.path}&&${route.name}`))
   .map(route=>this.state.path.get(`${route.path}&&${route.name}`).toArray()
      .map(e=>
        e(self.props.isRoute)
      )
    );
   //.reduce((a,b)=>a.concat(b),[]);
  
    return (
      <div>
        {links}
          
      </div>
    );
  }
}
export {PathDisplay}

export var PathDisplay2 = React.createClass({
	mixins: [
		pathStore.mixin
	],
  displayName: "PathDisplay",
  propTypes: {},
  getInitialState(){
    return getState();
  },
  storeDidChange() {
    var s=getState();
    this.setState(prev=>s);
  },
  render() {
    if(this.state.path.get(this.props.name))
    { 
      const ret= this.state.path.get(this.props.name).toArray().map(e=>
      {
       var t= e();
       return t;
      }
      );
      return <span>
        {this.state.path.get(this.props.name).toArray().map(e=>e())}
      </span>
    }
    return <script/>
  }
});
