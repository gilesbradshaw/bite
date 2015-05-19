import React from "react";
import {addons as ReactAddons} from 'react/addons';
var PureRenderMixin = ReactAddons.PureRenderMixin;
import {Map,toJS} from "immutable";
// Router
import  {Link,PropTypes,Navigation, RouteHandler} from "react-router";
import _ from 'lodash';
import Error from "./error";
import Button from "./button";
import reactMixin from 'react-mixin';
import {Enhance} from "./higherOrder/enhance"
import {pathRender} from './Path';
import {PathDisplay} from "./path-display";
import {Grid,Row,Col} from 'react-flexgrid';
import style from './styles/style';
import currentUser from './decorators/current-user';
import userStore from '../stores/user-current-store';
import flatten from './utils/flatten';


var index=0;



const createClass = (c)=>
{
	c.contextTypes= _.extend(c.contextTypes||{}, {
		routeDepth: PropTypes.number.isRequired,
		router: PropTypes.router.isRequired
	});
	return React.createClass(c);
}

const nullPath= (name)=> function()
	{
		return <script key={name} />
	}



const crudcreator= (name, itemId)=>(titleRender, footerRender)=> {
	itemId=itemId||'_id';
	return {
		lister:function lister(singleId,pluralName,displayName,actions, store,errorStore, itemRender, render, menuLinks)
		{
		// Component
		  function getState(index) {
		    return {
		      store: store.get(index),
		      error: errorStore.get(index),
		      user:userStore.getCurrentUser()
		    };
		  }
		  function nodes (items) {
		  	  const self =this;
		  	  return items.map( (data)=>
		      {
		  	  	const params = _.extend({[singleId] : data.get(itemId)},self.props.params);
		  	  	
		  	   	return <Row start='xs' className='item-row' middle={['xs']} key={data.get(itemId)} style={style.row}>
		  	   		 
			          {flatten(menuLinks(self,data,params)).map(link=><Col key={`$index}:${data.get(itemId)}-${link.title}`} md={1} sm={2} ><Link to={link.path} params={params}>{link.render ? link.render() : link.title}</Link></Col>)}			          
			          {itemRender(data,self)}
		  	      	</Row>
		         }
	      	  );
		  }

		  return createClass({
		    displayName: displayName,
		    mixins: [
		    	PureRenderMixin,
		    	store.mixin,
		    	errorStore.mixin,
		    	userStore.mixin,
		    	Navigation
		    ],
		    propTypes: {
	    		onChange: React.PropTypes.func,
	  		},


		    getInitialState() {
		      return {
		      	data:Map(getState(index)),
		      	index:index++,
				myPath:this.props.myPath

		      };
		    },

		    componentWillMount() {
		      actions.load(
		      	{
		      		index:this.state.index,
		      		props:this.props
		      	});
		    },

		    componentWillUnmount() {
		    	actions.dispose(this.state.index);
		    },
		    storeDidChange() {
		    	var s=getState(this.state.index);
		    	this.setState(prev=>
		    		({
		    			data:prev.data.set("store", s.store).set("error", s.error)
		    		})
		    	);
		    },
		    componentWillReceiveProps(props) 
		    {
		    },

		    render()
		      {
		      	var res=this.state.data.get('store').toArray();
		      	return pathRender(
		      		this,
		      		()=> 
		      			<div>
		      				{titleRender?
				      			<h1>
				      				{titleRender(this)}
				      			</h1>
				      		:null}
							{render
								? render(this,res).bind(this)()
								: <Grid fluid> 
					      			{nodes.bind(this)(res)}
						  			<RouteHandler myPath={this.state.myPath} {...this.props} />
					      		</Grid>
							}

		      			</div>
		      		,
			      	nullPath('lister').bind(this)
	    	  	);
		      }
		  });
		},
		creator:function creator(pluralName, routePart, displayName,actions, store,errorStore, render, paramName)
		{
		  // Component
		  function getState(index) {
		  	return {
		      item:store.get(index),
		      error:errorStore.get(index)
		    };
		  }
		  var Item = createClass({
		  	mixins:[PureRenderMixin,Navigation],
		    displayName: displayName+'Item', 
		    render: function(){
		    	return render(this);
		    }
		  });
		  return createClass({
		    displayName: displayName,
		    propTypes: {},
		    mixins: [
		    	PureRenderMixin,
		    	store.mixin,
		    	errorStore.mixin,
		    	Navigation
		    ],

		    getInitialState() {	      
		      return {
		      	data:Map(),
		      	index:index++,
		      	myPath:this.props.myPath + '-create'
		      };
		    },

		    componentWillMount() {
		      actions.set(
		      	{
		      		index:this.state.index
		      	});
		    },

		    componentWillUnmount() {
		    	actions.dispose(this.state.index);
		    },

		    storeDidChange() {
		      var s=getState(this.state.index);
		      if(s.item.get("_id"))
		      {
		      	let params = {};
		      	params[paramName]= s.item.get(itemId);
		      	this.context.router.transitionTo(this.props.myPath + "-edit", _.extend(params, this.props.params));	
		      }
		      else
		      {
		      	this.setState(prev=>({data:prev.data.set("item", s.item).set("error", s.error)}));
		      }
		    },

		    handleChange(field){
		      return function(evt){
		      	actions.set({
		      		index:this.state.index,
		      		item:this.state.data.setIn(['item',field],evt.target.value).get('item')
		      	});
		      }.bind(this);
		    },
		    handleRawChange(field){
		      return function(evt, value){
		      	actions.set({
		      		index:this.state.index,
		      		item:this.state.data.setIn(['item',field],evt).get('item')
		      	});
		      }.bind(this);
		    },
		    post() {
		      //I dont understand why router is only available now

		      actions.post({
		      	index:this.state.index,
		      	item:this.state.data.get('item'),
		      	props:this.props,
		      	//router:this.context.router
		      });
		      
		    },
	   	    render()
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
		      		},nullPath('creator').bind(this));
		      },

		    
		  })
		},
		deleter:function deleter( pluralName, routePart,displayName,actions, store,errorStore, render, paramName)
		{
		  // Component
		  function getState(index) {
		    return {
		      item:store.get(index)||null,
		      error:errorStore.get(index)
		    };
		  }
		  var Item = createClass({
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


		  return createClass({
		  	displayName: displayName,
		    propTypes: {},
		    mixins: [
		    	PureRenderMixin,
		    	store.mixin,
		    	errorStore.mixin,
		    	Navigation
		    ],
		    getInitialState() {
		      
		      return {
		      	data:Map(),
		      	index:index++,
		      	myPath:this.props.myPath + '-delete'
		      };
		    },

		    componentWillMount() {
		    	init.bind(this)(this.props);
		    },

		    componentWillUnmount() {
		    	actions.dispose(this.state.index);
		    },
		   	componentWillReceiveProps(props) 
		    {
		    	init.bind(this)(props);
		    	this.setState(prev=>({data:prev.data.set("dataFetched", false)}));
		    },
		    storeDidChange() {
		      	if(!this.state.data.get("finished"))
			    {
			      var s=getState(this.state.index);
			      if(s.item && this.state.data.get("dataFetched")  && !s.item.get("_id"))
			      {
			      	let params = {};
		      		params[paramName]= s.item.get(itemId);
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

		    del() {
		      actions.del({
		      	index:this.state.index,
		      	id:this.state.data.getIn(['item',itemId]),
		      	props:this.props
		      });
		    },
			render()
		      {
		      	return pathRender(
		      		this,
		      		()=> {
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
		      		},
		      		nullPath('deleter').bind(this)
		      	);
		      	
		      },


		  });
		},
		viewer:function viewer(routePart, displayName,actions, store,errorStore, render, paramName)
		{
		  return createClass({
		  	
		    displayName: displayName,
		    propTypes: {},
		    mixins: [
		    	PureRenderMixin,
		    	Navigation
		    ],
			getInitialState() {  
		      return {
		      	myPath:this.props.myPath  + '-view' 
		      };
		    },

		    render() { 
		    	var route = this.context.router.getRouteAtDepth(this.context.routeDepth);
		    	return pathRender(
		      		this,
		      		()=> {
				      if(this.props.item)
				      {	      	
				      	return <div>
				      		{titleRender?
				      			<Grid fluid >
				      				{flatten(titleRender(this,this.props.item).filter(l=>l).map(item=>
				      					[
				      					<Row center='xs' key='title' >
				      						<Col><h1>{item.field}</h1></Col>
				      					</Row>
				      					,
				      					<Row center='xs' key='text'>
				      						<Col xs={0} ><h4>{item.render()}</h4></Col>
				      					</Row>
				      					]
				      				))}
				      			</Grid>
				      		:null}
				      		{render(this,this.props.item)}
				      		{footerRender?
				      			<Grid fluid>
				      				{flatten(flatten(footerRender(this,this.props.item)).filter(l=>l).map(item=>
				      					[
					      					<Row center='xs' key={'title-' + item.field} top='xs'>
					      						<Col><h4>{item.field}</h4></Col>		
					      					</Row>
					      				,
					      					<Row center='xs' key={item.field} top='xs'>
					      						<Col  xs={0} >{item.render()}</Col>
					      					</Row>
				      					]
				      				))}
				      			</Grid>
				      		:null}
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

		  return createClass({
		    displayName: displayName,
		    propTypes: {},
		    mixins: [
		    	PureRenderMixin,
		    	store.mixin,
		    	errorStore.mixin,
		    	Navigation
		    ],

		    getInitialState() {
		      return {
		      	data:Map(),
		      	index:index++,
		      	myPath:this.props.myPath
		      };
		    },

		    componentWillMount() {
		    	init.bind(this)(this.props);
		    },

		    componentWillUnmount() {
		    	actions.dispose(this.state.index);
		    },

		    componentWillReceiveProps(props) 
		    {
		    	if(props.params[paramName]!= this.props.params[paramName])
		    		init.bind(this)(props);
		    },

		    storeDidChange() {
		      var s=getState(this.state.index);
		      this.setState(prev=>({data:prev.data.set("item", s.item).set("error", s.error)}));
		    },

		    render() {   
		    	return pathRender(
		    		this,
		    		()=> {

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
				    },
				    menuRender ? menuRender.bind(this) : nullPath('getter').bind(this)
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
		  var Item = createClass({
		    displayName: displayName+'Item', 
		    render: render
		  });
		  var init= function(props){
			  actions.set({
		  		index:this.state.index,
		  		item:props.item
		  	});
		  };
		  return createClass({
		    displayName: displayName,
		    propTypes: {},
		    mixins: [
		    	PureRenderMixin,
		    	store.mixin,
		    	errorStore.mixin,
		    	Navigation
		    ],

		    getInitialState() {
		      return {
		      	data:Map(this.props),
		      	index:index++,
		      	myPath:this.props.myPath + '-edit'
		      	
		      };
		    },
			componentWillMount() {
				init.bind(this)(this.props);
		    },

		    componentWillUnmount() {
		    	actions.dispose(this.state.index);
		    },
		    componentWillReceiveProps(props) 
		    {
		    	if(props.item!= this.props.item)
		    	{
			    	init.bind(this)(props);
		    	}
		    },
	 		storeDidChange() {
		      var s=getState(this.state.index);
		      if(s.item!= this.state.data.get("item"))
		      {	
		      	  let initial = s.item.get("_id")!= this.state.data.getIn(["item","_id"]);
			      this.setState(prev=>({initial:initial, data:prev.data.set("item", s.item).set("error", s.error)}));
		  		}
		    },
		    handleChange(field){
		      return function(evt){
		      	actions.set({
		      		index:this.state.index,
		      		item:this.state.data.setIn(['item',field],evt.target.value).get('item')
		      	});
		      }.bind(this);
		    },
		    handleRawChange(field){
		      return function(evt, value){
		      	actions.set({
		      		index:this.state.index,
		      		item:this.state.data.setIn(['item',field],evt).get('item')
		      	});
		      }.bind(this);
		    },
		    put() {
		      actions.put({
		      	id:this.state.data.getIn(['item',itemId]),
		      	index:this.state.index,
		      	item:this.state.data.get('item'),
		      	props:this.props
		      });
		    },

		    render() {   
		    	return pathRender(
		    		this,
		    		()=> {
				      if(this.state.data.get('item'))
				      {
				      	return (<div>
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
				 	nullPath('editor').bind(this)
				 );
		    }
		  });
		},
		listHead:function viewer(pluralName,routePart, displayName,render)
		{
		  return createClass({
		    displayName: displayName,
		    propTypes: {},
		    mixins: [
		    	PureRenderMixin,
		    	Navigation
		    ],

		    getInitialState() {
		      
		      return {
		      	displayName:displayName,
		      	myPath:(this.props.myPath ? this.props.myPath + '-' : '')  + name 
		      };
		    },
		    render() {
		    	return pathRender(
		    		this,
		    		()=>
			          <div>
			          	{titleRender?
			      			<h1>
			      				{titleRender(this)}
			      			</h1>
				      	:null}
			          	{render? render(this): <script/>}		          	
			          	<RouteHandler {...this.props} myPath={this.state.myPath} />
			          </div>
			          ,
			          nullPath('listhead').bind(this)
			     );
		       
		    }
		  });
		}
	  }
};
export default crudcreator