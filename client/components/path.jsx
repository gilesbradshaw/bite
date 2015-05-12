import React from "react";
import {pathActions} from "../actions/path-actions";

export var Path= class extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    //pathActions.active(this.props.myPath);
  }
  componentWillUnmount() {
    if(this.props.myPath)
    {
      pathActions.dispose(this.props.myPath, this.props.pathRender);
    }
  }
  componentWillReceiveProps(props) 
  {
    if(this.props.myPath)
    {
      pathActions.active(props.myPath, this.props.pathRender);
    }
  }
  render() {
    return  <div>{this.props.children}</div>
  }
}
Path.displayName = "Path";

export var pathRender = (target, render, pathRender) => 
  <Path myPath={target.state.myPath} pathRender={pathRender}>
    {render()}
  </Path>
