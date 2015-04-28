var Biff = require("../biff");
var _ = require("lodash");
var {List,fromJS} = require('immutable');



function listStore()
{
  var _agencies= List.of(...[]);
  function loadAgencies (agencies) {
      _agencies = List.of(...agencies.map((u)=>fromJS(u)));
      
  }
  // Creates a DataStore
  return Biff.createStore({
    // Initial setup
   
   
    get: function () {
      return _agencies;
    }
  }, function (payload) {

    if (payload.actionType === "AGENCIES_LOAD") {
      loadAgencies(payload.data);
      this.emitChange();
    }

  });
}

function getStore()
{
  var  _agency=null;

  // Creates a DataStore
  return Biff.createStore({
    // Initial setup
   
    get: function() {
     return _agency;
    },
    
  }, function (payload) {

    if (payload.actionType === "AGENCY_GOT") {
      _agency = fromJS(payload.data);
      this.emitChange();
    }
    if (payload.actionType === "AGENCY_NEW") {
      _agency = payload.data; 
      this.emitChange();
    }

  });
}
function createStore()
{

  var  _agency=null;

  // Creates a DataStore
  return Biff.createStore({
    // Initial setup
   
    get: function() {
     return _agency;
    },
    
  }, function (payload) {

    if (payload.actionType === "AGENCY_NEW") {
      _agency = payload.data || fromJS(
        {  
          created: null,
          title: null,
          website: null
        }
      );
      this.emitChange();
    }

  });
}

function errorStore()
{
  var  _error=null;

  // Creates a DataStore
  return Biff.createStore({
    // Initial setup
   
    get: function() {
     return _error;
    },
    
  }, function (payload) {

    if (payload.actionType === "AGENCY_ERROR") {
      _error = payload.data;
      this.emitChange();
    }
    if (payload.actionType === "AGENCY_NOERROR") {
      _error = null;
      this.emitChange();
    }

  });
}

module.exports =
  {
    list:listStore(),
    get:getStore(),
    create:createStore(),
    error:errorStore()
  }
