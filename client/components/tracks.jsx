// React
import React from "react";
import {addons as ReactAddons} from 'react/addons';
var PureRenderMixin = ReactAddons.PureRenderMixin;

import crud from "./crud-creator";
import {track as Store} from "../stores/store";
import {track as Actions} from "../actions/actions";

import  {Link} from "react-router";
import FormInput from "./formInput";

import crudFactory from './crud-factory';
import {listedTrack, viewPicture} from "./mix-radio/items";
import {links} from './link/links';

const togglePlay=(self,id)=>()=>
  self.setState({play:id})
const player=(self,data)=>
  self.state.play==data.get("id") 
    ? <audio autoplay controls src={data.getIn(['samples', 'wmamms'])}/> 
    : <div onClick={togglePlay(self,data.get("id"))}>play!</div>


var exp = crudFactory(crud, "trackId", "Track", "Tracks", Actions, Store, "trackId", "id")
  .listHead().render()()
  .list().nodeRender(listedTrack)()
  .view().render( (self,data)=>
    <div>
      {viewPicture(self,data)}
      {player(self,data)}
    </div>
    
  )()
  .head().menuRender( 
    function(){
      if(this.props.params.albumId)
      {
        return <span>
          {links([
              {to:"Country-Album-Track-view", name:"Track", linkedIf:'Track' },
            ],this.context.router,this.props.params)}

        </span>
      }
      else if(this.props.params.singleId)
      {
        return <span>
          {links([
              {to:"Country-Single-Track-view", name:"Track", linkedIf:'Track' },
            ],this.context.router,this.props.params)}

        </span>
      }
      else
        {
          return <span>
            {links([
                {to:"Country-Track-view", name:"Track", linkedIf:'Track' },
              ],this.context.router,this.props.params)}

          </span>
        } 

    }
  )()

  .del().render(
    function(){
      return (
        <div >
           <div>{this.props.item.get('title')}</div>
        </div>
      );
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

