// React
import React from "react";

import crud from "./crud-creator";
import {agent as Store} from "../stores/store";

import {agent as Actions} from "../actions/actions";

import  {RouteHandler, Link} from "react-router";
import FormInput from "./formInput";


import crudFactory from './crud-factory';

var exp = crudFactory(crud, "Agent", Actions, Store, "agentId")
  .head(
    function(){   
      return (
        <div >
           <h1>{this.props.item.get('title')}</h1>
        </div>
      );
    }
  )
  .select( 
    (self,nodes)=>
        <div>
          <p>Agent Selector:</p>
          <FieldSelect
              name="Agents-selecter"
              value={self.props.value}
              label='title'
              options={nodes()}
              onChange={self.props.onChange}
          />
          <RouteHandler myPath={self.state.myPath} {...self.props} />
        </div>
  )
  .list(
    function(nodes){
      var self=this;
      return function () {
        return (
          <div>
            <p>Agent Bank:</p>
            <span className="navLink"><Link to="agent">Create</Link></span>
            {nodes()}
            <RouteHandler myPath={self.state.myPath} {...self.props} />
          </div>
        );
      };
    },
    function (data) {
      var params={agentId:data.get('_id')};
      return (
        <div key={data.get('_id')}>
          <div>{data.get('title')}</div>
          <span><Link to="agent-view" params={params}>View</Link></span>
          <span><Link to="agent-edit" params={params}>Edit</Link></span>
          <span><Link to="agent-delete" params={params}>Delete</Link></span>
        </div>
      );
    }
  )
  .view(
    function(){   
      return (
        <div >
           <div>{this.props.item.get('title')}</div>
        </div>
      );
    }
  )
  .del(
    function(){
      return (
        <div >
           <div>{this.props.item.get('title')}</div>
        </div>
      );
    }
  )
  .edit(
     function(){
        return (
          <div >
             <FormInput id='title' title='Title' value={this.props.item.get('title')} onChange={this.props.handleChange('title')} />
          </div>
        );
     }
  )
  .create(
    function(){
        return (
          <div>
             <FormInput id='title' title='Title' value={this.props.item.get('title')} onChange={this.props.handleChange('title')} />
          </div>
        );
     }
  )
  .make();

export default  exp;


