
var crudFactory=(crud, name, actions, store, id)=>
{
  var cruded={};

  var factory= {
    make:(()=>cruded),
    select:(renderer)=>{
      cruded.select = crud.lister(
        name + ".select",
        actions,
        store.list,
        store.error,
        function(nodes){
          var self=this;
          return function () {
            return renderer(self,nodes);
          };
        },
        (data)=>data
      );
      return factory;
    },
    list:(render, nodeRender)=>{
      cruded.list=crud.lister(
        name + ".list",
        actions,
        store.list,
        store.error,
        render,
        nodeRender
        
      );
      return factory;
    },
    view: (render)=>{
      cruded.view = crud.viewer (
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
      cruded.head=crud.viewer (
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
        name + ".create",
        actions,
        store.get,
        store.error,
        render
      );
      return factory;
    }
  }
  return factory;
}

export default crudFactory;