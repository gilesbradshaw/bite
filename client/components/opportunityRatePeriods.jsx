// React
import React from "react";
import {addons as ReactAddons} from 'react/addons';
var PureRenderMixin = ReactAddons.PureRenderMixin;
import  {Link} from "react-router";
import crud from "./crud-creator";
import {opportunityRatePeriod as Store} from "../stores/store";
import {opportunityRatePeriod as Actions} from "../actions/actions";

import FormInput from "./formInput";
import FieldSelect from './fieldSelect';


import crudFactory from './crud-factory';

var exp = crudFactory(crud, "opportunityRatePeriodId", "OpportunityRatePeriod","OpportunityRatePeriods", Actions, Store, "opportunityRatePeriodId")
  .select( 
    (self,nodes)=>
        <div>
          <p>Opportunity Rate Period Selector:</p>
          <FieldSelect
              name="OpportunityRatePeriods-selecter"
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
