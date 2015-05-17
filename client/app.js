// ENTRY POINT

// Router
import Router from "./router";

import ticker from "./ticker";

require("./styles/main.css");
require("./styles/flexboxgrid.css");

const annotate= function(target)
{
	return function(hey)
	{
		const heyhey=hey+hey;
		return new target(heyhey);
	}
}

@annotate
class what {
	constructor(hey){
		this.hey=hey;
	}
}

const whatever = new what('ahhhh');

// Fire up the router and attach to DOM
Router.run(document.getElementById	("js-content"));

