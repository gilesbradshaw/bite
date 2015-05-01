import Biff from "../biff";
import _ from "lodash";
import {fromJS} from 'immutable';

var  _user=null;

// Creates a DataStore
var NewUserStore = Biff.createStore({
  // Initial setup
 
  getUser: function() {
   return _user;
  },
  
}, function (payload) {

  if (payload.actionType === "USER_NEW") {
    _user = payload.data || fromJS(
      {  
        _id:null,
        firstName: null,
        lastName: null,
        username: null,
        displayName: null,
        email: null,
        password: null
      }
    );
    this.emitChange();
  }

});

export default NewUserStore;
