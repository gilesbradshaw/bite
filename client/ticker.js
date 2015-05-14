import Rx from "rx";
import React from "react";


  var socket = io.connect('http://localhost:3000/chat');
  let x=0;  
  socket.on('test', function(data){
    React.render(
  		<div>{++x} {data}</div>,
  		document.getElementById("js-ws")
	);
	socket.emit('testResult', 'ahhhhhh', function(data){
		React.render(
  			<div>{data}</div>,
  			document.getElementById("js-ws-reply")
		);	
	});
  });

const ioSource  = Rx.Observable.create(function(obs){
	var socket = io.connect('http://localhost:3000/chat');
	  socket.on('test', (data)=>{
	  	obs.onNext(data);
	  	}
	  );
	  return ()=> socket.removeAllListeners()
});
ioSource.timestamp().subscribe(data=>
	React.render(
	  <div>rx:  {data.value}  {data.timestamp}</div>,
	  document.getElementById("js-ws-rx")
	)
);

const source = Rx.Observable.timer(500,10).timestamp();
export default source.subscribe( time =>
	React.render(
	  <div>{time.value}  {time.timestamp}</div>,
	  document.getElementById("js-ticker")
	)
);

