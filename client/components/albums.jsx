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
import {listedPicture, viewPicture, menuPicture,thumbnail,listedNameGenre} from "./mix-radio/items";
import {links} from './link/links';


var exp = crudFactory(crud, "albumId", "Album", "Albums", Actions, Store, "albumId", "id")
  .list()
    .nodeRender(listedNameGenre)
    .menuLinks(
      (self,data,params)=>[
        {title:'View',path:self.state.myPath + "-view", render:thumbnail(data)},
      ]
    )
  ()
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
          {to:"Country-Album-view", isLeaf:true, name:"Album", linkedIf:'Album',render:menuPicture(this.state.data) },             
          {to:"Country-Album-Track-list", name:"Tracks", linkedIf: "Country-Album-Track" }
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


