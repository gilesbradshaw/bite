import React from "react";

// Component
var Input = React.createClass({
  displayName: "formInput",
  propTypes: {},
  mixins: [],

  getInitialState: function () { return {value:this.props.value}; },

  componentWillMount: function () {},

  componentWillUnmount: function () {},
  handleChange:function(evt,item){
    this.setState({value: event.target.value});
    this.props.onChange(evt,item);

  },

  render: function () {
    var value=this.state.value;
    return (
      <span>
        <label htmlFor={this.props.id}>
          {this.props.title}
        </label>
        <input
          id={this.props.id}
          value={value}
          onChange={this.handleChange} />
      </span>
    );
  }
});

export default Input;
