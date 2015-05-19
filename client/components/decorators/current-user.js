import React from "react";
import userStore from '../../stores/user-current-store';
import _ from 'lodash';
export default function currentUser(target){ 
  return function(){
  	const self = new target(...arguments);
  	const onUserStoreChange= (function(){}).bind(self);
  	const nullFunc=function(){}
  	const componentDidMount = (self.componentDidMount||nullFunc).bind(self); 
  	self.componentDidMount = ()=>{
  		userStore.addChangeListener(onUserStoreChange);
  		componentDidMount();
  	}
  	const componentWillUnmount = (self.componentWillUnmount||nullFunc).bind(self); 
  	self.componentWillUnmount = ()=>{
  		userStore.addChangeListener(onUserStoreChange);
  		componentWillUnmount();
  	}
  }
}
 