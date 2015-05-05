// React
import React from "react";
import {addons as ReactAddons} from 'react/addons';
var PureRenderMixin = ReactAddons.PureRenderMixin;

import crud from "./crud-creator";
import {opportunityType as Store} from "../stores/store";
import {opportunityType as Actions} from "../actions/actions";

import  {RouteHandler, Link} from "react-router";
import FormInput from "./formInput";


import FieldSelect from './fieldSelect';

import crudFactory from './crud-factory';

var exp = crudFactory(crud, "OpportunityType", Actions, Store, "opportunityTypeId")
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
          <p>Opportunity Type Selector:</p>

          <FieldSelect
              name="OpportunityTypes-selecter"
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
            <p>Opportunity Type Bank:</p>
            <span className="navLink"><Link to="opportunityType">Create</Link></span>
            {nodes()}
            <RouteHandler {...self.props} />
          </div>
        );
      };
    },
    function (data) {
      var params={opportunityTypeId:data.get('_id')};
      return (
        <div key={data.get('_id')}>
          <div>{data.get('title')}</div>
          <span><Link to="opportunityType-view" params={params}>View</Link></span>
          <span><Link to="opportunityType-edit" params={params}>Edit</Link></span>
          <span><Link to="opportunityType-delete" params={params}>Delete</Link></span>
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
