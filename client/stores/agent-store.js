var Biff = require("../biff");
var _ = require("lodash");
var {List,fromJS} = require('immutable');



function listStore()
{
  var _Agents= List.of(...[]);
  function loadAgents (Agents) {
      _Agents = List.of(...Agents.map((u)=>fromJS(u)));
      
  }
  // Creates a DataStore
  return Biff.createStore({
    // Initial setup
   
   
    get: function () {
      return _Agents;
    }
  }, function (payload) {

    if (payload.actionType === "AGENTS_LOAD") {
      loadAgents(payload.data);
      this.emitChange();
    }

  });
}

function getStore()
{
  var  _Agent=null;

  // Creates a DataStore
  return Biff.createStore({
    // Initial setup
   
    get: function() {
     return _Agent;
    },
    
  }, function (payload) {

    if (payload.actionType === "AGENT_GOT") {
      _Agent = fromJS(payload.data);
      this.emitChange();
    }
    if (payload.actionType === "AGENT_NEW") {
      _Agent = payload.data; 
      this.emitChange();
    }

  });
}
function createStore()
{

  var  _Agent=null;

  // Creates a DataStore
  return Biff.createStore({
    // Initial setup
   
    get: function() {
     return _Agent;
    },
    
  }, function (payload) {

    if (payload.actionType === "AGENT_NEW") {
      _Agent = payload.data || fromJS(
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

    if (payload.actionType === "AGENT_ERROR") {
      _error = payload.data;
      this.emitChange();
    }
    if (payload.actionType === "AGENT_NOERROR") {
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
