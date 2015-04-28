// React
var React = require("react");
var crud = require("./crud-creator");
var Store = require("../stores/agency-store");

var Actions = require("../actions/agency-actions");

// Router
var Router = require("react-router");
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
var FormInput = require("./formInput");



module.exports = 
{

  list:crud.lister(
    "Agencies",
    Actions,
    Store.list,
    Store.error,
    function(nodes){
      var self=this;
      return function () {
        return (
          <div>
            <p>Agency Bank:</p>
            {nodes()}
            <RouteHandler {...self.props} />
          </div>
        );
      };
    },
    function (data) {
      var params={agencyId:data.get('_id')};
      return (
        <div key={data.get('_id')}>
          <div>{data.get('title')}</div>
          <span><Link to="agency" params={params}>View</Link></span>
          <span><Link to="agency-edit" params={params}>Edit</Link></span>
          <span><Link to="agency-delete" params={params}>Delete</Link></span>
        </div>
        //<Agency agency={data} key={data.get('_id')} />
      );
    }
  ),
  view:crud.viewer (
     "AgencyView",
      Actions,
      Store.get,
      Store.error,
      function(){   
        return (
          <div >
             <div>{this.props.item.get('title')}</div>
             <div>{this.props.item.get('website')}</div>         
          </div>
        );
      },
      "agencyId"
  ),
  edit:module.exports = crud.editor (
    "AgencyEdit",
     Actions,
     Store.get,
     Store.error,
     function(){
        return (
          <div >
             <FormInput id='title' title='Title' value={this.props.item.get('title')} onChange={this.props.handleChange('title')} />
             <FormInput id='website' title='Web site'  value={this.props.item.get('website')} onChange={this.props.handleChange('website')} />
          </div>
        );
     },
     "agencyId"
  ),
  del:crud.deleter (
    "AgencyDelete",
    Actions,
    Store.get,
    Store.error,
    function(){
        return (
          <div >
             <div>{this.props.item.get('title')}</div>
             <div>{this.props.item.get('website')}</div>
          </div>
        );
     },
     "agencyId"
  ),
  create:crud.creator (
    "AgencyNew",
    Actions,
    Store.create,
    Store.error,
     function(){
        return (
          <div>
             <FormInput id='title' title='Title' value={this.props.item.get('title')} onChange={this.props.handleChange('title')} />
             <FormInput id='website' title='Web site'  value={this.props.item.get('website')} onChange={this.props.handleChange('website')} />
          </div>
        );
     }
  )
}
