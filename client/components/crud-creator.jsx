var React = require("react");
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var {Map,toJS} = require("immutable");
// Router
var Router = require("react-router");
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
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

	    getInitialState: function () {
	      return {data:Map(getState(index)),index:index++};
	    },

	    componentWillMount: function () {
	      actions.load({index:this.state.index});
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
	creator:function creator(displayName,actions, store,errorStore, render)
	{
	  // Component
	  function getState(index) {
	    return {
	      item:store.get(index)||null,
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
	      
	      return {data:Map(),index:index++};
	    },

	    componentDidMount: function () {
	      actions._new({index:this.state.index});
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
	      	actions._new({
	      		index:this.state.index,
	      		item:this.state.data.setIn(['item',field],evt.target.value).get('item')
	      	});
	      }.bind(this);
	    },
	    post:function() {
	      actions.post({
	      	index:this.state.index,
	      	item:this.state.data.get('item')
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
	  return React.createClass({
	  	displayName: displayName,
	    propTypes: {},
	    mixins: [
	    	PureRenderMixin,
	    	store.mixin,
	    	errorStore.mixin
	    ],
	    getInitialState: function () {
	      
	      return {data:Map(),index:index++};
	    },

	    componentDidMount: function () {
	      actions.get({
	      	index:this.state.index,
	      	id:this.props.params[paramName]
	      });
	    },

	    componentWillUnmount: function () {
	    	actions.dispose(this.state.index);
	    },

	    storeDidChange: function () {
	      var s=getState(this.state.index);
	      this.setState(prev=>({data:prev.data.set("item", s.item).set("error", s.error)}));
	    },

	    del:function() {
	      actions.del({
	      	index:this.state.index,
	      	id:this.state.data.getIn(['item','_id'])
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

	  return React.createClass({
	    displayName: displayName,
	    propTypes: {},
	    mixins: [
	    	PureRenderMixin,
	    	store.mixin,
	    	errorStore.mixin
	    ],

	    getInitialState: function () {
	      
	      return {data:Map(),index:index++};
	    },

	    componentDidMount: function () {
	       actions.get({
	       	index:this.state.index,
	       	id:this.props.params[paramName]
	       });
	    },

	    componentWillUnmount: function () {
	    	actions.dispose(this.state.index);
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
	             <Item item={this.state.data.get('item')}/>
	             <Error error={this.state.data.get('error')}/>
	             <RouteHandler {...this.props} />
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
	  return React.createClass({
	    displayName: displayName,
	    propTypes: {},
	    mixins: [
	    	PureRenderMixin,
	    	store.mixin,
	    	errorStore.mixin
	    ],

	    getInitialState: function () {
	      
	      return {data:Map(),index:index++};
	    },

	    componentDidMount: function () {
	      actions.get({
	      	index:this.state.index,
	      	id:this.props.params[paramName]
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
	      	actions._new({
	      		index:this.state.index,
	      		item:this.state.data.setIn(['item',field],evt.target.value).get('item')
	      	});
	      }.bind(this);
	    },
	    put:function() {
	      actions.put({
	      	index:this.state.index,
	      	item:this.state.data.get('item')
	      });
	    },

	    render: function () {   
	      if(this.state.data.get('item'))
	      {
	      	return (<div >
	           <Item handleChange={this.handleChange} item={this.state.data.get('item')}/>
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