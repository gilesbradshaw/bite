// React
import React from "react";
import {addons as ReactAddons} from 'react/addons';
var PureRenderMixin = ReactAddons.PureRenderMixin;

import crud from "./crud-creator";
import {artist as Store} from "../stores/store";
import {artist as Actions} from "../actions/actions";

import  {Link} from "react-router";
import FormInput from "./formInput";

import crudFactory from './crud-factory';
import {listedPicture, viewPicture} from "./mix-radio/items";



var exp = crudFactory(crud, "artistId", "Artist", "Artists", Actions, Store, "artistId", "id")
  .list().nodeRender(listedPicture)()
  .view().render(viewPicture)()
  .head().menuRender( 
    function(){
      return <div>
        <span className="navLink"><Link to="Country-Artist-Album" params={this.props.params}>Albums</Link> </span>
        <span className="navLink"><Link to="Country-Artist-Single" params={this.props.params}>Singles</Link> </span>
        <span className="navLink"><Link to="Country-Artist-Track" params={this.props.params}>Tracks</Link> </span>
      </div>
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


