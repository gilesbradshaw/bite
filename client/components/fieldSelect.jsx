// React
import React from "react";
import {addons as ReactAddons} from 'react/addons';
var PureRenderMixin = ReactAddons.PureRenderMixin;

import crud from "./crud-creator";

import  {RouteHandler, Link} from "react-router";
import FormInput from "./formInput";

import Select from "react-select";
import css from "../styles/selectdefault.css";
import _ from "lodash";






var mapType =(label)=>(data)=>
{
  return {
    label:data.get(label),
    value:data.get('_id')
  };
};

var onChange = (nodes, self)=>{
  return (evt)=>
  {
    if(nodes.length)
    {
      var found = _.find(nodes, (n)=>n.get('_id')===evt)
      self.props.onChange(found);
    }
  }

};


var fieldSelect= React.createClass({
  propTypes: {
        onChange: React.PropTypes.func,
  },
  render:function()
  {
    return <Select
                name={this.props.name}
                value={this.props.value}
                options={(this.props.options||[]).map(mapType(this.props.label))}
                onChange={onChange(this.props.options||[],this)}
            />
    }
  }
);

export default fieldSelect;