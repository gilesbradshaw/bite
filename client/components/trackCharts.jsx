// React
import React from "react";
import {addons as ReactAddons} from 'react/addons';
var PureRenderMixin = ReactAddons.PureRenderMixin;

import crud from "./crud-creator";
import {trackChart as Store} from "../stores/store";
import {trackChart as Actions} from "../actions/actions";

import  {Link} from "react-router";
import FormInput from "./formInput";

import crudFactory from './crud-factory';
import {listedTrack, viewPicture} from "./mix-radio/items";




var exp = crudFactory(crud, "trackId", "TrackChart", "TrackCharts", Actions, Store, "trackId", "id")
  .listHead().render()()
  .list().nodeRender(listedTrack)
  .menuLinks(
    (self,data,params)=>{
      return  [
        {title:'View', path:"Country-Track-view"},
        {title:'Edit',path:"Country-Track-edit"},
        {title:'Delete',path:"Country-Track-delete"},
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


