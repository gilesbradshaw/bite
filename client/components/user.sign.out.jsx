// React
var React = require("react");
var UserStore = require("../stores/user-current-store");
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

module.exports = UserSignOutForm;
