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
  .select( 
    (self,nodes)=>
        <div>
          <p>Agency Selector:</p>
          <FieldSelect
              name="Agencies-selecter"
              value={self.props.value}
              label='title'
              options={nodes()}
              onChange={self.props.onChange}
          />
        </div>
  )
  .view(
    (self,item)=>   
    {
        return <div >
           <div>{item.get('title')}</div>
        </div>
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


