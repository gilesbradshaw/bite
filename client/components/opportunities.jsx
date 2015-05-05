// React
import React from "react";

import crud from "./crud-creator";
import {opportunity as Store} from "../stores/store";

import {opportunity as Actions} from "../actions/actions";
import  {Link} from "react-router";


import {select as SelectType} from "../components/opportunityTypes";
import {select as SelectStatus} from "../components/opportunityStatuses";
import {select as SelectRatePeriod} from "../components/opportunityRatePeriods";
import {select as SelectAgentRating} from "../components/opportunityAgentRatings";
import {select as SelectProfile} from "../components/profiles";

import FormInput from "./formInput";

import Select from "react-select";
import css from "../styles/selectdefault.css"

import crudFactory from './crud-factory';


var exp = crudFactory(crud, "opportunityId", "Opportunity", "Opportunities", Actions, Store, "opportunityId")
  .select( 
    (self,nodes)=>
        <div>
          <p>Opportunity Type Selector:</p>
          <FieldSelect
              name="Opportunities-selecter"
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
            <SelectProfile value={this.props.item.getIn(["user", "displayName"])} onChange={this.props.handleRawChange('user')}/>
            <SelectType value={this.props.item.getIn(["type", "title"])} onChange={this.props.handleRawChange('type')}/>
            <SelectStatus value={this.props.item.getIn(["status", "title"])} onChange={this.props.handleRawChange('status')}/>
            <SelectRatePeriod value={this.props.item.getIn(["ratePeriod", "title"])} onChange={this.props.handleRawChange('ratePeriod')}/>
            <SelectAgentRating value={this.props.item.getIn(["agentRating", "title"])} onChange={this.props.handleRawChange('agentRating')}/>  
             <FormInput id='title' title='Title' value={this.props.item.get('title')} onChange={this.props.handleChange('title')} />
          </div>
        );
     }
  )
  .create(
    function(){
        return (
          <div>
            <SelectProfile value={this.props.item.getIn(["user", "displayName"])} onChange={this.props.handleRawChange('user')}/>
            <SelectType value={this.props.item.getIn(["type", "title"])} onChange={this.props.handleRawChange('type')}/>
            <SelectStatus value={this.props.item.getIn(["status", "title"])} onChange={this.props.handleRawChange('status')}/>
            <SelectRatePeriod value={this.props.item.getIn(["ratePeriod", "title"])} onChange={this.props.handleRawChange('ratePeriod')}/>
            <SelectAgentRating value={this.props.item.getIn(["agentRating", "title"])} onChange={this.props.handleRawChange('agentRating')}/>  
             <FormInput id='title' title='Title' value={this.props.item.get('title')} onChange={this.props.handleChange('title')} />
          </div>
        );
     }
  )
  .make();

export default  exp;


