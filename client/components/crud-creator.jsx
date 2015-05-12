import React from "react";
import {addons as ReactAddons} from 'react/addons';
var PureRenderMixin = ReactAddons.PureRenderMixin;
import {Map,toJS} from "immutable";
// Router
import  {Navigation, RouteHandler, Link} from "react-router";
import _ from 'lodash';
import Error from "./error";
import Button from "./button";
import reactMixin from 'react-mixin';
import {Enhance} from "./higherOrder/enhance"
import {Path, pathRender} from './Path';

var index=0;


const doAPath= (name)=> function()
	{
		return( 
			<div> {name} path will be rendered here  !!!!</div>
		);
	}



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
	  function nodes (items) {
	  	  const self =this;
	  	  return items.map( (data)=>
	      {
	  	  	const params = _.extend({[singleId] : data.get('_id')},self.props.params);
	  	   	return <div key={data.get('_id')}>
		          {itemRender(data)}
		          <h4 style={{background:'pink'}}>{self.state.myPath}</h4>
		          <span><Link to={self.state.myPath + "-view"} params={params}>View</Link></span>
		          <span><Link to={self.state.myPath + "-edit"} params={params}>Edit</Link></span>
		          <span><Link to={self.state.myPath + "-delete"} params={params}>Delete</Link></span>
	          	</div>
	         }
      	  );
    	  
	  }

	  return React.createClass({
	    displayName: displayName,
	    mixins: [
	    	PureRenderMixin,
	    	store.mixin,
	    	errorStore.mixin,
	    	Navigation
	    ],
	    propTypes: {
    		onChange: React.PropTypes.func,
  		},


	    getInitialState: function () {
	    	var catchit={singleId, name,pluralName,displayName,actions, store,errorStore, itemRender, render};
	      return {
	      	data:Map(getState(index)),
	      	index:index++,
			myPath:this.props.myPath

	      };
	    },

	    componentWillMount: function () {
	      actions.load(
	      	{
	      		index:this.state.index,
	      		props:this.props
	      	});
	      	console.log(`lister -- mount -- ${this.state.myPath} : ${this.props.myPath}` );
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
	    componentWillReceiveProps: function (props) 
	    {
	    	console.log(`lister rec props::::  ${this.state.myPath} : ${this.props.myPath}` );
	    },

	    render:  function()
	      {
	      	var res=this.state.data.get('store').toArray();
	      	return pathRender(
	      		this,
	      		()=> {
		      		if(render)
				      	{
				      		return render(this,res).bind(this)()
				      	}
				      	else
				      	{
				      	  	return( 
					      		<div> 
						            {nodes.bind(this)(res)}
						  			<RouteHandler myPath={this.state.myPath} {...this.props} />
					      		</div>
					    	);
					    }
		      		},
		      	doAPath('lister').bind(this)
    	  	);
	      }
	  });
	},
	creator:function creator(name, pluralName, routePart, displayName,actions, store,errorStore, render, paramName)
	{
	  // Component
	  function getState(index) {
	  	return {
	      item:store.get(index),
	      error:errorStore.get(index)
	    };
	  }
	  var Item = React.createClass({
	  	mixins:[PureRenderMixin,Navigation],
	    displayName: displayName+'Item', 
	    render: function(){
	    	return render(this);
	    }
	  });
	  return React.createClass({
	    displayName: displayName,
	    propTypes: {},
	    mixins: [
	    	PureRenderMixin,
	    	store.mixin,
	    	errorStore.mixin,
	    	Navigation
	    ],

	    getInitialState: function () {	      
	      return {
	      	data:Map(),
	      	index:index++,
	      	myPath:this.props.myPath + '-create'
	      };
	    },

	    componentWillMount: function () {
	      actions.set(
	      	{
	      		index:this.state.index
	      	});
	      console.log(`${this.state.myPath} : ${this.props.myPath}` );
	    },

	    componentWillUnmount: function () {
	    	actions.dispose(this.state.index);
	    },

	    storeDidChange: function () {
	      var s=getState(this.state.index);
	      if(s.item.get("_id"))
	      {
	      	let params = {};
	      	params[paramName]= s.item.get("_id");
	      	this.context.router.transitionTo(this.props.myPath + "-edit", _.extend(params, this.props.params));	
	      }
	      else
	      {
	      	this.setState(prev=>({data:prev.data.set("item", s.item).set("error", s.error)}));
	      }
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
	      //I dont understand why router is only available now

	      actions.post({
	      	index:this.state.index,
	      	item:this.state.data.get('item'),
	      	props:this.props,
	      	//router:this.context.router
	      });
	      
	    },
   	    render:  function()
	      {
	      	return pathRender(
	      		this,
	      		()=> {
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
	      		},doAPath('creator').bind(this));
	      	return <Path myPath={this.state.myPath}>
	      		{
	      			(function(){
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
					 }).bind(this)()
	      		}</Path>
	      	
	      },

	    
	  })
	},
	deleter:function deleter(name, pluralName, routePart,displayName,actions, store,errorStore, render, paramName)
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
	    	errorStore.mixin,
	    	Navigation
	    ],
	    getInitialState: function () {
	      
	      return {
	      	data:Map(),
	      	index:index++,
	      	myPath:this.props.myPath + '-delete'
	      };
	    },

	    componentWillMount: function () {
	    	init.bind(this)(this.props);
	    	console.log(`${this.state.myPath} : ${this.props.myPath}` );
	    },

	    componentWillUnmount: function () {
	    	actions.dispose(this.state.index);
	    },
	   	componentWillReceiveProps: function (props) 
	    {
	    	init.bind(this)(props);
	    	this.setState(prev=>({data:prev.data.set("dataFetched", false)}));
	    },
	    storeDidChange: function () {
	      	if(!this.state.data.get("finished"))
		    {
		      var s=getState(this.state.index);
		      if(s.item && this.state.data.get("dataFetched")  && !s.item.get("_id"))
		      {
		      	let params = {};
	      		params[paramName]= s.item.get("_id");
	      		this.context.router.transitionTo(this.props.myPath + '-list', _.extend(params, this.props.params));	
		      	//this.setState(prev=>({data:prev.data.set("finished", true)}));
		      }
		      else
		      {
		      	if(s.item.get("_id"))
		      	{
		      		this.setState(prev=>({data:prev.data.set("item", s.item).set("error", s.error).set("dataFetched", true)}));
		      	}
		      }
		    }
	    },

	    del:function() {
	      actions.del({
	      	index:this.state.index,
	      	id:this.state.data.getIn(['item','_id']),
	      	props:this.props
	      });
	    },
		render:  function()
	      {
	      	return pathRender(
	      		this,
	      		()=> {
		      		if(this.state.data.get('item'))
				      {
				       return(
				          <div>
				          	<h4 style={{background:'purple'}}>{this.props.myPath}</h4>
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
	      		},
	      		doAPath('deleter').bind(this)
	      	);
	      	
	      },


	  });
	},
	viewer:function viewer(routePart, displayName,actions, store,errorStore, render, paramName)
	{
	  return React.createClass({
	    displayName: displayName,
	    propTypes: {},
	    mixins: [
	    	PureRenderMixin,
	    	Navigation
	    ],
		getInitialState: function () {  
	      return {
	      	myPath:this.props.myPath  + '-view' 
	      };
	    },

	    render: function () { 
	    	return pathRender(
	      		this,
	      		()=> {
			      if(this.props.item)
			      {	      	
			      	return <div> VIER!!!!!!
			      		{this.state.myPath}
				      		{render(this,this.props.item)}
				      		<RouteHandler {...this.props}  myPath={this.state.myPath} />
				      	</div>
			      }
			      else
			      {
			      	return <div/>
			      }
				}
			);	      
	    }
	  });
	},
	getter:function viewer(routePart, displayName,actions, store,errorStore, render, paramName,menuRender)
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
	    	errorStore.mixin,
	    	Navigation
	    ],

	    getInitialState: function () {
	      
	      return {
	      	data:Map(),
	      	index:index++,
	      	myPath:this.props.myPath
	      };
	    },

	    componentWillMount: function () {
	    	init.bind(this)(this.props);
	    	console.log(`${this.state.myPath} : ${this.props.myPath}` );
	    },

	    componentWillUnmount: function () {
	    	actions.dispose(this.state.index);
	    },

	    componentWillReceiveProps: function (props) 
	    {
	    	if(props.params[paramName]!= this.props.params[paramName])
	    		init.bind(this)(props);
	    },

	    storeDidChange: function () {
	      var s=getState(this.state.index);
	      this.setState(prev=>({data:prev.data.set("item", s.item).set("error", s.error)}));
	    },

	    render: function () {   
	    	return pathRender(
	    		this,
	    		()=> {
			      if(this.state.data.get('item'))
			      {
			       return(
			          <div>
			            <h1>getter {this.state.myPath}</h1>
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
			    },
			    menuRender ? menuRender.bind(this) : doAPath('getter').bind(this)
			 );
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
	  var init= function(props){
		  actions.set({
	  		index:this.state.index,
	  		item:props.item
	  	});
	  };
	  return React.createClass({
	    displayName: displayName,
	    propTypes: {},
	    mixins: [
	    	PureRenderMixin,
	    	store.mixin,
	    	errorStore.mixin,
	    	Navigation
	    ],

	    getInitialState: function () {
	      return {
	      	data:Map(this.props),
	      	index:index++,
	      	myPath:this.props.myPath + '-edit'
	      	
	      };
	    },
		componentWillMount: function () {
			init.bind(this)(this.props);
			console.log(`${this.state.myPath} : ${this.props.myPath}` );
	    },

	    componentWillUnmount: function () {
	    	actions.dispose(this.state.index);
	    },
	    componentWillReceiveProps: function (props) 
	    {
	    	if(props.item!= this.props.item)
	    	{
		    	init.bind(this)(props);
	    	}
	    },
 		storeDidChange: function () {
	      var s=getState(this.state.index);
	      if(s.item!= this.state.data.get("item"))
	      {	
	      	  let initial = s.item.get("_id")!= this.state.data.getIn(["item","_id"]);
		      this.setState(prev=>({initial:initial, data:prev.data.set("item", s.item).set("error", s.error)}));
	  		}
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
	    	return pathRender(
	    		this,
	    		()=> {
			      if(this.state.data.get('item'))
			      {
			      	return (<div>
			      	   <h4 style={{background:'blue'}}>{this.state.myPath}</h4>
			           <Item initial={this.state.initial} handleRawChange= {this.handleRawChange} handleChange={this.handleChange} item={this.state.data.get('item')}/>
			           <Button buttonCallback={this.put} value="Update" />
			           <Error error={this.state.data.get('error')}/>
			        </div>);
			      }
			      else
			      {
			        return (<Error error={this.state.data.get('error')}/>);
			      }
			 	},
			 	doAPath('editor').bind(this)
			 );
	    }
	  });
	},
	listHead:function viewer(name,pluralName,routePart, displayName,render)
	{
	  return React.createClass({
	    displayName: displayName,
	    propTypes: {},
	    mixins: [
	    	PureRenderMixin,
	    	Navigation
	    ],

	    getInitialState: function () {
	      
	      return {
	      	displayName:displayName,
	      	myPath:(this.props.myPath ? this.props.myPath + '-' : '')  + name 
	      };
	    },
	    render: function () {   
	    	return pathRender(
	    		this,
	    		()=>
		          <div>
		          	<h1>list head {this.state.myPath}</h1>
		          	{render(this)}
		          	<h4 style={{background:'yellow'}}>{this.state.myPath}  --  {pluralName + '-' + name}</h4>
		          	<span className="navLink"><Link to={this.state.myPath + '-create'} params={this.props.params}>Create</Link></span>
		          	<RouteHandler {...this.props} myPath={this.state.myPath} />
		          </div>
		          ,
		          doAPath('listhead').bind(this)
		     );
	       
	    }
	  });
	}
	
};