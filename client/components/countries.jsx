// React
import React from "react";
import {addons as ReactAddons} from 'react/addons';
var PureRenderMixin = ReactAddons.PureRenderMixin;
import  {Link} from "react-router";
import crud from "./crud-creator";
import {country as Store} from "../stores/store";
import {country as Actions} from "../actions/actions";

import FormInput from "./formInput";


  



import crudFactory from './crud-factory';

var exp = crudFactory(crud, "countryCode", "Country", "Countries", Actions, Store, "countryCode", "countryCode")
  .select().renderer( 
    (self,nodes)=>
        <div>
          <p>Country Selector:</p>
          <FieldSelect
              name="Countries-selecter"
              value={self.props.value}
              label='name'
              options={nodes}
              onChange={self.props.onChange}
          />
        </div>
  )()
  .list().nodeRender(
    (data) => 
    <div>
      <div>{data.get('name')}</div>
    </div>
  )()
  .head().menuRender( 
    function(){
      return <div>
      
        <span className="navLink"><Link to="Country-Chart" params={this.props.params}>Charts</Link> </span>        
        <span className="navLink"><Link to="Country-NewRelease" params={this.props.params}>New Releases</Link> </span>        
        <span className="navLink"><Link to="Country-Genre" params={this.props.params}>Genres</Link> </span>
        <span className="navLink"><Link to="Country-Artist" params={this.props.params}>Artists</Link> </span>
        <span className="navLink"><Link to="Country-Album" params={this.props.params}>Albums</Link> </span>
        <span className="navLink"><Link to="Country-Single" params={this.props.params}>Singles</Link> </span>
        <span className="navLink"><Link to="Country-Track" params={this.props.params}>Tracks</Link> </span>
      </div>
    }
  )()
  .view().render(
    function(self,item){   
      return (
        <div >
           <div>{item.get('name')}</div>
        </div>
      );
    }
  )()
  .del().render(
    function(){
      return (
        <div >
           <div>{this.props.item.get('name')}</div>
        </div>
      );
    }
  )()
  .edit().render(
     function(){
        return (
          <div >
             <FormInput id='countryCode' title='Country Code' value={this.props.item.get('countryCode')} onChange={this.props.handleChange('countryCode')} />
             <FormInput id='name' title='Name' value={this.props.item.get('name')} onChange={this.props.handleChange('name')} />
          </div>
        );
     }
  )()
  .create().render((self) =>
    <div>
      <FormInput id='countryCode' title='Country Code' value={self.props.item.get('countryCode')} onChange={self.props.handleChange('countryCode')} />
      <FormInput id='name' title='Name' value={self.props.item.get('name')} onChange={self.props.handleChange('name')} />
    </div>             
  )()

  .make();

export default  exp;



