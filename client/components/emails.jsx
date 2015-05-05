// React
import React from "react";
import {addons as ReactAddons} from 'react/addons';
var PureRenderMixin = ReactAddons.PureRenderMixin;
import  {Link} from "react-router";
import crud from "./crud-creator";
import {email as Store} from "../stores/store";
import {email as Actions} from "../actions/actions";

import FormInput from "./formInput";


  



import crudFactory from './crud-factory';

var exp = crudFactory(crud, "emailId", "Email", "Emails", Actions, Store, "emailId")
  .select( 
    (self,nodes)=>
        <div>
          <p>Email Selector:</p>
          <FieldSelect
              name="Emails-selecter"
              value={self.props.value}
              label='title'
              options={nodes()}
              onChange={self.props.onChange}
          />
        </div>
  )
  .view(
    function(self,item){   
      return (
        <div >
           <div>{item.get('title')}</div>
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



