import React from "react";
import FormInput from "./formInput";
import Silly from "./Silly";
import _ from 'lodash';
import {Link} from './link/links';




var crudFactory=(crud, singleId, name, pluralName, actions, store, id, itemId)=>
{
  crud=crud(name, itemId);
  var cruded={};
  var cruder={};
  
  var factory= {
    make:()=>{
      if(cruder.head)
      {
        cruded.head=crud.getter (
          name,
           name + ".head",
            actions,
            store.get,
            store.error,
            cruder.head.render,
            id,
            cruder.head.menuRender
        );
      }
      if(cruder.select)
      {
        cruded.select = crud.lister(
          singleId,
          pluralName,
          name + ".select",
          actions,
          store.list,
          store.error,
          (data)=>data,
          function(self, nodes){
            return function () {
              return cruder.select.renderer(self,nodes);
            };
          }
          
        );
      }
      if(cruder.list)
      {
        cruded.list=crud.lister(
          singleId,
          pluralName,
          name + ".list",
          actions,
          store.list,
          store.error,
          cruder.list.nodeRender,
          cruder.list.render,
          cruder.list.menuLinks
        );
      }
      if(cruder.view)
      {
        cruded.view = crud.viewer (
          "view",
           name + ".view",
            actions,
            store.get,
            store.error,
            cruder.view.render,
            id,
            cruder.view.menuRender
        );
      }
      if(cruder.edit)
      {
        cruded.edit = crud.editor (
          "edit",
          name + ".edit",
           actions,
           store.get,
           store.error,
           cruder.edit.render,
           id
        );
      }
      if(cruder.del)
      {
        cruded.del = crud.deleter (
          pluralName,
         "delete",
          name + ".delete",
          actions,
          store.get,
          store.error,
          cruder.del.render,
          id
        );
      }
      if(cruder.create)
      {
        cruded.create= crud.creator (
          pluralName,
          "create",
          name + ".create",
          actions,
          store.get,
          store.error,
          cruder.create.render,
          id
        );
      }
      if(cruder.listHead)
      {
        cruded.listHead= crud.listHead (
          pluralName,
          pluralName,
          pluralName,
          cruder.listHead.render
        );
      }

      return cruded
    },
    select:makeCruder('select',['renderer']),
    list:makeCruder('list', ['render', 'nodeRender', 'menuLinks']),
    head:makeCruder('head', ['render', 'menuRender']),
    view:makeCruder('view', ['render']),
    edit:makeCruder('edit', ['render']),
    del:makeCruder('del', ['render']),
    create:makeCruder('create', ['render']),
    listHead:makeCruder('listHead', ['render'])
  }


  //defaults
  return factory.listHead().render(
      (self)=> <h1>{self.state.displayName}</h1>
    )()
    .head().render(
        (self,item)=>   
          <div>
             <h1>{item.get('title')}</h1>
          </div>
    )()
    .listHead().render((self)=><span className="navLink"><Link to={self.state.myPath + '-create'} params={self.props.params}>Create</Link></span>)()
    .list().nodeRender(
      (data) => <div>{data.get('title')}</div>
    )
    .menuLinks(
      (self,data,params)=>[
        {title:'View',path:self.state.myPath + "-view"},
        {title:'Edit',path:self.state.myPath + "-edit"},
        {title:'Delete',path:self.state.myPath + "-delete"},
      ]
    )()
    .create().render(
      (self)=>
          <div>
             <FormInput id='title' title='Title' value={self.props.item.get('title')} onChange={self.props.handleChange('title')} />
          </div>
    )();
  
    function makeCruder(name, cruders){
    return ()=>
    {
      const ret = ()=>factory;
        for(let cruderField of cruders)
        {
          ret[cruderField]=(i)=>{
            cruder[name]=_.extend(cruder[name]||{},{[cruderField]:i});
            return ret;
          };  
        }
      
      return ret;
     } 
  }
}

export default crudFactory;