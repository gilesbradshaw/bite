import Biff from "../biff";

// Request
import request from "superagent";
import {fromJS} from "immutable";

export var pathActions= Biff.createActions({
    active: function (path,pathRender) {
      
      if(path && pathRender)
      {
        console.log(`path active::: ${path}`);
        setTimeout(()=>
          {
            this.dispatch({
              actionType: 'PATH_ACTIVE',
              path:path,
              pathRender:pathRender
            });
          },0);
      }
      else
      {
        console.log(`path NOT active::: ${path}`);
      }
    },
    dispose: function (path,pathRender) {
      console.log(`path inactive::: ${path}`);
      setTimeout(()=>
        {
          this.dispatch({
            actionType: 'PATH_INACTIVE',
            path:path,
            pathRender:pathRender
          });
        },0);
    }
});