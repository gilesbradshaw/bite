// React
var React = require("react");

// Component
var Input = React.createClass({
  displayName: "formInput",
  propTypes: {},
  mixins: [],

  getInitialState: function () { return null; },

  componentWillMount: function () {},

  componentWillUnmount: function () {},

  render: function () {
    return (
      <span>
        <label htmlFor={this.props.id}>
          {this.props.title}
        </label>
        <input
          id={this.props.id}
          value={this.props.value}
          onChange={this.props.onChange} />
      </span>
    );
  }
});

module.exports = Input;
