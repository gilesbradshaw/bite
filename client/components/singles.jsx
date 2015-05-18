// React
import React from "react";
import {addons as ReactAddons} from 'react/addons';
var PureRenderMixin = ReactAddons.PureRenderMixin;

import crud from "./crud-creator";
import {single as Store} from "../stores/store";
import {single as Actions} from "../actions/actions";

import  {Link} from "react-router";
import FormInput from "./formInput";

import crudFactory from './crud-factory';
import {listedPicture, viewPicture, menuPicture} from "./mix-radio/items";
import {links} from './link/links';




var exp = crudFactory(crud, "singleId", "Single", "Singles", Actions, Store, "singleId", "id")
  .list().nodeRender(listedPicture)()
  .view().render(viewPicture)()
  .del().render(
    function(){
      return (
        <div >
           <div>{this.props.item.get('title')}</div>
        </div>
      );
    }
  )()
  .listHead().render()()
  .head().menuRender( 
    function(isRoute){
      return links([
        {to:"Country-Single-view", name:"Single", isLeaf:true, linkedIf:"Single", render:menuPicture(this.state.data)},       
        {to:"Country-Single-Track-list", name:"Tracks" , linkedIf:"Country-Single-Track" }
      ],this.context.router,this.props.params,isRoute);
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


