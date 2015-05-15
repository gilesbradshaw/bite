// React
import React from "react";
import {addons as ReactAddons} from 'react/addons';
var PureRenderMixin = ReactAddons.PureRenderMixin;

import crud from "./crud-creator";
import {albumChart as Store} from "../stores/store";
import {albumChart as Actions} from "../actions/actions";

import  {Link} from "react-router";
import FormInput from "./formInput";

import crudFactory from './crud-factory';
import {listedPicture, viewPicture} from "./mix-radio/items";




var exp = crudFactory(crud, "albumId", "AlbumChart", "AlbumCharts", Actions, Store, "albumId", "id")
  .list().nodeRender(listedPicture)
  .menuLinks(
    (self,data,params)=>{
      return  [
        {title:'View', path:"Country-Album-view"},
        {title:'Edit',path:"Country-Album-edit"},
        {title:'Delete',path:"Country-Album-delete"},
      ]
    }
  )()
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


