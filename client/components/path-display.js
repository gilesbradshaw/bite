import React from "react";
import {pathStore} from '../stores/path-store';
import _ from 'lodash';
import {Map} from "immutable";
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
      return <div>
        {this.state.path.get(this.props.name).toArray().map(e=>e())}
      </div>
    }
    return <script/>
  }
});
