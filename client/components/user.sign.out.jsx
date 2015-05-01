import React from "react";
import UserStore from "../stores/user-current-store";
import ErrorStore from "../stores/user-error-store";
import UserActions from "../actions/user-actions";

import {RouteHandler} from "react-router";

// Child Components
import Button from "./button";
import FormInput from "./formInput";
import Error from "./error";


// Component
function getState() {
  var s= {
    user:UserStore.getCurrentUser()||null,
    error:ErrorStore.getError()
  };
  return s;
}

var UserSignOutForm = React.createClass({
  displayName: "UserSignOutForm",
  propTypes: {},
  mixins: [UserStore.mixin,ErrorStore.mixin],

  getInitialState: function () {
    
    // Create the blank user in the store to edit
    // this will create an empty record if they leave
    //var newUser= getState();
    //UserActions.newUser(newUser);
    return getState();
  },

  componentDidMount: function () {
    this.signOut();
  },

  componentWillUnmount: function () {
    //UserActions.deleteUser();
  },

  storeDidChange: function () {
    var s=getState();
    this.setState(function (){ return s;});
  },

  
  signOut: function() {
    UserActions.signOut();
  },

  render: function () {   
    if(this.state.error)
    {
      var get = this.state.user.get.bind(this.state.user);
      return (
        <div className="user">There has been an error signing out :(
          {get('displayName')}
          <Error error={this.state.error}/>
          <Button
            buttonCallback={this.signOut}
            value="Try again" />          
        </div>
      );
    }
    else
    {
      return (<div className="user">Signed out!</div>);
    }
  }
});

export default  UserSignOutForm;
