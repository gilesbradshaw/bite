import Biff from "../biff";

// Request
import request from "superagent";
import {fromJS} from 'immutable';

var UserActions = Biff.createActions({
  loadUsers: function () {
    var self = this;
      request
      .get("/users")
      .set("Accept", "application/json")
      .end(function (error, res) {
        self.dispatch({
          actionType: "USERS_LOAD",
          data: JSON.parse(res.text)
        });
      });
  },
  newUser: function(user){
    this.dispatch({
      actionType: "USER_NEW",
      data: user
    });
    if(!user){
      this.dispatch({
        actionType: "USER_NOERROR",
      }); 
    }
  },
   deleteUser: function(id){
    this.dispatch({
      actionType: "USER_DELETE",
      data: id
    });
  },
  signIn: function (user) {
      var self=this;
      request
      .post("/auth/signin")
      .send(user)
      .set("Accept", "application/json")
      .end((error, res)=> {
        if(res && res.ok)
        {
          var user=fromJS(JSON.parse(res.text));
          self.dispatch({
            actionType: "USER_SIGNIN",
            data: user
          });
          self.dispatch({
            actionType: "USER_NOERROR",
          }); 
        }
        if(error || !res.ok)
        {
         self.dispatch({
            actionType: "USER_ERROR",
            data: error || res.body.message || 'an error has occurred'
          }); 
        }
      });
  },
  signUp: function (user) {
    var self = this;
      request
      .post("/auth/signup")
      .send(user)
      .set("Accept", "application/json")
      .end( (error, res)=> {
        if(res && res.ok)
        {
          var user=fromJS(JSON.parse(res.text));
          self.dispatch({
            actionType: "USER_SIGNUP",
            data: user
          });
          self.dispatch({
            actionType: "USER_NEW",
          });
          self.dispatch({
            actionType: "USER_SIGNIN",
            data: user
          });
          self.dispatch({
            actionType: "USER_NOERROR",
          }); 
        }
        if(error || !res.ok)
        {

         self.dispatch({
            actionType: "USER_ERROR",
            data: error || res.body.message || 'an error has occurred'
          }); 
        }
      });
  },
  signOut: function (user) {
    var self = this;
      request
      .get("/auth/signout")
      .set("Accept", "application/json")
      .end( (error, res)=> {
        if(res && res.ok)
        {
          self.dispatch({
            actionType: "USER_SIGNOUT",
          });
          self.dispatch({
            actionType: "USER_NOERROR",
          }); 
        }
        if(error || !res.ok)
        {
         self.dispatch({
            actionType: "USER_ERROR",
            data: error || res.body.message || 'an error has occurred'
          }); 
        }
      });
  },
});

export default UserActions;
