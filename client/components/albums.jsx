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
import {listedPicture, viewPicture, menuPicture,viewThumbnail, thumbnail,listedNameGenre} from "./mix-radio/items";
import {links, makeLink} from './link/links';
import _ from "lodash";
import {Grid,Row,Col} from 'react-flexgrid';
import {link as artistLink, artistLinks, artistFooters} from './artists';
import {link as genreLink, genreFooters} from './genres';
import mapOrNull from  './utils/mapornull';


export const crudMaker = (factory, listTitle)=>
  factory.list()
    .titleRender((self)=> listTitle)
    .nodeRender((data,self)=>
      [ 
        (!self.props.params.artistId
        ? <Col key='artistLinks' xs={3} sm={2} md={1}>
          {artistLinks(data,self)}
        </Col>
        : null),
        <Col  key='nameAndGenre' xs={0}>
          {listedNameGenre(data,self)}
        </Col>
        ,
        <Col key='variousartists' xs={1}>
          {data.get('variousartists')?'various':null}
        </Col>       
      ]
    )
    .menuLinks(
      (self,data,params)=>[
        {title:'View',path:"Country-Album-view", render:thumbnail(data)},
      ]
    )
  ()
  .view()
    .render((self,data)=>
      <div>
        {viewThumbnail(self,data)}
      </div>
      
    )
    .titleRender((self,data)=>
      [
        {field:'Album', render:()=>data.get('name')}
      ]
    )
    .footerRender((self,data)=>
      [
        artistFooters(data,self),
        genreFooters(data,self),
        {field:'Label', render:()=>data.get("label")}
      ]

    )
  ()
  .listHead()
    .render()
  ()
  .head().menuRender( 
    function(isRoute){
      return links([
          {to:"Country-Album-view", isLeaf:true, name:"Album", linkedIf:'Album',render:menuPicture(this.state.data) },             
          {to:"Country-Album-Track-list", name:"Tracks", linkedIf: "Country-Album-Track" }
      ],this.context.router,this.props.params,isRoute);
    }
  )()


const exp = crudMaker(crudFactory(crud, "albumId", "Album", "Albums", Actions, Store, "albumId", "id"),'Albums').make();

export default  exp;
export const link = (data,params)=>makeLink("Country-Album-view",params, "albumId",data.get("id"),()=>data.get("name"))

