// React
import React from "react";
import {addons as ReactAddons} from 'react/addons';
var PureRenderMixin = ReactAddons.PureRenderMixin;

import crud from "./crud-creator";
import {opportunityStatus as Store} from "../stores/store";
import {opportunityStatus as Actions} from "../actions/actions";

import  {RouteHandler, Link} from "react-router";
import FormInput from "./formInput";


import FieldSelect from './fieldSelect';

import crudFactory from './crud-factory';

  
var exp = crudFactory(crud, "OpportunityStatus", Actions, Store, "opportunityStatusId")
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
          <p>Opportunity Status Selector:</p>
          <FieldSelect
              name="OpportunityStatuses-selecter"
              value={self.props.value}
              label='title'
              options={nodes()}
              onChange={self.props.onChange}
          />
          <RouteHandler {...self.props} />
        </div>
  )
  .list(
    function(nodes){
      var self=this;
      return function () {
        return (
          <div>
            <p>Opportunity Status Bank:</p>
            <span className="navLink"><Link to="opportunityStatus">Create</Link></span>
            {nodes()}
            <RouteHandler {...self.props} />
          </div>
        );
      };
    },
    function (data) {
      var params={opportunityStatusId:data.get('_id')};
      return (
        <div key={data.get('_id')}>
          <div>{data.get('title')}</div>
          <span><Link to="opportunityStatus-view" params={params}>View</Link></span>
          <span><Link to="opportunityStatus-edit" params={params}>Edit</Link></span>
          <span><Link to="opportunityStatus-delete" params={params}>Delete</Link></span>
        </div>
        //<Agency agency={data} key={data.get('_id')} />
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
