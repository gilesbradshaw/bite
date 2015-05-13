// React
import React from "react";
import  {Link} from "react-router";

import crud from "./crud-creator";
import {agent as Store} from "../stores/store";

import {agent as Actions} from "../actions/actions";

import FormInput from "./formInput";


import crudFactory from './crud-factory';

var exp = crudFactory(crud, "agentId", "Agent", "Agents", Actions, Store, "agentId")
  .select().renderer(
    (self,nodes)=>
        <div>
          <p>Agent Selector:</p>
          <FieldSelect
              name="Agents-selecter"
              value={self.props.value}
              label='title'
              options={nodes}
              onChange={self.props.onChange}
          />
        </div>
  )()
  .view().render(
    function(self,item){   
      return (
        <div >
           <div>{item.get('title')}</div>
        </div>
      );
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


