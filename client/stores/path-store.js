import Biff from "../biff";
import _ from "lodash";
import {List,fromJS,Map} from 'immutable';


var _data=Map();

export var pathStore = Biff.createStore({
    // Initial setup
    get: function () {
      return _data;
    }
  }, function (payload) {
    if (payload.actionType === "PATH_ACTIVE") {
      _data= _data
        .setIn([payload.name,payload.path], payload.pathRender);
      this.emitChange();
    }
    if (payload.actionType === name + "PATH_INACTIVE") {
      _data= _data
        .deleteIn([payload.name,payload.path]);
      this.emitChange();
    }
  });