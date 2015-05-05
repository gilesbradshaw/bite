import React from "react";
import {addons as ReactAddons} from 'react/addons';
var PureRenderMixin = ReactAddons.PureRenderMixin;

import {Map,toJS} from "immutable";
// Router
import  {RouteHandler, Link} from "react-router";

var Error = require("./error");
var Button = require("./button");

var index=0;

module.exports= {
	lister:function lister(displayName,actions, store,errorStore, render, itemRender)
	{
	// Component
	  function getState(index) {
	    return {
	      store: store.get(index),
	      error: errorStore.get(index)
	    };
	  }
	   function nodes () {
	      var nodes = this.state.data.get('store').toArray().map(itemRender);
	      return nodes;
	    }
	  var Item = React.createClass({
	    displayName: displayName+'Item', 
	    render: itemRender
	  });

	  return  React.createClass({
	    displayName: displayName,
	    mixins: [
	    	PureRenderMixin,
	    	store.mixin,
	    	errorStore.mixin
	    ],
	    propTypes: {
    		onChange: React.PropTypes.func,
  		},


	    getInitialState: function () {
	      return {
	      	data:Map(getState(index)),
	      	index:index++,
			myPath:(this.props.myPath || '') + "|" + displayName 

	      };
	    },

	    componentWillMount: function () {
	      console.log('list mounting ' + displayName);
	      actions.load(
	      	{
	      		index:this.state.index,
	      		props:this.props
	      	});
	      console.log('list mounted ' + displayName);
	    },

	    componentWillUnmount: function () {
	    	actions.dispose(this.state.index);
	    },
	    storeDidChange: function () {
	    	var s=getState(this.state.index);
	    	this.setState(prev=>
	    		({
	    			data:prev.data.set("store", s.store).set("error", s.error)
	    		})
	    	);
	    },

	    render: function()
	      {
	        return render.bind(this)(nodes.bind(this))();
	      }
	  });
	},
	creator:function creator(displayName,actions, store,errorStore, render, getInitial)
	{
	  // Component
	  function getState(index) {
	  	console.log(displayName + ' getting state ' + index + ' rets ' + store.get(index));
	    return {
	      item:store.get(index),
	      error:errorStore.get(index)
	    };
	  }
	  var Item = React.createClass({
	  	mixins:[PureRenderMixin],
	    displayName: displayName+'Item', 
	    render: render
	  });
	  return React.createClass({
	    displayName: displayName,
	    propTypes: {},
	    mixins: [
	    	PureRenderMixin,
	    	store.mixin,
	    	errorStore.mixin
	    ],

	    getInitialState: function () {	      
	      return {
	      	data:Map(),
	      	index:index++,
	      	myPath:(this.props.myPath || '') + "|" + displayName 
	      };
	    },

	    componentWillMount: function () {
	      actions.set(
	      	{
	      		index:this.state.index
	      	});
	    },

	    componentWillUnmount: function () {
	    	actions.dispose(this.state.index);
	    },

	    storeDidChange: function () {
	      var s=getState(this.state.index);
	      this.setState(prev=>({data:prev.data.set("item", s.item).set("error", s.error)}));
	    },

	    handleChange:function(field){
	      return function(evt){
	      	actions.set({
	      		index:this.state.index,
	      		item:this.state.data.setIn(['item',field],evt.target.value).get('item')
	      	});
	      }.bind(this);
	    },
	    post:function() {
	      actions.post({
	      	index:this.state.index,
	      	item:this.state.data.get('item'),
	      	props:this.props
	      });
	    },
	    render: function () {
	      if(this.state.data.get('item'))
	      {
	        return <div >
	           <Item handleChange={this.handleChange} item={this.state.data.get('item')}/>
	           <Button buttonCallback={this.post} value="Create" />
	           <Error error={this.state.data.get('error')}/>
	        </div>
	      }
	      else
	      {
	        return (<Error error={this.state.data.get('error')}/>);
	      }
	    }
	  })
	},
	deleter:function deleter(displayName,actions, store,errorStore, render, paramName)
	{
	  // Component
	  function getState(index) {
	    return {
	      item:store.get(index)||null,
	      error:errorStore.get(index)
	    };
	  }
	  var Item = React.createClass({
	    displayName: displayName+'Item', 
	    render: render
	  });
	  function init(props){
		  actions.get({
	      	index:this.state.index,
	      	id:props.params[paramName],
	      	props:props
	      });
	  };
	  return React.createClass({
	  	displayName: displayName,
	    propTypes: {},
	    mixins: [
	    	PureRenderMixin,
	    	store.mixin,
	    	errorStore.mixin
	    ],
	    getInitialState: function () {
	      
	      return {
	      	data:Map(),
	      	index:index++,
	      	myPath:(this.props.myPath || '') + "|" + displayName 
	      };
	    },

	    componentWillMount: function () {
	    	console.log("deleter mount " + this.props.params.agencyId);
	    	init.bind(this)(this.props);
	    },

	    componentWillUnmount: function () {
	    	actions.dispose(this.state.index);
	    },
	   	componentWillReceiveProps: function (props) 
	    {
	    	init.bind(this)(props);
	    },
	    storeDidChange: function () {
	      var s=getState(this.state.index);
	      this.setState(prev=>({data:prev.data.set("item", s.item).set("error", s.error)}));
	    },

	    del:function() {
	      actions.del({
	      	index:this.state.index,
	      	id:this.state.data.getIn(['item','_id']),
	      	props:this.props
	      });
	    },

	    render: function () {   
	      if(this.state.data.get('item'))
	      {
	       return(
	          <div>
	             <Item item={this.state.data.get('item')}/>
	             <Button buttonCallback={this.del} value="Delete" />
	             <Error error={this.state.data.get('error')}/>
	          </div>
	        );
	      }
	      else
	      {
	        return (<Error error={this.state.data.get('error')}/>);
	      }
	    }
	  });
	},
	viewer:function viewer(displayName,actions, store,errorStore, render, paramName)
	{
	  // Component
	  function getState(index) {
	    return {
	      item:store.get(index)||null,
	      error:errorStore.get(index)
	    };
	  }
	  var Item = React.createClass({
	    displayName: displayName+'Item', 
	    render: render
	  });
	  function init(props){
		actions.get({
	       	index:this.state.index,
	       	id:props.params[paramName],
	       	props:props
	    });
	  };

	  return React.createClass({
	    displayName: displayName,
	    propTypes: {},
	    mixins: [
	    	PureRenderMixin,
	    	store.mixin,
	    	errorStore.mixin
	    ],

	    getInitialState: function () {
	      
	      return {
	      	data:Map(),
	      	index:index++,
	      	myPath:(this.props.myPath || '') + "|" + displayName 
	      };
	    },

	    componentWillMount: function () {
	    	init.bind(this)(this.props);
	    },

	    componentWillUnmount: function () {
	    	actions.dispose(this.state.index);
	    },

	    componentWillReceiveProps: function (props) 
	    {
	    	init.bind(this)(props);
	    },

	    storeDidChange: function () {
	      var s=getState(this.state.index);
	      this.setState(prev=>({data:prev.data.set("item", s.item).set("error", s.error)}));
	    },

	    render: function () {   
	      if(this.state.data.get('item'))
	      {
	       return(
	          <div>
	          	<div>here</div>
	          	<div>{displayName}</div>
	          	<div >{this.state.myPath}</div>
	             <Item item={this.state.data.get('item')}/>
	             <Error error={this.state.data.get('error')}/>
	             <div>rhandler here passing </div>
	             <RouteHandler {...this.props} myPath={this.state.myPath} />
	             <div>rhandler was here </div>
	          </div>
	        );
	      }
	      else
	      {
	        return (<Error error={this.state.data.get('error')}/>);
	      }
	    }
	  });
	},
	editor:function editor(displayName,actions, store,errorStore, render, paramName)
	{
	  // Component
	  function getState(index) {
	    return {
	      item:store.get(index)||null,
	      error:errorStore.get(index)
	    };
	  }
	  var Item = React.createClass({
	    displayName: displayName+'Item', 
	    render: render
	  });
	  function init(props){
		  actions.get({
	      	index:this.state.index,
	      	id:props.params[paramName],
	      	props:props
	      });
	  };
	  return React.createClass({
	    displayName: displayName,
	    propTypes: {},
	    mixins: [
	    	PureRenderMixin,
	    	store.mixin,
	    	errorStore.mixin
	    ],

	    getInitialState: function () {
	      
	      return {
	      	data:Map(),
	      	index:index++,
	      	myPath:(this.props.myPath || '') + "" + displayName 
	      };
	    },

	    componentWillMount: function () {
	    	init.bind(this)(this.props);
	    },

	    componentWillUnmount: function () {
	    	actions.dispose(this.state.index);
	    },
	    componentWillReceiveProps: function (props) 
	    {
	    	init.bind(this)(props);
	    },
	    storeDidChange: function () {
	      var s=getState(this.state.index);
	      this.setState(prev=>({data:prev.data.set("item", s.item).set("error", s.error)}));
	    },

	    handleChange:function(field){
	      return function(evt){
	      	actions.set({
	      		index:this.state.index,
	      		item:this.state.data.setIn(['item',field],evt.target.value).get('item')
	      	});
	      }.bind(this);
	    },
	    handleRawChange:function(field){
	      return function(evt, value){
	      	actions.set({
	      		index:this.state.index,
	      		item:this.state.data.setIn(['item',field],evt).get('item')
	      	});
	      }.bind(this);
	    },
	    put:function() {
	      actions.put({
	      	index:this.state.index,
	      	item:this.state.data.get('item'),
	      	props:this.props
	      });
	    },

	    render: function () {   
	      if(this.state.data.get('item'))
	      {
	      	return (<div >
	           <Item handleRawChange= {this.handleRawChange} handleChange={this.handleChange} item={this.state.data.get('item')}/>
	           <Button buttonCallback={this.put} value="Update" />
	           <Error error={this.state.data.get('error')}/>
	        </div>);
	      }
	      else
	      {
	        return (<Error error={this.state.data.get('error')}/>);
	      }
	    }
	  });
	}
};