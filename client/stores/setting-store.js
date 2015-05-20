import Biff from "../biff";
import _ from "lodash";
import {List,fromJS,Map} from 'immutable';


var _data=Map();

export var settingStore = Biff.createStore({
    // Initial setup
    get: function (name) {
      return _data.get(name);
    }
  }, function (payload) {
    if (payload.actionType === "SETTING") {
      _data= _data
        .setIn([payload.name], payload.value);
      this.emitChange();
    }
  });