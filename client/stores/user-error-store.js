import Biff from "../biff";
import _ from "lodash";

var  _error=null;

// Creates a DataStore
var UserErrorStore = Biff.createStore({
  // Initial setup
 
  getError: function() {
   return _error;
  },
  
}, function (payload) {

  if (payload.actionType === "USER_ERROR") {
    _error = payload.data;
    this.emitChange();
  }
  if (payload.actionType === "USER_NOERROR") {
    _error = null;
    this.emitChange();
  }

});

module.exports = UserErrorStore;
