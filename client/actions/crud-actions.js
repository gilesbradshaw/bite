import Biff from "../biff";

// Request
import request from "superagent";
import {fromJS} from "immutable";
import agentPromise from './superagent-promise';


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
        actionType: `${single}_ERROR`,
        index:index,
        item:err
      }); 
  
}


function crudActions(single, plural,path, getData)
{
  getData=getData||{};
  const getItem = (text, params)=> getData.item ?  getData.item(fromJS(JSON.parse(text)), params) : fromJS(JSON.parse(text));
  return Biff.createActions({
    load: function (params) {
        var self = this;
        setTimeout(async function ()
        {
          try {
            const res = await request
              .get(path.many(params))
              .set("Accept", "application/json,*/*")
              .use(agentPromise)
              .end();
              self.dispatch({
                actionType: `${plural}_LOAD`,
                items:getData.items ? getData.items(JSON.parse(res.text), params) : JSON.parse(res.text),
                index:params.index  
              });
              self.dispatch({
                actionType: `${single}_NOERROR`,
                index:params.index
              }); 
          } catch(error)
          {
            logError.bind(self)(error.error.message,error, single, params.index);
          }
          
        },0);
    },
    set: function(params){
      setTimeout(()=>
      {
        this.dispatch({
          actionType: `${single}_NEW`,
          index: params.index,
          item:params.item
        });
        if(!params.item){
          this.dispatch({
            actionType: `${single}_NOERROR`,
            index:params.index
          }); 
        }
      },0);
    },
    post: function (params) {
      var self = this;
      setTimeout(async function ()
      {
        var item = params.item.delete('_id');
        
        try
        {
          let res = await request
            .post(path.many(params))
            .use(agentPromise)
            .send(item)
            .set("Accept", "application/json,*/*")
            .end();

          var data=getItem(res.text, params);
          self.dispatch({
            actionType: `${single}_CREATE`,
            item:data,
            index:params.index
          });
          self.dispatch({
            actionType: `${single}_NOERROR`,
            index:params.index
          });
        }
        catch(error) 
        {
          logError.bind(self)(error.error.message,error, single, params.index);
        }
                    
      
      },0);
    },
    put: function (params) {
      var self = this;
      setTimeout( async function()
      {
        try{
          let res= await request
            .put(path.single ? path.single(params) : `${path.many(params)}/${params.id}`)
            .use(agentPromise)
            .send(params.item)
            .set("Accept", "application/json,*/*")
            .end();
            var data=getItem(res.text, params);
            self.dispatch({
              actionType: `${single}_CREATE`,
              item:data,
              index:params.index
            });
            self.dispatch({
              actionType: `${single}_NOERROR`,
              index:params.index
            }); 
        }
        catch(error)
        {
            logError.bind(self)(error.error.message,error, single, params.index);
        }
      },0)
    },
    del: function (params) {
      var self = this;
      setTimeout( async function()
      {
        try{
          let res = await request
            .del(path.single ? path.single(params) : `${path.many(params)}/${params.id}`)
            .use(agentPromise)
            .send()
            .set("Accept", "application/json,*/*")
            .end();
          
            self.dispatch({
              actionType: `${single}_DELETE`,
              index: params.index,
              id:params.id
            });
            this.dispatch({
              actionType: `${single}_NEW`,
              index:params.index
            });
            self.dispatch({
              actionType: `${single}_NOERROR`,
              index:params.index
            }); 
          }
          catch(error)
          {
              logError.bind(self)(error.error.message,error, single, params.index);
          }
      
      },0);
    },
    get: function (params) {
      var self = this;
      setTimeout(async function ()
      {
        
        try{
          let res = await request
            .get(path.single ? path.single(params) : `${path.many(params)}/${params.id}`)
            .use(agentPromise)
            .set("Accept", "application/json,*/*")
            .end();
          
            var data=getItem(res.text, params);
            self.dispatch({
              actionType: `${single}_GOT`,
              item:data,
              index:params.index
            });
            self.dispatch({
              actionType: `${single}_NOERROR`,
              index:params.index
            }); 
          }
          catch(error)
          {
            if(error)
              logError.bind(self)(error.error.message,error, single, params.index);
            else
              window.alert("caught with no errror");
          }
        
      },0);
    },
    dispose: function (index) {
      this.dispatch({
        actionType: `${single}_DISPOSE`,
        index:index
      });
      this.dispatch({
        actionType: `${plural}_DISPOSE`,
        index:index
      });
    }
  });
}
export default crudActions;