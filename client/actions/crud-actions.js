var Biff = require("../biff");

// Request
var request = require("superagent");
var {fromJS}=require("immutable");

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
    },
    _new: function(params){
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
    },
    post: function (params) {
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
    },
    put: function (params) {
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
    },
    del: function (params) {
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
    },
    get: function (params) {
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
module.exports=crudActions;