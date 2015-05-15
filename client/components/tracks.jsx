// React
import React from "react";
import {addons as ReactAddons} from 'react/addons';
var PureRenderMixin = ReactAddons.PureRenderMixin;

import crud from "./crud-creator";
import {track as Store} from "../stores/store";
import {track as Actions} from "../actions/actions";

import  {Link} from "react-router";
import FormInput from "./formInput";

import crudFactory from './crud-factory';
import {listedPicture, viewPicture} from "./mix-radio/items";



var exp = crudFactory(crud, "trackId", "Track", "Tracks", Actions, Store, "trackId", "id")
  .list().nodeRender(listedPicture)()
  .view().render( (self,data)=>
    <div>
    {viewPicture(self,data)}
    <audio controls src={data.getIn(['samples', 'wmamms'])}/>
    </div>
    
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


