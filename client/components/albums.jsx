// React
import React from "react";
import {addons as ReactAddons} from 'react/addons';
var PureRenderMixin = ReactAddons.PureRenderMixin;

import crud from "./crud-creator";
import {album as Store} from "../stores/store";
import {album as Actions} from "../actions/actions";

import  {Link} from "react-router";
import FormInput from "./formInput";

import crudFactory from './crud-factory';
import {listedPicture, viewPicture} from "./mix-radio/items";
import {links} from './link/links';


var exp = crudFactory(crud, "albumId", "Album", "Albums", Actions, Store, "albumId", "id")
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
  .head().menuRender( 
    function(){
      return <div>
        {links([
          {to:"Country-Album-Track", name:"Tracks" }
        ],this.context.router,this.props.params)}
      </div>
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


