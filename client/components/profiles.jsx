// React
import React from "react";
import  {Link} from "react-router";
import crud from "./crud-creator";
import {profile as Store} from "../stores/store";

import {profile as Actions} from "../actions/actions";

import FormInput from "./formInput";
import FieldSelect from './fieldSelect';

import crudFactory from './crud-factory';

var exp = crudFactory(crud, "profileId", "Profile", "Profiles", Actions, Store, "profileId")
  .head((self,item)=>
    <div>
       <h1>{item.get('displayName')}</h1>
    </div>
  )
  .select( 
    (self,nodes)=>
        <div>
          <p>Profile selector:</p>
            <FieldSelect
                name="Profiles-selecter"
                value={self.props.value}
                label='displayName'
                options={nodes}
                onChange={self.props.onChange}
            />
        </div>
  )
  .view(
    function(self,item){   
      return (
        <div >
          <div>{item.get('firstName')}</div>
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



