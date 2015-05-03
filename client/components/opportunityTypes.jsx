// React
import React from "react";
import {addons as ReactAddons} from 'react/addons';
var PureRenderMixin = ReactAddons.PureRenderMixin;

import crud from "./crud-creator";
import {opportunityType as Store} from "../stores/store";
import {opportunityType as Actions} from "../actions/actions";

import  {RouteHandler, Link} from "react-router";
import FormInput from "./formInput";


  


export default  
{

  list:crud.lister(
    "OpportunityTypes",
    Actions,
    Store.list,
    Store.error,
    function(nodes){
      var self=this;
      return function () {
        return (
          <div>
            <p>Opportunity Type Bank:</p>
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
          <span><Link to="opportunityType" params={params}>View</Link></span>
          <span><Link to="opportunityType-edit" params={params}>Edit</Link></span>
          <span><Link to="opportunityType-delete" params={params}>Delete</Link></span>
        </div>
        //<Agency agency={data} key={data.get('_id')} />
      );
    }
  ),
  view:crud.viewer (
     "OpportunityTypeView",
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
      "opportunityTypeId"
  ),
  edit:module.exports = crud.editor (
    "OpportunityTypeEdit",
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
     "opportunityTypeId"
  ),
  del:crud.deleter (
    "OpportunityTypeDelete",
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
     "opportunityTypeId"
  ),
  create:crud.creator (
    "OpportunityTypeNew",
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
