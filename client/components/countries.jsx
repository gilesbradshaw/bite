// React
import React from "react";
import {addons as ReactAddons} from 'react/addons';
const PureRenderMixin = ReactAddons.PureRenderMixin;
import  {Link} from "react-router";
import crud from "./crud-creator";
import {country as Store} from "../stores/store";
import {country as Actions} from "../actions/actions";

import FormInput from "./formInput";
import {makeLink,links} from './link/links';
import {Grid,Row,Col} from 'react-flexgrid';
import style from './styles/style';



  



import crudFactory from './crud-factory';

const exp = crudFactory(crud, "countryCode", "Country", "Countries", Actions, Store, "countryCode", "countryCode")
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
  .list()
    .titleRender((self)=> "Countries")
    .nodeRender(
      (data) => [   
        <Col xs={0}>
          <div style={style.box}>
            {data.get('name')}
          </div>
        </Col>
      ]
    )
    .menuLinks(
        (self,data,params)=>[
          {title:'View',path:self.state.myPath + "-view", render:()=><span className={`flag-icon flag-icon-${data.get('countryCode')}`} ></span>},
          self.state.data.get('user')?[
            {title:'Edit',path:self.state.myPath + "-edit"},
            {title:'Delete',path:self.state.myPath + "-delete"}
          ]:[]
        ]
      )
  ()
  //.listHead().render()()
  .head().menuRender( 
    function(isRoute){
      return links([
          {to:"Country-view", name:"Country", isLeaf:true, linkedIf:'Country', render:()=><span><span className={`flag-icon flag-icon-${this.state.data.getIn(['item','countryCode'])}`} ></span>  {this.state.data.getIn(["item", "name"])}</span>},      
          {to:"Country-Chart", name:"Charts" },
          {to:"Country-NewRelease", name:"New Releases"},
          {to:"Country-Genre-list", name:"Genres", linkedIf:'Country-Genre'},
          {to:"Country-Artist-list", name:"Artists",linkedIf:'Country-Artis'},
          {to:"Country-Album-list", name:"Albums", linkedIf:'Country-Album'},
          {to:"Country-Single-list", name:"Singles", linkedIf:'Country-Single'},
          {to:"Country-Track-list", name:"Tracks", linkedIf:'Country-Track'}
        ],this.context.router,this.props.params, isRoute)
    }
  )()
  .view().render(
    function(self,item){   
      return (
        <div >
           <div>{item.get('name')}</div>
           <div style={{['font-size']:'10em'}} className={`flag-icon flag-icon-${item.get('countryCode')}`} ></div>
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

export const link = (data,params)=>makeLink("Country-view",params, "countryId",data.get("countryCode"),()=>data.get("name"))
