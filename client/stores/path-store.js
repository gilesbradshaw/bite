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
    if (payload.actionType.startsWith("PATH_ACTIVE")) {
      console.log(`path store ${payload.actionType}   ${payload.path}`);
    }
    if (payload.actionType === "PATH_ACTIVE") {
      _data= _data
        .set("path", payload.path)
        .set("pathRender", payload.pathRender);
      this.emitChange();
    }
    if (payload.actionType === name + "PATH_INACTIVE") {
      _data= _data
        .set("path", '')
        .set("pathRender", undefined);
      this.emitChange();
    }
  });