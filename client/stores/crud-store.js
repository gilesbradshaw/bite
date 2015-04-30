var Biff = require("../biff");
var _ = require("lodash");
var {List,fromJS} = require('immutable');

function dispose(item,name, payload)
{
  if (payload.actionType === name + "_DISPOSE") {
      delete item[payload.index];
      this.emitChange();
    }
}

function listStore(name)
{
  var _items= List.of(...[]);
  function load (items) {
      _items = List.of(...items.map((u)=>fromJS(u)));
  }
  // Creates a DataStore
  return Biff.createStore({
    // Initial setup
    get: function () {
      return _items;
    }
  }, function (payload) {
    if (payload.actionType === name + "_LOAD") {
      load(payload.items);
      this.emitChange();
    }
  });
}

function getStore(name)
{
  var  _item={};
  // Creates a DataStore
  return Biff.createStore({
    // Initial setup
    get: function(index) {
     return _item[index];
    },
  }, function (payload) {
    if (payload.actionType === name + "_GOT") {
      _item[payload.index] = fromJS(payload.item);
      this.emitChange();
    }
    if (payload.actionType === name + "_NEW") {
      _item[payload.index] = payload.item; 
      this.emitChange();
    }
    dispose.bind(this)(_item, name, payload);
  });
}
function createStore(name)
{
  var  _item={};
  // Creates a DataStore
  return Biff.createStore({
    // Initial setup
    get: function(index) {
     return _item[index];
    },
    
  }, function (payload) {
    if (payload.actionType === name + "_NEW") {
      _item[payload.index] = payload.item || fromJS({});
      this.emitChange();
    }
    dispose.bind(this)(_item, name, payload);
  });
}

function errorStore(name)
{
  var  _error={};
  // Creates a DataStore
  return Biff.createStore({
    // Initial setup
    get: function(index) {
     return _error[index];
    },
  }, function (payload) {
    if (payload.actionType === name + "_ERROR") {
      _error[payload.index] = payload.item;
      this.emitChange();
    }
    if (payload.actionType === name + "_NOERROR") {
      delete _error[payload.index];
      this.emitChange();
    }
    dispose.bind(this)(_error, name, payload);
  });
}

module.exports = function(single,plural)
{
  return {
    list:listStore(plural),
    get:getStore(single),
    create:createStore(single),
    error:errorStore(single)
  }
}