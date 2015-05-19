// React
import React from "react";
import {addons as ReactAddons} from 'react/addons';
const PureRenderMixin = ReactAddons.PureRenderMixin;

import crud from "./crud-creator";
import {track as Store} from "../stores/store";
import {track as Actions} from "../actions/actions";

import  {Link} from "react-router";
import FormInput from "./formInput";
import {Grid,Row,Col} from 'react-flexgrid';

import crudFactory from './crud-factory';
import {listedTrack, listedPicture, viewPicture, menuPicture, thumbnail,viewThumbnail,listedNameGenre} from "./mix-radio/items";
import {makeLink, links} from './link/links';

import {link as artistLink, artistLinks, artistFooters} from './artists';
import {link as genreLink, genreFooters} from './genres';


const togglePlay=(self,id)=>()=>
  self.setState({play:id})
const player=(self,data)=>
  self.state.play==data.get("id") 
    ? <Player src={data.getIn(['samples', 'wmamms'])}/> 
    : <Player src={data.getIn(['samples', 'wmamms'])}/>  //<div onClick={togglePlay(self,data.get("id"))} className='fa fa-lg fa-play'/>


class Player extends React.Component {
  constructor(props)
  {
    super(props);
    this.componentDidMount=this.componentDidMount.bind(this);
  }
  componentDidMount()
  {
    const p = this.refs.player.getDOMNode();
    p.play();
  }
  render() {
    return <audio ref='player' autoplay controls src={this.props.src}/> 
  }
}
Player.displayName = "Player";



const path=(params)=>
  params.albumId 
      ? "Country-Album-Track"
      : (
          params.singleId
          ? "Country-Single-Track"
          : (
              params.artistId
              ? "Country-Artist-Track"
              : "Country-Track"
            )

        );

export const crudMaker = (factory, listTitle)=>
  factory
  .listHead().render()()
  .list()
    .titleRender((self)=> "Tracks")
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
      (self,data,params)=>
        [
            {title:'View',path:path(params) + "-view", render:thumbnail(data)},
        ]
      
    )
  ()
  .view()
    //DRY!!
    .titleRender((self,data)=>
      [
        {field:'Track', render:()=>data.get('name')}
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
        {player(self,data)}
      </div>
    
    )
  ()
  .head().menuRender( 
    function(isRoute){
      return links([
          {to:`${path(this.props.params)}-view`, name:"Track", isLeaf:true, linkedIf:'Track', render:menuPicture(this.state.data)},
        ],this.context.router,this.props.params, isRoute);
    }
  )();

const exp = crudMaker(crudFactory(crud, "trackId", "Track", "Tracks", Actions, Store, "trackId", "id"), "Tracks").make();

export default  exp;
export const link = (data,params)=>makeLink("Country-Track-view",params, "trackId",data.get("id"),()=>data.get("name"))


