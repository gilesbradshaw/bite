import React from "react";

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
        function(self, nodes){
          return function () {
            return renderer(self,nodes);
          };
        },
        (data)=>data
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
        "create",
        name + ".create",
        actions,
        store.get,
        store.error,
        render
      );
      return factory;
    },
    listHead:(render)=>{
      cruded.listHead= crud.listHead (
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
          </div>
    )
    .list( 
      (data) => <div>{data.get('title')}</div>
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