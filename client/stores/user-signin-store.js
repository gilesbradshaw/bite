import Biff from "../biff";
import _ from "lodash";
import immutable from 'immutable';

var  _user=null;

// Creates a DataStore
var NewUserStore = Biff.createStore(
  {
    // Initial setup
   
    getUser: function() {
     return _user;
    },
    
  }, 
  function (payload) {

    if (payload.actionType === "USER_NEW") {
      _user = payload.data || immutable.fromJS(
          {  
            username: null,
            password: null       
          }
      );
      this.emitChange();
    }
    if (payload.actionType === "USER_SIGNIN") {
      _user = null;
      this.emitChange();
    }
    if (payload.actionType === "USER_ERROR") {
      if(_user){
        _user= _user.set("password", null);
        this.emitChange();
      }
    }
  }
);
    


export default NewUserStore;
