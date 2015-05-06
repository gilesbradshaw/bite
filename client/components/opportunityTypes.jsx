// React
import React from "react";
import {addons as ReactAddons} from 'react/addons';
var PureRenderMixin = ReactAddons.PureRenderMixin;
import  {Link} from "react-router";
import crud from "./crud-creator";
import {opportunityType as Store} from "../stores/store";
import {opportunityType as Actions} from "../actions/actions";

import FormInput from "./formInput";


import FieldSelect from './fieldSelect';

import crudFactory from './crud-factory';

var exp = crudFactory(crud, "opportunityTypeId", "OpportunityType","OpportunityTypes", Actions, Store, "opportunityTypeId")
  .select( 
    (self,nodes)=>
        <div>
          <p>Opportunity Type Selector:</p>
          <FieldSelect
              name="OpportunityTypes-selecter"
              value={self.props.value}
              label='title'
              options={nodes}
              onChange={self.props.onChange}
          />
        </div>
  )
  .view(
    function(self,item){   
      return (
        <div >
           <div>{item.get('title')}</div>
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
  .make();

export default  exp;
