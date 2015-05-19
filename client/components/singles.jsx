// React
import React from "react";
import {addons as ReactAddons} from 'react/addons';
const PureRenderMixin = ReactAddons.PureRenderMixin;

import crud from "./crud-creator";
import {single as Store} from "../stores/store";
import {single as Actions} from "../actions/actions";

import  {Link} from "react-router";
import FormInput from "./formInput";
import {Grid,Row,Col} from 'react-flexgrid';

import crudFactory from './crud-factory';
import {makeLink,links} from './link/links';
import {listedTrack, listedPicture, viewPicture, menuPicture, thumbnail,viewThumbnail,listedNameGenre} from "./mix-radio/items";
import {link as artistLink, artistLinks, artistFooters} from './artists';
import {link as genreLink, genreFooters} from './genres';






export const crudMaker = (factory, listTitle)=>
  factory
  .list()
    .titleRender((self)=> listTitle)
    .nodeRender((data,self)=>
      [ 
        (!self.props.params.artistId
        ? <Col key='artistLinks' xs={3} sm={2} md={1}>
          {artistLinks(data,self)}
        </Col>
        : null)
        ,
        <Col key='nameAndGenre'  xs={0}>
          {listedNameGenre(data,self)}
        </Col>
      ]
    )
    .menuLinks(
      (self,data,params)=>[
        {title:'View',path:"Country-Single" + "-view", render:thumbnail(data)},
      ]
    )
  ()
  .view()
    //DRY!!
    .titleRender((self,data)=>
      [
        {field:'Single', render:()=>data.get('name')}
      ]
    )
    .footerRender((self,data)=>
      [
        artistFooters(data,self),
        genreFooters(data,self),
        {field:'Label', render:()=>data.get("label")}
      ]

    )
    .render( (self,data)=>
      <div>
        {viewThumbnail(self,data)}
      </div>  
    )

  ()
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
  )();

const exp = crudMaker(crudFactory(crud, "singleId", "Single", "Singles", Actions, Store, "singleId", "id"), "Singles").make();

export default  exp;
export const link = (data,params)=>makeLink("Country-Single-view",params, "singleId",data.get("id"),()=>data.get("name"))


