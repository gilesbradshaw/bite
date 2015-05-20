import Biff from "../biff";

// Request
import request from "superagent";
import {fromJS} from "immutable";

export var settingActions= Biff.createActions({
    setting: function (name,value) {
        setTimeout(()=>
          {
            this.dispatch({
              actionType: 'SETTING',
              name:name,
              value:value
            });
          },0);
    }
});