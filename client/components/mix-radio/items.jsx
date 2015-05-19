import React from "react";
import {Grid,Row,Col} from 'react-flexgrid';
import MediaQuery from 'react-responsive';

import {links, makeLink} from '../link/links';
import {link as genreLink} from '../genres';

export const listedPicture = (data) => 
    <Col xs={1}>{thumbnail(data)()}</Col>
  
export const listedNameGenre = (data,self) => 
    <Col xs={11} sm={6}>
      <div>{data.get('name')}</div>
      {data.get("genres").toArray().map((p)=>genreLink(p,self.props.params))}
    </Col>

export const viewPicture = (self,data)=>   
 	<div >

    <MediaQuery maxWidth={159} >
      <img src={data.getIn(["images", "90x120",0])}/>
    </MediaQuery>
    <MediaQuery minWidth={160} maxWidth={239}>
      <img src={data.getIn(["images", "160x120",0])}/>
    </MediaQuery>
    <MediaQuery minWidth={240} maxWidth={319}>
      <img src={data.getIn(["images", "240x320",0])}/>
    </MediaQuery>
    <MediaQuery minWidth={320} maxWidth={767}>
      <img src={data.getIn(["images", "320x240",0])}/>
    </MediaQuery>
    <MediaQuery minWidth={768} >
      <img height={'300px'} src={data.getIn(["images", "768x1280",0])}/>
    </MediaQuery>
  </div>


export const viewThumbnail = (self,data)=>   
  <div >
      <img src={data.getIn(["thumbnails", "320x320"])}/> 
  </div>

  
const togglePlay=(self,id)=>()=>
  self.setState({play:id})
const player=(self,data)=>
  self.state.play==data.get("id") 
    ? <audio autoplay controls src={data.getIn(['samples', 'wmamms'])}/> 
    : <div onClick={togglePlay(self,data.get("id"))}>play!</div>
    
 export const listedTrack = (data,self)=>
    [
      listedPicture(data),
      listedNameGenre(data),
      <Col xs={12} sm={3}>
        {player(self,data)}
      </Col>
    ]

  export const name = (item)=>
    ()=><span>{item.get("name")}</span>
  export const menuPicture = (data)=>
    ()=>{
      return data.get("item") ? <span>{thumbnail(data.get("item"),'20px')()} {name(data.get("item"))()}</span> : <script/>
    }
  export const thumbnail = (item, scale)=>
    ()=>{
      return <span><img height={scale} src={item.getIn(["thumbnails", "50x50"])}/></span>
    }