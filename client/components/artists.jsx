// React
import React from "react";
import {addons as ReactAddons} from 'react/addons';
var PureRenderMixin = ReactAddons.PureRenderMixin;

import crud from "./crud-creator";
import {artist as Store} from "../stores/store";
import {artist as Actions} from "../actions/actions";

import  {Link} from "react-router";
import FormInput from "./formInput";

import crudFactory from './crud-factory';
import {listedPicture, viewPicture} from "./mix-radio/items";
import {links} from './link/links';



var exp = crudFactory(crud, "artistId", "Artist", "Artists", Actions, Store, "artistId", "id")
  .list().nodeRender(listedPicture)()
  .view().render( (self,data)=>
    <div>
      {viewPicture(self,data)}
      <p>
        {data.get("biography")}
      </p>
    </div>
    
  )()
  .head().menuRender( 
    function(){
      return <div>
        {links([
          {to:"Country-Artist-Album", name:"Albums" },
          {to:"Country-Artist-Single", name:"Singles" },
          {to:"Country-Artist-Track", name:"Tracks" }
        ],this.context.router,this.props.params)}
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


