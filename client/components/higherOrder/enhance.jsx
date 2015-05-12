import React, { Component } from "react";



export var Enhance = ComposedComponent => class extends Component {
  constructor() {
  	super();
    //this.state = { data: null };

  }
  componentDidMount() {

    //this.setState({ data: 'Hello' });

  }
  render() {

    return <ComposedComponent {...this.props}  />;

  }
};

