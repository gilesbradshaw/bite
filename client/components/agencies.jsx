// React
import React from "react";
import {addons as ReactAddons} from 'react/addons';
var PureRenderMixin = ReactAddons.PureRenderMixin;

import crud from "./crud-creator";
import Store from "../stores/agency-store";
import Actions from "../actions/agency-actions";

import  {RouteHandler, Link} from "react-router";
import FormInput from "./formInput";


  var AgentsAction = Actions.children("AGENTS");
  var Agents = React.createClass({
      displayName: "Agents",
      propTypes: {},
      mixins: [
        PureRenderMixin,
        //store.mixin,
        //errorStore.mixin
      ],

      getInitialState: function () {
        return null;
        //return {data:Map(),index:index++};
      },

      componentDidMount: function () {
         AgentsAction.get({
          index:0,
          id:this.props.id
         });
      },

      componentWillUnmount: function () {
      },

      storeDidChange: function () {
      },

      render: function () {   
        return <div>AGENTS!!!</div>
      }
    });




export default  
{

  list:crud.lister(
    "Agencies",
    Actions,
    Store.list,
    Store.error,
    function(nodes){
      var self=this;
      return function () {
        return (
          <div>
            <p>Agency Bank:</p>
            {nodes()}
            <RouteHandler {...self.props} />
          </div>
        );
      };
    },
    function (data) {
      var params={agencyId:data.get('_id')};
      return (
        <div key={data.get('_id')}>
          <div>{data.get('title')}</div>
          <span><Link to="agency" params={params}>View</Link></span>
          <span><Link to="agency-edit" params={params}>Edit</Link></span>
          <span><Link to="agency-delete" params={params}>Delete</Link></span>
        </div>
        //<Agency agency={data} key={data.get('_id')} />
      );
    }
  ),
  view:crud.viewer (
     "AgencyView",
      Actions,
      Store.get,
      Store.error,
      function(){   
        return (
          <div >
             <div>{this.props.item.get('title')}</div>
             <div>{this.props.item.get('website')}</div>   
             <Agents id={this.props.item.get('_id')}/>           
          </div>
        );
      },
      "agencyId"
  ),
  edit:module.exports = crud.editor (
    "AgencyEdit",
     Actions,
     Store.get,
     Store.error,
     function(){
        return (
          <div >
             <FormInput id='title' title='Title' value={this.props.item.get('title')} onChange={this.props.handleChange('title')} />
             <FormInput id='website' title='Web site'  value={this.props.item.get('website')} onChange={this.props.handleChange('website')} />
          </div>
        );
     },
     "agencyId"
  ),
  del:crud.deleter (
    "AgencyDelete",
    Actions,
    Store.get,
    Store.error,
    function(){
        return (
          <div >
             <div>{this.props.item.get('title')}</div>
             <div>{this.props.item.get('website')}</div>
          </div>
        );
     },
     "agencyId"
  ),
  create:crud.creator (
    "AgencyNew",
    Actions,
    Store.get,
    Store.error,
     function(){
        return (
          <div>
             <FormInput id='title' title='Title' value={this.props.item.get('title')} onChange={this.props.handleChange('title')} />
             <FormInput id='website' title='Web site'  value={this.props.item.get('website')} onChange={this.props.handleChange('website')} />
          </div>
        );
     }
  )
}
