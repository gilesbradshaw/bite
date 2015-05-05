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
	lister:function lister(singleId, name,pluralName,displayName,actions, store,errorStore, itemRender, render)
	{
	// Component
	  function getState(index) {
	    return {
	      store: store.get(index),
	      error: errorStore.get(index)
	    };
	  }
	  function nodes () {
	  	  
	      var nodes = this.state.data.get('store').toArray().map( (data)=>
	      {
	      	var params= {};
	  	  	params[singleId] = data.get('_id');
	        return<div key={data.get('_id')}>
		          {itemRender(data)}
		          <span><Link to={name + "-view"} params={params}>View</Link></span>
		          <span><Link to={name + "-edit"} params={params}>Edit</Link></span>
		          <span><Link to={name + "-delete"} params={params}>Delete</Link></span>
	          	</div>
	         }
      	  );
    	  return nodes;
	  }

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
			myPath:(this.props.myPath || '') + "|" + pluralName 

	      };
	    },

	    componentWillMount: function () {
	      actions.load(
	      	{
	      		index:this.state.index,
	      		props:this.props
	      	});
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

	    render:  function()
	      {
	      	var res =this.state.data.get('store').toArray();// nodes.bind(this)();
	      	if(render)
	      	{
	      		return render(this,res).bind(this)()
	      	}
	      	else
	      	{
		      	return( 
		      		<div>
		                <span className="navLink"><Link to={name}>Create</Link></span>
			            {nodes.bind(this)()}
			  			<RouteHandler myPath={this.state.myPath} {...self.props} />
		      		</div>
		    	);
		    }
	        
	      }
	  });
	},
	creator:function creator(routePart, displayName,actions, store,errorStore, render, getInitial)
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
	      	myPath:(this.props.myPath || '') + "|" + routePart 
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
	    handleRawChange:function(field){
	      return function(evt, value){
	      	actions.set({
	      		index:this.state.index,
	      		item:this.state.data.setIn(['item',field],evt).get('item')
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
	           <Item handleRawChange={this.handleRawChange} handleChange={this.handleChange} item={this.state.data.get('item')}/>
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
	deleter:function deleter(routePart,displayName,actions, store,errorStore, render, paramName)
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
	      	myPath:(this.props.myPath || '') + "|" + routePart 
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
	viewer:function viewer(routePart, displayName,actions, store,errorStore, render, paramName)
	{
	  return React.createClass({
	    displayName: displayName,
	    propTypes: {},
	    mixins: [
	    	PureRenderMixin
	    ],
		getInitialState: function () {  
	      return {
	      	myPath:(this.props.myPath || '') + "|" + routePart 
	      };
	    },
	    render: function () { 
	      if(this.props.item)
	      {	      	
	      	return <div>
		      		{render(this,this.props.item)}
		      		<RouteHandler {...this.props}  myPath={this.state.myPath} />
		      	</div>
	      }
	      else
	      {
	      	return <div/>
	      }
	      
	    }
	  });
	},
	getter:function viewer(routePart, displayName,actions, store,errorStore, render, paramName)
	{
	  // Component
	  function getState(index) {
	    return {
	      item:store.get(index)||null,
	      error:errorStore.get(index)
	    };
	  }
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
	      	myPath:(this.props.myPath || '') + "|" + routePart 
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
	          	{render(this,this.state.data.get('item'))}
	             <Error error={this.state.data.get('error')}/>
	             <RouteHandler {...this.props} item={this.state.data.get('item')} myPath={this.state.myPath} index={this.state.index} />
	          </div>
	        );
	      }
	      else
	      {
	        return (
	        	<div>
	        		<Error error={this.state.data.get('error')}/>
	        	</div>
	        );
	      }
	    }
	  });
	},

	editor:function editor(routePart,displayName,actions, store,errorStore, render, paramName)
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
	      	data:Map(this.props),
	      	index:index++,
	      	myPath:(this.props.myPath || '') + "" + routePart 
	      };
	    },
		componentWillMount: function () {
			actions.set({
	      		index:this.state.index,
	      		item:this.state.data.get('item')
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
	},
	listHead:function viewer(routePart, displayName,render)
	{
	  return React.createClass({
	    displayName: displayName,
	    propTypes: {},
	    mixins: [
	    	PureRenderMixin
	    ],

	    getInitialState: function () {
	      
	      return {
	      	displayName:displayName,
	      	myPath:(this.props.myPath || '') + "|" + routePart 
	      };
	    },
	    render: function () {   
	       return(
	          <div>
	          	{render(this)}
	          	
	          	<RouteHandler {...this.props} myPath={this.state.myPath} />
	          </div>
	        );
	    
	    }
	  });
	}
	
};