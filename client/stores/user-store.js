var Biff = require("../biff");
var _ = require("lodash");
var {List,fromJS} = require('immutable');

var _users= List.of(...[]);
function loadUsers (users) {    
    _users = List.of(...users.map((u)=>fromJS(u)));
  };
  function deleteUser(id) {
    _users = _users.delete(_users.indexOf(getUser(id)));    
  };
 function getUser(id) {
    return _.find(_users.toArray(), f=> f.get('_id')===(id || null));
  }
// Creates a DataStore
var UserStore = Biff.createStore({
  // Initial setup
  getUsers: function () {
    return _users;
  },
  getUser: getUser
  
}, function (payload) {

  if (payload.actionType === "USERS_LOAD") {
    loadUsers(payload.data);
    this.emitChange();
  }
  if (payload.actionType === "USER_SIGNUP") {
    _users.push(payload.data);
    deleteUser();
    this.emitChange();
  }
  if (payload.actionType === "USER_DELETE") {
    deleteUser(payload.data);
    this.emitChange();
  }

});

module.exports = UserStore;
