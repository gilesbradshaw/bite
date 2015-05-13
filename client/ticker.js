import Rx from "rx";
import React from "react";


const source = Rx.Observable.timer(500,10).timestamp();


export default source.subscribe( time =>
	React.render(
	  <div>{time.value}  {time.timestamp}</div>,
	  document.getElementById("js-ticker")
	)
);

