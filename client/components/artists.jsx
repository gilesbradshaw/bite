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
import {listedPicture, viewPicture,menuPicture} from "./mix-radio/items";
import {links} from './link/links';



var exp = crudFactory(crud, "artistId", "Artist", "Artists", Actions, Store, "artistId", "id")
  .listHead().render()()
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
    function(isRoute){
        return links([
            {to:this.props.params.genreId ? "Country-Genre-Artist-view" : "Country-Artist-view", name:"Artist", isLeaf:true, linkedIf:'Artist', render:menuPicture(this.state.data) },          
            {to:"Country-Artist-Album-list", name:"Albums", linkedIf:"Country-Artist-Album" },
            {to:"Country-Artist-Single-list", name:"Singles" , linkedIf:"Country-Artist-Single" },
            {to:"Country-Artist-Track-list", name:"Tracks" , linkedIf:"Country-Artist-Track" }
          ],this.context.router,this.props.params,isRoute)
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


