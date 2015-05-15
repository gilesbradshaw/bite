import React from "react";

export const listedPicture = (data) => 
  <div>
    <div>{data.get('name')}</div>
    <img src={data.getIn(["thumbnails", "50x50"])}/>
    {data.get("genres").toArray().map((genre)=>genre.get("name"))}
  </div>


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
    <div> 
      {listedPicture(data,self)}
      {player(self,data)}
    </div>