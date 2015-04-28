var React = require("react");
// Router
var Router = require("react-router");
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
var Error = require("./error");
var Button = require("./button");


module.exports= {
	lister:function lister(displayName,actions, store,errorStore, render, itemRender)
	{
	// Component
	  function getState() {
	    return {
	      store: store.get(),
	      error: errorStore.get()
	    };
	  }
	   function nodes () {
	      var nodes = this.state.store.toArray().map(itemRender);
	      return nodes;
	    }
	  var Item = React.createClass({
	    displayName: displayName+'Item', 
	    render: itemRender
	  });

	  return  React.createClass({
	    displayName: displayName,
	    mixins: [store.mixin,errorStore.mixin],

	    getInitialState: function () {
	      return getState();
	    },

	    componentWillMount: function () {
	      actions.load();
	    },

	    componentWillUnmount: function () {},

	    

	    storeDidChange: function () {
	      this.setState(getState());
	    },

	    render: function()
	      {
	        return render.bind(this)(nodes.bind(this))();
	      }
	  });
	},
	creator:function newer(displayName,actions, store,errorStore, render)
	{
	  // Component
	  function getState() {
	    return {
	      data:store.get()||null,
	      error:errorStore.get()
	    };
	  }
	  var Item = React.createClass({
	    displayName: displayName+'Item', 
	    render: render
	  });
	  return React.createClass({
	    displayName: displayName,
	    propTypes: {},
	    mixins: [store.mixin,errorStore.mixin],

	    getInitialState: function () {
	      
	      return {data:null};
	    },

	    componentDidMount: function () {
	      actions._new();
	    },

	    componentWillUnmount: function () {
	    },

	    storeDidChange: function () {
	      var s=getState();
	      this.setState(()=>s);
	    },

	    handleChange:function(field){
	      return function(evt){
	        actions._new(this.state.data.set(field,evt.target.value));
	      }.bind(this);
	    },
	    post:function() {
	      actions.post(this.state.data);
	    },
	    render: function () {   
	      if(this.state.data)
	      {
	        return <div >
	           <Item handleChange={this.handleChange} item={this.state.data}/>
	           <Button buttonCallback={this.post} value="Create" />
	           <Error error={this.state.error}/>
	        </div>
	      }
	      else
	      {
	        return (<Error error={this.state.error}/>);
	      }
	    }
	  })
	},
	deleter:function deleter(displayName,actions, store,errorStore, render, paramName)
	{
	  // Component
	  function getState() {
	    return {
	      data:store.get()||null,
	      error:errorStore.get()
	    };
	  }
	  var Item = React.createClass({
	    displayName: displayName+'Item', 
	    render: render
	  });
	  return React.createClass({
	    displayName: displayName,
	    propTypes: {},
	    mixins: [store.mixin,errorStore.mixin],

	    getInitialState: function () {
	      
	      return {data:null};
	    },

	    componentDidMount: function () {
	      actions.get(this.props.params[paramName]);
	    },

	    componentWillUnmount: function () {
	    },

	    storeDidChange: function () {
	      var s=getState();
	      this.setState(()=>s);
	    },

	    del:function() {
	      actions.del(this.state.data.get('_id'));
	    },

	    render: function () {   
	      if(this.state.data)
	      {
	       return(
	          <div>
	             <Item item={this.state.data}/>
	             <Button buttonCallback={this.del} value="Delete" />
	             <Error error={this.state.error}/>
	          </div>
	        );
	      }
	      else
	      {
	        return (<Error error={this.state.error}/>);
	      }
	    }
	  });
	},
	viewer:function viewer(displayName,actions, store,errorStore, render, paramName)
	{
	  // Component
	  function getState() {
	    return {
	      data:store.get()||null,
	      error:errorStore.get()
	    };
	  }
	  var Item = React.createClass({
	    displayName: displayName+'Item', 
	    render: render
	  });

	  return React.createClass({
	    displayName: displayName,
	    propTypes: {},
	    mixins: [store.mixin,errorStore.mixin],

	    getInitialState: function () {
	      
	      return {data:null};
	    },

	    componentDidMount: function () {
	       actions.get(this.props.params[paramName]);
	    },

	    componentWillUnmount: function () {
	    },

	    storeDidChange: function () {
	      var s=getState();
	      this.setState(()=>s);
	    },

	    render: function () {   
	      if(this.state.data)
	      {
	       return(
	          <div>
	             <Item item={this.state.data}/>
	             <Error error={this.state.error}/>
	             <RouteHandler {...this.props} />
	          </div>
	        );
	      }
	      else
	      {
	        return (<Error error={this.state.error}/>);
	      }
	    }
	  });
	},
	editor:function editor(displayName,actions, store,errorStore, render, paramName)
	{
	  // Component
	  function getState() {
	    return {
	      data:store.get()||null,
	      error:errorStore.get()
	    };
	  }
	  var Item = React.createClass({
	    displayName: displayName+'Item', 
	    render: render
	  });
	  return React.createClass({
	    displayName: displayName,
	    propTypes: {},
	    mixins: [store.mixin,errorStore.mixin],

	    getInitialState: function () {
	      
	      return {data:null};
	    },

	    componentDidMount: function () {
	      actions.get(this.props.params[paramName]);
	    },

	    componentWillUnmount: function () {
	    },

	    storeDidChange: function () {
	      var s=getState();
	      this.setState(()=>s);
	    },

	    handleChange:function(field){
	      return function(evt){
	        actions._new(this.state.data.set(field,evt.target.value));
	      }.bind(this);
	    },
	    put:function() {
	      actions.put(this.state.data);x
	    },

	    render: function () {   
	      if(this.state.data)
	      {
	      	return (<div >
	           <Item handleChange={this.handleChange} item={this.state.data}/>
	           <Button buttonCallback={this.put} value="Update" />
	           <Error error={this.state.error}/>
	        </div>);
	      }
	      else
	      {
	        return (<Error error={this.state.error}/>);
	      }
	    }
	  });
	}

};