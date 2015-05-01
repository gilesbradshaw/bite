import Biff from "../biff";

// Request
import request from "superagent";
import {fromJS} from "immutable";

function logError(error,res, single, index){
  
      var err = 'an error has occurred';

      if(error)
      {
        err=error;
      }
      else
      {
        if(res && res.body && res.body.message)
        {
          err=res.body.message;
        }
      }
     this.dispatch({
        actionType: single + "_ERROR",
        index:index,
        item:err
      }); 
  
}


function crudActions(single, plural)
{
  return Biff.createActions({
    load: function (params) {
      var self = this;
        setTimeout(()=>
        {
          request
          .get("/" + plural)
          .set("Accept", "application/json")
          .end(function (error, res) {
            if(res && res.ok)
            {
              self.dispatch({
                actionType: plural + "_LOAD",
                items:JSON.parse(res.text),
                index:params.index  
              });
              self.dispatch({
                actionType: single + "_NOERROR",
                index:params.index
              }); 
            }
            else
            {
                logError.bind(self)(error,res, single, params.index);
            }
          });
        },0);
    },
    set: function(params){
      setTimeout(()=>
      {
        this.dispatch({
          actionType: single + "_NEW",
          index: params.index,
          item:params.item
        });
        if(!params.item){
          this.dispatch({
            actionType: single+ "_NOERROR",
            index:params.index
          }); 
        }
      },0);
    },
    post: function (params) {
      setTimeout(()=>
      {
        var self = this;
        request
        .post("/" + plural)
        .send(params.item)
        .set("Accept", "application/json")
        .end( (error, res)=> {
          if(res && res.ok)
          {
            var data=fromJS(JSON.parse(res.text));
            self.dispatch({
              actionType: single + "_CREATE",
              item:data,
              index:params.index
            });
            self.dispatch({
              actionType: single + "_NOERROR",
              index:params.index
            }); 
          }
          else
          {
              logError.bind(self)(error,res, single, params.index);
          }
          
        });
      },0);
    },
    put: function (params) {
      setTimeout( ()=>
      {
        var self = this;
        request
        .put("/"+ plural + "/" + params.item.get('_id'))
        .send(params.item)
        .set("Accept", "application/json")
        .end( (error, res)=> {
          if(res && res.ok)
          {
            var data=fromJS(JSON.parse(res.text));
            self.dispatch({
              actionType: single + "_CREATE",
              item:data,
              index:params.index
            });
            self.dispatch({
              actionType: single + "_NOERROR",
              index:params.index
            }); 
          }
          else
          {
              logError.bind(self)(error,res, single, params.index);
          }
        });
      },0)
    },
    del: function (params) {
      setTimeout( ()=>
      {
        var self = this;
        request
        .del("/"+ plural + "/" + params.id)
        .send()
        .set("Accept", "application/json")
        .end( (error, res)=> {
          if(res && res.ok)
          {
            self.dispatch({
              actionType: single + "_DELETE",
              index: params.index,
              id:params.id
            });
            this.dispatch({
              actionType: single + "_NEW",
              index:params.index
            });
            self.dispatch({
              actionType: single + "_NOERROR",
              index:params.index
            }); 
          }
          else
          {
              logError.bind(self)(error,res, single, params.index);
          }
        });
      },0);
    },
    get: function (params) {
      setTimeout( ()=>
      {
        var self = this;
        request
        .get("/"+ plural + "/" + params.id)
        .set("Accept", "application/json")
        .end( (error, res)=> {
          if(res && res.ok)
          {
            var data=fromJS(JSON.parse(res.text));
            self.dispatch({
              actionType: single + "_GOT",
              item:data,
              index:params.index
            });
            self.dispatch({
              actionType: single + "_NOERROR",
              index:params.index
            }); 
          }
          else
          {
              logError.bind(self)(error,res, single, params.index, params.index);
          }
        });
      },0);
    },
    children: function(name)
    {
      return {
        get:function (params) {
          setTimeout( ()=>
          {
            var self = this;
            request
            .get("/"+ plural + "/" + params.id + "/" + name)
            .set("Accept", "application/json")
            .end( (error, res)=> {
              if(res && res.ok)
              {
                var data=fromJS(JSON.parse(res.text));           
              }
              else
              {
                  logError.bind(self)(error,res, single, params.index, params.index);
              }
            });
          },0);
        },
        post:function (params) {
          setTimeout( ()=>
          {
            var self = this;
            request
            .post("/"+ plural + "/" + params.id + "/" + name)
            .set("Accept", "application/json")
            .send(params.item)
            .end( (error, res)=> {
              if(res && res.ok)
              {
                var data=fromJS(JSON.parse(res.text));           
              }
              else
              {
                  logError.bind(self)(error,res, single, params.index, params.index);
              }
            });
          },0);
        }
      }
    },
    dispose: function (index) {
      this.dispatch({
        actionType: single + "_DISPOSE",
        index:index
      });
      this.dispatch({
        actionType: plural + "_DISPOSE",
        index:index
      });
    }
  });
}
export default crudActions;