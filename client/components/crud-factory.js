import React from "react";
import FormInput from "./formInput";
import Silly from "./Silly";

var crudFactory=(crud, singleId, name, pluralName, actions, store, id)=>
{
  var cruded={};

  var factory= {
    make:(()=>cruded),
    select:(renderer)=>{
      cruded.select = crud.lister(
        singleId,
        name,
        pluralName,
        name + ".select",
        actions,
        store.list,
        store.error,
        (data)=>data,
        function(self, nodes){
          return function () {
            return renderer(self,nodes);
          };
        }
        
      );
      return factory;
    },
    list:(nodeRender,render)=>{
      cruded.list=crud.lister(
        singleId,
        name,
        pluralName,
        name + ".list",
        actions,
        store.list,
        store.error,
        nodeRender,
        render  
      );
      return factory;
    },
    view: (render)=>{
      cruded.view = crud.viewer (
        "view",
         name + ".view",
          actions,
          store.get,
          store.error,
          render,
          id
      );
      return factory;
    },
    head: (render)=>{
      cruded.head=crud.getter (
        name,
         name + ".head",
          actions,
          store.get,
          store.error,
          render,
          id
      );

      return factory;
    },
    edit:(render)=>{
      cruded.edit = crud.editor (
        "edit",
        name + ".edit",
         actions,
         store.get,
         store.error,
         render,
         id
      );
      return factory;
    },
    del:(render)=>{
      cruded.del = crud.deleter (
        name,
        pluralName,
       "delete",
        name + ".delete",
        actions,
        store.get,
        store.error,
        render,
        id
      );
      return factory;
    },
    create:(render)=>{
      cruded.create= crud.creator (
        name,
        pluralName,
        "create",
        name + ".create",
        actions,
        store.get,
        store.error,
        render,
        id
      );
      return factory;
    },
    listHead:(render)=>{
      cruded.listHead= crud.listHead (
        name,
        pluralName,
        pluralName,
        pluralName,
        render
      );
      return factory;
    }
  }


  //defaults
  return factory.listHead(
      (self)=> <h1>{self.state.displayName}</h1>
    )
    .head( 
        (self,item)=>   
          <div >

             <h1>{item.get('title')}</h1>
             <h4 style={{background:'red'}}>{self.state.myPath}</h4>
            <Silly myPath= {self.props.myPath}>
              <h1>can I out stuff in hre???</h1>
              <Silly myPath= {self.props.myPath}/>
            </Silly>
          </div>
    )
    .list( 
      (data) => <div>{data.get('title')}</div>
    )
    .create(
      (self)=>
          <div>
             <FormInput id='title' title='Title' value={self.props.item.get('title')} onChange={self.props.handleChange('title')} />
          </div>
    );
  
    /*.list(
      function(self,nodes){
        return function () {
          return (
            <div>
              <p>Agency Bank:</p>
              <span className="navLink"><Link to="agency">Create</Link></span>
              {nodes()}
            </div>
          );
        };
    })*/;
}

export default crudFactory;