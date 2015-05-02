// React
import React from "react";
import {addons as ReactAddons} from 'react/addons';
var PureRenderMixin = ReactAddons.PureRenderMixin;

import crud from "./crud-creator";
import {email as Store} from "../stores/store";
import {email as Actions} from "../actions/actions";

import  {RouteHandler, Link} from "react-router";
import FormInput from "./formInput";


  


export default  
{

  list:crud.lister(
    "Emails",
    Actions,
    Store.list,
    Store.error,
    function(nodes){
      var self=this;
      return function () {
        return (
          <div>
            <p>Email Bank:</p>
            {nodes()}
            <RouteHandler {...self.props} />
          </div>
        );
      };
    },
    function (data) {
      var params={emailId:data.get('_id')};
      return (
        <div key={data.get('_id')}>
          <div>{data.get('title')}</div>
          <span><Link to="email" params={params}>View</Link></span>
          <span><Link to="email-edit" params={params}>Edit</Link></span>
          <span><Link to="email-delete" params={params}>Delete</Link></span>
        </div>
      );
    }
  ),
  view:crud.viewer (
     "EmailView",
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
      "emailId"
  ),
  edit:module.exports = crud.editor (
    "EmailEdit",
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
     "emailId"
  ),
  del:crud.deleter (
    "EmailDelete",
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
     "emailId"
  ),
  create:crud.creator (
    "EmailNew",
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
