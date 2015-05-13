// React
import React from "react";
import {addons as ReactAddons} from 'react/addons';
var PureRenderMixin = ReactAddons.PureRenderMixin;

import crud from "./crud-creator";
import {agency as Store} from "../stores/store";
import {agency as Actions} from "../actions/actions";

import  {Link} from "react-router";
import FormInput from "./formInput";

import crudFactory from './crud-factory';




var exp = crudFactory(crud, "agencyId", "Agency", "Agencies", Actions, Store, "agencyId")
  .select().renderer(
    (self,nodes)=>
        <div>
          <FieldSelect
              name="Agencies-selecter"
              value={self.props.value}
              label='title'
              options={nodes}
              onChange={self.props.onChange}
          />
        </div>
  )()
  .view().render(
    (self,item)=>   
    {
        return <div >
           <div>{item.get('title')}</div>
        </div>
      }
  )()
  .del().render(
    function(){
      return (
        <div >
           <div>{this.props.item.get('title')}</div>
        </div>
      );
    }
  )()
  .edit().render(
     function(){
        return (
          <div >
             <FormInput id='title' title='Title' value={this.props.item.get('title')} onChange={this.props.handleChange('title')} />
          </div>
        );
     }
  )()
  
  .make();

export default  exp;


