// React
import React from "react";

import crud from "./crud-creator";
import {opportunity as Store} from "../stores/store";

import {opportunity as Actions} from "../actions/actions";

import {select as SelectType} from "../components/opportunityTypes";
import {select as SelectStatus} from "../components/opportunityStatuses";
import {select as SelectRatePeriod} from "../components/opportunityRatePeriods";
import {select as SelectAgentRating} from "../components/opportunityAgentRatings";
import {select as SelectProfile} from "../components/profiles";

import  {RouteHandler, Link} from "react-router";
import FormInput from "./formInput";

import Select from "react-select";
import css from "../styles/selectdefault.css"

import crudFactory from './crud-factory';


var exp = crudFactory(crud, "Opportunity", Actions, Store, "opportunityId")
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
              name="Opportunities-selecter"
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
            <p>Opportunity:</p>
            <div >{self.state.myPath}</div>
            <span className="navLink"><Link to="opportunity">Create</Link></span>
            {nodes()}
            <RouteHandler {...self.props} />
          </div>
        );
      };
    },
    function (data) {
      var params={opportunityId:data.get('_id')};
      return (
        <div key={data.get('_id')}>
          <div>{data.get('title')}</div>
          <span><Link to="opportunity-view" params={params}>View</Link></span>
          <span><Link to="opportunity-edit" params={params}>Edit</Link></span>
          <span><Link to="opportunity-delete" params={params}>Delete</Link></span>
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
             <FormInput id='title' title='Title' value={this.props.item.get('title')} onChange={this.props.handleChange('title')} />
          </div>
        );
     }
  )
  .make();

export default  exp;


