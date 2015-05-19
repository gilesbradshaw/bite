// React
import React from "react";
import {addons as ReactAddons} from 'react/addons';
const PureRenderMixin = ReactAddons.PureRenderMixin;

import crud from "./crud-creator";
import {genre as Store} from "../stores/store";
import {genre as Actions} from "../actions/actions";

import  {Link} from "react-router";
import FormInput from "./formInput";

import crudFactory from './crud-factory';
import {links, makeLink} from './link/links';
import {name} from "./mix-radio/items";




const exp = crudFactory(crud, "genreId", "Genre", "Genres", Actions, Store, "genreId", "id")
  .list()
    .titleRender((self)=> "Genres")
    .nodeRender(
      (data) => 
      <div>
        <div>{data.get('name')}</div>
      </div>
    )
  ()
  .view().render(
    (self,data)=>   
    {
        return <div >
           <div>{data.get('name')}</div>
        </div>
      }
  )()
  .listHead().render()()
  .head().menuRender( 
    function(isRoute){
      return links([
          {to:"Country-Genre-view",isLeaf:true, name:"Genre", linkedIf:'Genre', render:name(this.state.data.get("item")) }, 
          {to:"Country-Genre-Artist-list", name:"Artists", linkedIf:"Country-Genre-Artist" },
          {to:"Country-Genre-Album-list", name:"Albums" , linkedIf:"Country-Genre-Album"},
          {to:"Country-Genre-Single-list", name:"Singles" , linkedIf:"Country-Genre-Single"},
          {to:"Country-Genre-Track-list", name:"Tracks" , linkedIf:"Country-Genre-Track"}
        ],this.context.router,this.props.params,isRoute);
    }
  )()
  .make();

export default  exp;
export const link = (data,params)=>makeLink("Country-Genre-view",params, "genreId",data.get("id"),()=>data.get("name"))

export const genreFooters=(data,self)=>
  [
      (data.getIn(["genres"])
          ?{
            field:'Genre' + (data.getIn(["genres"]).toArray().length>1 ? 's': '') , 
            render:()=>data.getIn(["genres"]).toArray().map(p=>
              link(p, self.props.params)
            )
        }:null)
  ]