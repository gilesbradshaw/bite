import Biff from "../biff";
import _ from "lodash";
import {List,fromJS,Map} from 'immutable';



function listStore(name)
{
  var _items= Map() //List.of(...[]);
  function load (index,items) {
      _items= _items.set(index, List.of(...items.map((u)=>fromJS(u))));
  }
  // Creates a DataStore
  return Biff.createStore({
    // Initial setup
    get: function (index) {
      if(!_items.get(index))
      {
        _items=_items.set(index,List.of(...[]));
      }
      return _items.get(index);// || (_items[index]=List.of(...[]));
    }
  }, function (payload) {
    if (payload.actionType === name + "_LOAD") {
      load(payload.index,payload.items);
      this.emitChange();
    }
    if (payload.actionType === name + "_DISPOSE") {
      _items= _items.remove(payload.index);
      this.emitChange();
    }
  });
}

function getStore(name)
{
  var  _item=Map();
  // Creates a DataStore
  return Biff.createStore({
    // Initial setup
    get: function(index) {
     _item=_item.update(index,(val)=>val||Map());
     return _item.get(index);
    }
  }, function (payload) {
    if (payload.actionType === name + "_GOT") {
      _item=_item.set(payload.index,payload.item);
      this.emitChange();
    }
    if (payload.actionType === name + "_NEW") {
      _item=_item.set(payload.index,payload.item || Map()); 
      this.emitChange();
    }
    if (payload.actionType === name + "_DISPOSE") {
      _item= _item.remove(payload.index);
      this.emitChange();
    }
  });
}
function errorStore(name)
{
  var  _error=Map();
  // Creates a DataStore
  return Biff.createStore({
    // Initial setup
    get: function(index) {
     return _error.get(index);
    },
  }, function (payload) {
    if (payload.actionType === name + "_ERROR") {
      _error=_error.set(payload.index, payload.item);
      this.emitChange();
    }
    if (payload.actionType === name + "_NOERROR") {
      _error=_error.remove(payload.index);
      this.emitChange();
    }
    if (payload.actionType === name + "_DISPOSE") {
      _error= _error.remove(payload.index);
      this.emitChange();
    }
  });
}

export default function(single,plural)
{
  return {
    list:listStore(plural),
    get:getStore(single),
    error:errorStore(single)
  }
}