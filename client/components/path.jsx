import React from "react";
import {pathActions} from "../actions/path-actions";

export const Path= class extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    if(this.props.myPath )
    {
      pathActions.active(this.props.myPath, this.props.myPath, this.props.pathRender);
    }
  }
  componentWillUnmount() {
    if(this.props.myPath)
    {
      pathActions.dispose(this.props.myPath, this.props.myPath, this.props.pathRender);
    }
  }
  componentWillReceiveProps(props) 
  {
    if(props.myPath )
    {
      pathActions.active(props.myPath, props.myPath, props.pathRender);
    }
  }
  render() {
    return  <div>{this.props.children}</div>
  }
}
Path.displayName = "Path";

export const pathRender = (target, render, pathRender) => 
{
  const route = target.context.router.getRouteAtDepth(target.context.routeDepth-1);
  console.log(`pathRender ::: ${route.path}&&${route.name}`);
  return <Path myPath={`${route.path}&&${route.name}`} pathRender={pathRender}>
    {render()}
  </Path>
}