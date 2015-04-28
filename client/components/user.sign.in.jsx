// React
var React = require("react");
var UserStore = require("../stores/user-signin-store");
var ErrorStore = require("../stores/user-error-store");
var UserActions = require("../actions/user-actions");

// Router
var Router = require("react-router");
var RouteHandler = Router.RouteHandler;

// Child Components
var Button = require("./button");
var FormInput = require("./formInput");
var Error = require("./error");


// Component
function getState() {
  var s= {
    user:UserStore.getUser()||null,
    error:ErrorStore.getError()
  };
  return s;
}

var UserSignInForm = React.createClass({
  displayName: "UserSignInForm",
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
    this.setState(function (){ return s;});
  },

  handleChange:function(field){
    return function(evt){
      UserActions.newUser(this.state.user.set(field,evt.target.value));
    }.bind(this);
  },
  signIn:function() {
    UserActions.signIn(this.state.user);
  },

  render: function () {   
    if(this.state.user)
    {
      var get = this.state.user.get.bind(this.state.user);
      return (
        <div className="user">
           <FormInput id='username' title='User name' value={get('username')} onChange={this.handleChange('username')} />
           <FormInput id='password' title='Password' value={get('password')} onChange={this.handleChange('password')} />
           <Button buttonCallback={this.signIn} value="Sign In`" />
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

module.exports = UserSignInForm;
