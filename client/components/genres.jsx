// React
import React from "react";
import {addons as ReactAddons} from 'react/addons';
var PureRenderMixin = ReactAddons.PureRenderMixin;

import crud from "./crud-creator";
import {genre as Store} from "../stores/store";
import {genre as Actions} from "../actions/actions";

import  {Link} from "react-router";
import FormInput from "./formInput";

import crudFactory from './crud-factory';
import {links} from './link/links';




var exp = crudFactory(crud, "genreId", "Genre", "Genres", Actions, Store, "genreId", "id")
  .list().nodeRender(
      (data) => 
      <div>
        <div>{data.get('name')}</div>
      </div>
    )()
  .view().render(
    (self,data)=>   
    {
        return <div >
           <div>{data.get('name')}</div>
        </div>
      }
  )()
  .head().menuRender( 
    function(){
      return <div>
        {links([
          {to:"Country-Genre-Artist", name:"Artists" },
          {to:"Country-Genre-Album", name:"Albums" },
          {to:"Country-Genre-Single", name:"Singles" },
          {to:"Country-Genre-Track", name:"Tracks" }
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


