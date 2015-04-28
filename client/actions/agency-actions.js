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
        actionType: "AGENCY_ERROR",
        data: err
      }); 
  
}


var AgencyActions = Biff.createActions({
  load: function () {
    var self = this;
      request
      .get("/agencies")
      .set("Accept", "application/json")
      .end(function (error, res) {
        if(res && res.ok)
        {
          self.dispatch({
            actionType: "AGENCIES_LOAD",
            data: JSON.parse(res.text)
          });
          self.dispatch({
            actionType: "AGENCY_NOERROR",
          }); 
        }
        else
        {
            logError.bind(self)(error,res);
        }
      });
  },
  _new: function(agency){
    this.dispatch({
      actionType: "AGENCY_NEW",
      data: agency
    });
    if(!agency){
      this.dispatch({
        actionType: "AGENCY_NOERROR",
      }); 
    }
  },
  post: function (data) {
    var self = this;
      request
      .post("/agencies")
      .send(data)
      .set("Accept", "application/json")
      .end( (error, res)=> {
        if(res && res.ok)
        {
          var data=fromJS(JSON.parse(res.text));
          self.dispatch({
            actionType: "AGENCY_CREATE",
            data: data
          });
          self.dispatch({
            actionType: "AGENCY_NOERROR",
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
      .put("/agencies/" + data.get('_id'))
      .send(data)
      .set("Accept", "application/json")
      .end( (error, res)=> {
        if(res && res.ok)
        {
          var data=fromJS(JSON.parse(res.text));
          self.dispatch({
            actionType: "AGENCY_CREATE",
            data: data
          });
          self.dispatch({
            actionType: "AGENCY_NOERROR",
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
      .del("/agencies/" +id)
      .send()
      .set("Accept", "application/json")
      .end( (error, res)=> {
        if(res && res.ok)
        {
          self.dispatch({
            actionType: "AGENCY_DELETE",
            data: id
          });
          this.dispatch({
            actionType: "AGENCY_NEW",
          });
          self.dispatch({
            actionType: "AGENCY_NOERROR",
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
      .get("/agencies/" + id)
      .set("Accept", "application/json")
      .end( (error, res)=> {
        if(res && res.ok)
        {
          var data=fromJS(JSON.parse(res.text));
          self.dispatch({
            actionType: "AGENCY_GOT",
            data: data
          });
          self.dispatch({
            actionType: "AGENCY_NOERROR",
          }); 
        }
        else
        {
            logError.bind(self)(error,res);
        }
      });
  },
});

module.exports = AgencyActions;
