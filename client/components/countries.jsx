// React
import React from "react";
import {addons as ReactAddons} from 'react/addons';
var PureRenderMixin = ReactAddons.PureRenderMixin;
import  {Link} from "react-router";
import crud from "./crud-creator";
import {country as Store} from "../stores/store";
import {country as Actions} from "../actions/actions";

import FormInput from "./formInput";
import {links} from './link/links';
import {Grid,Row,Col} from 'react-flexgrid';
import style from './styles/style';


  



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
  .listHead().render()()
  .list().nodeRender(
    (data) => 
    <Row >
      <Col>
        <div style={style.box}>
          {data.get('name')}
        </div>
      </Col>
    </Row>
  )()
  //.listHead().render()()
  .head().menuRender( 
    function(){
      return <span>
      {links([
          {to:"Country-view", name:"Country", linkedIf:'Country' },
         
        ],this.context.router,this.props.params)}
        {links([
          {to:"Country-Chart", name:"Charts" },
          {to:"Country-NewRelease", name:"New Releases"},
          {to:"Country-Genre", name:"Genres"},
          {to:"Country-Artist", name:"Artists"},
          {to:"Country-Album", name:"Albums"},
          {to:"Country-Single", name:"Singles"},
          {to:"Country-Track", name:"Tracks"}
        ],this.context.router,this.props.params)}
      </span>
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



