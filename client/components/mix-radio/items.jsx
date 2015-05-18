import React from "react";
import {Grid,Row,Col} from 'react-flexgrid';
export const listedPicture = (data) => 
    <Col xs={1}>{thumbnail(data)()}</Col>
  
export const listedNameGenre = (data) => 
    <Col xs={11} sm={6}>
      <div>{data.get('name')}</div>
      {data.get("genres").toArray().map((genre)=><span>{genre.get("name")}</span>)}
    </Col>

export const viewPicture = (self,data)=>   
 	<div >
     <div>{data.get('name')}</div>
     <img src={data.getIn(["thumbnails", "320x320"])}/>
     {data.get("genres").toArray().map((genre)=>genre.get("name"))}
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