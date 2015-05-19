// React
import React from "react";
import {addons as ReactAddons} from 'react/addons';
const PureRenderMixin = ReactAddons.PureRenderMixin;

import crud from "./crud-creator";
import {artist as Store} from "../stores/store";
import {artist as Actions} from "../actions/actions";

import  {Link} from "react-router";
import FormInput from "./formInput";
import {Grid,Row,Col} from 'react-flexgrid';

import crudFactory from './crud-factory';
import {listedPicture, viewPicture, menuPicture,viewThumbnail, thumbnail,listedNameGenre} from "./mix-radio/items";
import {links, makeLink} from './link/links';
import {link as genreLink} from './genres';
import mapOrNull from  './utils/mapornull';


const exp = crudFactory(crud, "artistId", "Artist", "Artists", Actions, Store, "artistId", "id")
  .listHead().render()()
  .list()

    .titleRender((self)=> "Artists")
    .nodeRender((data,self)=>
      [ 
        <Col xs={0}>
          {listedNameGenre(data,self)}
        </Col>      
      ]
    )
    .menuLinks(
      (self,data,params)=>[
        {title:'View',path:self.state.myPath + "-view", render:thumbnail(data)},
      ]
    )
  ()
  .view().render( (self,data)=>
    <div>
      {viewPicture(self,data)}
    </div>
    
  )
    .titleRender((self,data)=>
      [
        {field:'Artist', render:()=>data.get('name')}
      ]
    )
    .footerRender((self,data)=>
      [      
        {
          field:'Genre' + (data.getIn(["genres"]).toArray().length>1 ? 's': '') , 
          render:()=>data.getIn(["genres"]).toArray().map(p=>
            genreLink(p, self.props.params)
          )
        },
        {
          field: "Biography",
          render:()=>data.get('biography')
        }
      ]

    )
  ()
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
  
  .make();

export default  exp;
export const link = (data,params)=>makeLink("Country-Artist-view",params, "artistId",data.get("id"),()=>data.get("name"))


export const artistLinks = (data, self)=>
  [
        mapOrNull(data.getIn(["creators","composers"]), p=>p.map(p=>link(p, self.props.params)))
      ,
        mapOrNull(data.getIn(["creators","performers"]), p=>p.map(p=>link(p, self.props.params)))
  ]

export const artistFooters=(data,self)=>
  [
      (data.getIn(["creators","composers"])
          ?{
            field:'Composer' + (data.getIn(["creators","composers"]).toArray().length>1 ? 's': '') , 
            render:()=>data.getIn(["creators","composers"]).toArray().map(p=>
              link(p, self.props.params)
            )
        }:null),
        (data.getIn(["creators","performers"])
          ?{
            field:'Performer' + (data.getIn(["creators","performers"]).toArray().length>1 ? 's': '') , 
            render:()=>data.getIn(["creators","performers"]).toArray().map(p=>
              link(p, self.props.params)
            )
        }:null)
  ]


