// React
import React from "react";
import {addons as ReactAddons} from 'react/addons';
var PureRenderMixin = ReactAddons.PureRenderMixin;

import crud from "./crud-creator";
import {note as Store} from "../stores/store";
import {note as Actions} from "../actions/actions";

import  {RouteHandler, Link} from "react-router";
import FormInput from "./formInput";


  


export default  
{

  list:crud.lister(
    "Notes",
    Actions,
    Store.list,
    Store.error,
    function(nodes){
      var self=this;
      return function () {
        return (
          <div>
            <p>Note Bank:</p>
            {nodes()}
            <RouteHandler {...self.props} />
          </div>
        );
      };
    },
    function (data) {
      var params={noteId:data.get('_id')};
      return (
        <div key={data.get('_id')}>
          <div>{data.get('title')}</div>
          <span><Link to="note-view" params={params}>View</Link></span>
          <span><Link to="note-edit" params={params}>Edit</Link></span>
          <span><Link to="note-delete" params={params}>Delete</Link></span>
        </div>
      );
    }
  ),
  view:crud.viewer (
     "NoteView",
      Actions,
      Store.get,
      Store.error,
      function(){   
        return (
          <div >
             <div>{'hhh   ' + this.props.item.get('title')}</div>
          </div>
        );
      },
      "noteId"
  ),
  head:crud.viewer (
     "NoteView",
      Actions,
      Store.get,
      Store.error,
      function(){   
        return (
          <div >
             <div>{'ok this is the head for a note ' + this.props.item.get('title')}</div>
          </div>
        );
      },
      "noteId"
  ),
  edit:module.exports = crud.editor (
    "NoteEdit",
     Actions,
     Store.get,
     Store.error,
     function(){
        return (
          <div >
             <FormInput id='title' title='Title' value={this.props.item.get('title')} onChange={this.props.handleChange('title')} />
          </div>
        );
     },
     "noteId"
  ),
  del:crud.deleter (
    "NoteDelete",
    Actions,
    Store.get,
    Store.error,
    function(){
        return (
          <div >
             <div>{this.props.item.get('title')}</div>
          </div>
        );
     },
     "noteId"
  ),
  create:crud.creator (
    "NoteNew",
    Actions,
    Store.get,
    Store.error,
     function(){
        return (
          <div>
             <FormInput id='title' title='Title' value={this.props.item.get('title')} onChange={this.props.handleChange('title')} />
          </div>
        );
     }
  )
}
