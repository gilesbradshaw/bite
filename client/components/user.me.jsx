import React from "react";
import UserStore from "../stores/user-current-store";
import _ from 'lodash';
import  {RouteHandler, Link} from "react-router";

function getState() {
  return {
    user:UserStore.getCurrentUser(),
    myPath: "me" 
  };
}
// Component
var User = React.createClass({
  displayName: "UserEdit",
  propTypes: {},
  mixins: [],

  getInitialState: function () { return getState() },

  componentWillMount: function () {},

  componentWillUnmount: function () {},

  render: function () {
    
      if(this.state.user)
      {
        var params = _.extend({}, this.params,{profileId:this.state.user.get('_id')});
        return (
          <div className="user">
            {this.state.user.get('displayName')}
            <RouteHandler {...this.props} myPath={this.state.myPath}/>          
          </div>
        );
      }
      else
      {
        return (
          <div className="user">No user logged in...</div>
        );
      }
    
  }
});

export default User;
