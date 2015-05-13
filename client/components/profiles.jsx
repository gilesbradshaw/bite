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
  .head().render((self,item)=>
    <div>
       <h1>{item.get('displayName')}</h1>
    </div>
  )()
  .select().renderer(
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
  )()
  .list().nodeRender(
      (data) => <div>{data.get('displayName')}</div>
  )()
  .view().render(
    function(self,item){   
      return (
        <div >
          <div>{item.get('firstName')}</div>
        </div>
      );
    }
  )()
  .del().render(
    function(){
      return (
        <div >
           <div>{this.props.item.get('firstName')}</div>
        </div>
      );
    }
  )()
  .edit().render(
     function(){
        return (
          <div>
            <FormInput id='firstName' title='First Name' value={this.props.item.get('firstName')} onChange={this.props.handleChange('firstName')} />
          </div>
        );
     }
  )()
  .create().render( (self)=>
    <div>
      <FormInput id='firstName' title='First Name' value={self.props.item.get('firstName')} onChange={self.props.handleChange('title')} />
    </div>
  )()
  .make();

export default  exp;



