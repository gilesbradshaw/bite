var Biff = require("../biff");
var _ = require("lodash");
var {fromJS}=require('immutable');

var   _user=fromJS(window.user);
// Creates a DataStore
var UserStore = Biff.createStore({
  // Initial setup
  
  getCurrentUser:function(){
  	if(_user!='')
    	return _user;
  },
  
}, function (payload) {
  if (payload.actionType === "USER_SIGNIN") {
    _user= payload.data;
    this.emitChange();
  }
  if (payload.actionType === "USER_SIGNOUT") {
    _user= null;
    this.emitChange();
  }
});

module.exports = UserStore;
