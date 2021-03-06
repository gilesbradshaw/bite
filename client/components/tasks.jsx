// React
import React from "react";
import {addons as ReactAddons} from 'react/addons';
var PureRenderMixin = ReactAddons.PureRenderMixin;
import  {Link} from "react-router";
import crud from "./crud-creator";
import {task as Store} from "../stores/store";
import {task as Actions} from "../actions/actions";

import FormInput from "./formInput";


  


import crudFactory from './crud-factory';

var exp = crudFactory(crud, "taskId", "Task", "Tasks", Actions, Store, "taskId")
  .select().renderer(
    (self,nodes)=>
        <div>
          <p>Task Selector:</p>
          <FieldSelect
              name="Tasks-selecter"
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
           <div>{item.get('title')}</div> ok!!!
          
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
             <FormInput id='title' title='Title' initial={this.props.initial} value={this.props.item.get('title')} onChange={this.props.handleChange('title')} />
          </div>
        );
     }
  )()
  .make();

export default  exp;



