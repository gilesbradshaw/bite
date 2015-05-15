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
    