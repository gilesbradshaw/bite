var Biff = require("../biff");

// Request
var request = require("superagent");
var {fromJS}=require("immutable");

function logError(error,res){
  
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
        actionType: "AGENT_ERROR",
        data: err
      }); 
  
}


var AgentActions = Biff.createActions({
  load: function () {
    var self = this;
      request
      .get("/agents")
      .set("Accept", "application/json")
      .end(function (error, res) {
        if(res && res.ok)
        {
          self.dispatch({
            actionType: "AGENTS_LOAD",
            data: JSON.parse(res.text)
          });
          self.dispatch({
            actionType: "AGENT_NOERROR",
          }); 
        }
        else
        {
            logError.bind(self)(error,res);
        }
      });
  },
  _new: function(agent){
    this.dispatch({
      actionType: "AGENT_NEW",
      data: agent
    });
    if(!agent){
      this.dispatch({
        actionType: "AGENT_NOERROR",
      }); 
    }
  },
  post: function (data) {
    var self = this;
      request
      .post("/agents")
      .send(data)
      .set("Accept", "application/json")
      .end( (error, res)=> {
        if(res && res.ok)
        {
          var data=fromJS(JSON.parse(res.text));
          self.dispatch({
            actionType: "AGENT_CREATE",
            data: data
          });
          self.dispatch({
            actionType: "AGENT_NOERROR",
          }); 
        }
        else
        {
            logError.bind(self)(error,res);
        }
        
      });
  },
  put: function (data) {
    var self = this;
      request
      .put("/agencts/" + data.get('_id'))
      .send(data)
      .set("Accept", "application/json")
      .end( (error, res)=> {
        if(res && res.ok)
        {
          var data=fromJS(JSON.parse(res.text));
          self.dispatch({
            actionType: "AGENT_CREATE",
            data: data
          });
          self.dispatch({
            actionType: "AGENT_NOERROR",
          }); 
        }
        else
        {
            logError.bind(self)(error,res);
        }
      });
  },
  del: function (id) {
    var self = this;
      request
      .del("/agents/" +id)
      .send()
      .set("Accept", "application/json")
      .end( (error, res)=> {
        if(res && res.ok)
        {
          self.dispatch({
            actionType: "AGENT_DELETE",
            data: id
          });
          this.dispatch({
            actionType: "AGENT_NEW",
          });
          self.dispatch({
            actionType: "AGENT_NOERROR",
          }); 
        }
        else
        {
            logError.bind(self)(error,res);
        }
      });
  },
  get: function (id) {
    var self = this;
      request
      .get("/agents/" + id)
      .set("Accept", "application/json")
      .end( (error, res)=> {
        if(res && res.ok)
        {
          var data=fromJS(JSON.parse(res.text));
          self.dispatch({
            actionType: "AGENT_GOT",
            data: data
          });
          self.dispatch({
            actionType: "AGENT_NOERROR",
          }); 
        }
        else
        {
            logError.bind(self)(error,res);
        }
      });
  },
});

module.exports = AgentActions;
