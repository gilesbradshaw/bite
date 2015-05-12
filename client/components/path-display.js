import React from "react";
import {pathStore} from '../stores/path-store';
// Child Components

var getState=function()
{
  return {
    path:pathStore.get()
  };
}

export var PathDisplay = React.createClass({
	mixins: [
		pathStore.mixin
	],
  displayName: "PathDisplay",
  propTypes: {},
  getInitialState:function(){
    return getState();
  },
  storeDidChange: function () {
        var s=getState();
        this.setState(prev=>s);
      },
  render: function () {
    if(this.state.path.get("pathRender"))
    { 
      return this.state.path.get("pathRender")();
    }
    return <div style={{background:'red'}}>
      {this.state.path.get("path")}
    </div>  
  }
});
