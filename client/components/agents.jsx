// React
var React = require("react");
var crud = require("./crud-creator");
var Store = require("../stores/agent-store");

var Actions = require("../actions/agent-actions");

// Router
var Router = require("react-router");
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
var FormInput = require("./formInput");



module.exports = 
{

  list:crud.lister(
    "Agents",
    Actions,
    Store.list,
    Store.error,
    function(nodes){
      var self=this;
      return function () {
        return (
          <div>
            <p>Agent Bank:</p>
            {nodes()}
            <RouteHandler {...self.props} />
          </div>
        );
      };
    },
    function (data) {
      var params={agentId:data.get('_id')};
      return (
        <div key={data.get('_id')}>
          <div>{data.get('title')}</div>
          <span><Link to="agent" params={params}>View</Link></span>
          <span><Link to="agent-edit" params={params}>Edit</Link></span>
          <span><Link to="agent-delete" params={params}>Delete</Link></span>
        </div>
      );
    }
  ),
  view:crud.viewer (
     "AgentView",
      Actions,
      Store.get,
      Store.error,
      function(){   
        return (
          <div >
             <div>{this.props.item.get('title')}</div>
          </div>
        );
      },
      "agentId"
  ),
  edit:module.exports = crud.editor (
    "AgentEdit",
     Actions,
     Store.get,
     Store.error,
     function(){
        return (
          <div >
             <FormInput id='title' title='Title' value={this.props.item.get('title')} onChange={this.props.handleChange('title')} />
          </div>
        );
     },
     "agentId"
  ),
  del:crud.deleter (
    "AgentDelete",
    Actions,
    Store.get,
    Store.error,
    function(){
        return (
          <div >
             <div>{this.props.item.get('title')}</div>
          </div>
        );
     },
     "agencyId"
  ),
  create:crud.creator (
    "AgentNew",
    Actions,
    Store.create,
    Store.error,
     function(){
        return (
          <div>
             <FormInput id='title' title='Title' value={this.props.item.get('title')} onChange={this.props.handleChange('title')} />
          </div>
        );
     }
  )
}
