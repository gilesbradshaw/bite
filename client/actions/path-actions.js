import Biff from "../biff";

// Request
import request from "superagent";
import {fromJS} from "immutable";

export var pathActions= Biff.createActions({
    active: function (name,path,pathRender) {
      
      if(path && pathRender)
      {
        console.log(`path active:: ${name}: ${path}`);
        setTimeout(()=>
          {
            this.dispatch({
              actionType: 'PATH_ACTIVE',
              name:name,
              path:path,
              pathRender:pathRender
            });
          },0);
      }
      else
      {
        console.log(`path NOT active:: ${name}: ${path}`);
      }
    },
    dispose: function (name,path) {
      console.log(`path inactive:: ${name}: ${path}`);
      setTimeout(()=>
        {
          this.dispatch({
            actionType: 'PATH_INACTIVE',
            name:name,
            path:path,
          });
        },0);
    }
});