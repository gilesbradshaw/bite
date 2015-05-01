import React from "react";
import UserStore from "../stores/user-new-store";
import ErrorStore from "../stores/user-error-store";
import UserActions from "../actions/user-actions";

import {RouteHandler} from  "react-router";

// Child Components
import Button from "./button";
import FormInput from "./formInput";
import Error from "./error";


// Component
function getState() {
  var s= {
    user:UserStore.getUser()||null,
    error:ErrorStore.getError()
  };
  return s;
}

var UserSignUpForm = React.createClass({
  displayName: "UserSignUpForm",
  propTypes: {},
  mixins: [UserStore.mixin,ErrorStore.mixin],

  getInitialState: function () {
    
    // Create the blank user in the store to edit
    // this will create an empty record if they leave
    //var newUser= getState();
    //UserActions.newUser(newUser);
    return {user:null};
  },

  componentDidMount: function () {
    UserActions.newUser();
  },

  componentWillUnmount: function () {
    //UserActions.deleteUser();
  },

  storeDidChange: function () {
    var s=getState();
    this.setState(()=>s);
  },

  handleChange:function(field){
    return function(evt){
      UserActions.newUser(this.state.user.set(field,evt.target.value));
    }.bind(this);
  },
  signUp:function() {
    UserActions.signUp(this.state.user);
  },

  render: function () {   
    if(this.state.user)
    {
      var get = this.state.user.get.bind(this.state.user);
      return (
        <div className="user">
           <FormInput id='firstName' title='First name' value={get('firstName')} onChange={this.handleChange('firstName')} />
           <FormInput id='lastName' title='Last name'   value={get('lastName')} onChange={this.handleChange('lastName')} />
           <FormInput id='displayName' title='Display name' value={get('displayName')} onChange={this.handleChange('displayName')} />
           <FormInput id='username' title='User name' value={get('username')} onChange={this.handleChange('username')} />
           <FormInput id='email' title='Email' value={get('email')} onChange={this.handleChange('email')} />
           <FormInput id='password' title='Password' value={get('password')} onChange={this.handleChange('password')} />
           <Button buttonCallback={this.signUp} value="Sign Up" />
           <Error error={this.state.error}/>
           <RouteHandler {...this.props} />
        </div>
      );
    }
    else
    {
      return (<div className="user"/>);
    }
  }
});

export default UserSignUpForm;
