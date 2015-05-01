// React
import React from "react";

import crud from "./crud-creator";
import {opportunity as Store} from "../stores/store";

import {opportunity as Actions} from "../actions/actions";

import  {RouteHandler, Link} from "react-router";
import FormInput from "./formInput";



export default 
{

  list:crud.lister(
    "Opportunities",
    Actions,
    Store.list,
    Store.error,
    function(nodes){
      var self=this;
      return function () {
        return (
          <div>
            <p>Opportunity Bank:</p>
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
          <span><Link to="opportunity" params={params}>View</Link></span>
          <span><Link to="opportunity-edit" params={params}>Edit</Link></span>
          <span><Link to="opportunity-delete" params={params}>Delete</Link></span>
        </div>
      );
    }
  ),
  view:crud.viewer (
     "OpportunityView",
      Actions,
      Store.get,
      Store.error,
      function(){   
        return (
          <div >
             <div>{this.props.item.get('title')}</div>
          </div>
        );
      },
      "opportunityId"
  ),
  edit:module.exports = crud.editor (
    "OpportunityEdit",
     Actions,
     Store.get,
     Store.error,
     function(){
        return (
          <div >
             <FormInput id='title' title='Title' value={this.props.item.get('title')} onChange={this.props.handleChange('title')} />
          </div>
        );
     },
     "opportunityId"
  ),
  del:crud.deleter (
    "OpportunityDelete",
    Actions,
    Store.get,
    Store.error,
    function(){
        return (
          <div >
             <div>{this.props.item.get('title')}</div>
          </div>
        );
     },
     "agentId"
  ),
  create:crud.creator(
    "OpportunityCreate",
    Actions,
    Store.get,
    Store.error,
    function(){
      return (
        <div>
           <FormInput id='title' title='Title' value={this.props.item.get('title')} onChange={this.props.handleChange('title')} />
        </div>
      );
    }
  )
}
