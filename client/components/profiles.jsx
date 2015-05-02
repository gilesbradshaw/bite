// React
import React from "react";

import crud from "./crud-creator";
import {profile as Store} from "../stores/store";

import {profile as Actions} from "../actions/actions";

import  {RouteHandler, Link} from "react-router";
import FormInput from "./formInput";



export default 
{

  list:crud.lister(
    "Profiles",
    Actions,
    Store.list,
    Store.error,
    function(nodes){
      var self=this;
      return function () {
        return (
          <div>
            <p>Profile Bank:</p>
            {nodes()}
            <RouteHandler {...self.props} />
          </div>
        );
      };
    },
    function (data) {
      var params={profileId:data.get('_id')};
      return (
        <div key={data.get('_id')}>
          <div>{data.get('firstName')}</div>
          <div>{data.get('displayName')}</div>
          <div>{data.get('userName')}</div>
          <span><Link to="profile" params={params}>View</Link></span>
          <span><Link to="profile-edit" params={params}>Edit</Link></span>
          <span><Link to="profile-delete" params={params}>Delete</Link></span>
        </div>
      );
    }
  ),
  view:crud.viewer (
     "ProfileView",
      Actions,
      Store.get,
      Store.error,
      function(){   
        return (
          <div >
             <div>{this.props.item.get('firstName')}</div>
          </div>
        );
      },
      "profileId"
  ),
  edit:module.exports = crud.editor (
    "ProfileEdit",
     Actions,
     Store.get,
     Store.error,
     function(){
        return (
          <div >
             <FormInput id='firstName' title='First Name' value={this.props.item.get('firstName')} onChange={this.props.handleChange('firstName')} />
          </div>
        );
     },
     "profileId"
  ),
  del:crud.deleter (
    "ProfileDelete",
    Actions,
    Store.get,
    Store.error,
    function(){
        return (
          <div >
             <div>{this.props.item.get('profile')}</div>
          </div>
        );
     },
     "profileId"
  ),
  create:crud.creator(
    "ProfileCreate",
    Actions,
    Store.get,
    Store.error,
    function(){
      return (
        <div>
           <FormInput id='firstName' title='First Name' value={this.props.item.get('firstName')} onChange={this.props.handleChange('title')} />
        </div>
      );
    }
  )
}
