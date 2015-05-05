// React
import React from "react";

import crud from "./crud-creator";
import {profile as Store} from "../stores/store";

import {profile as Actions} from "../actions/actions";

import  {RouteHandler, Link} from "react-router";
import FormInput from "./formInput";
import FieldSelect from './fieldSelect';

import crudFactory from './crud-factory';

var exp = crudFactory(crud, "Profiles", Actions, Store, "profileId")
  .head(
    function(){   
      return (
        <div >
           <h1>{this.props.item.get('displayName')}</h1>
        </div>
      );
    }
  )
  .select( 
    (self,nodes)=>
        <div>
          <p>Profile selector:</p>
            <FieldSelect
                name="Profiles-selecter"
                value={self.props.value}
                label='displayName'
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
            <p>Profile Bank:</p>
            <span className="navLink"><Link to="profile">Create</Link></span>
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
          <span><Link to="profile-view" params={params}>View</Link></span>
          <span><Link to="profile-edit" params={params}>Edit</Link></span>
          <span><Link to="profile-delete" params={params}>Delete</Link></span>
        </div>
        //<Agency agency={data} key={data.get('_id')} />
      );
    }
  )
  .view(
    function(){   
      return (
        <div >
          <div>{this.props.item.get('firstName')}</div>
        </div>
      );
    }
  )
  .del(
    function(){
      return (
        <div >
           <div>{this.props.item.get('firstName')}</div>
        </div>
      );
    }
  )
  .edit(
     function(){
        return (
          <div>
            <FormInput id='firstName' title='First Name' value={this.props.item.get('firstName')} onChange={this.props.handleChange('firstName')} />
          </div>
        );
     }
  )
  .create(
    function(){
        return (
          <div>
            <FormInput id='firstName' title='First Name' value={this.props.item.get('firstName')} onChange={this.props.handleChange('title')} />
          </div>
        );
     }
  )
  .make();

export default  exp;



