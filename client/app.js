// ENTRY POINT

// Router
import Router from "./router";

import ticker from "./ticker";

require("./styles/main.css");
//require("./styles/flexboxgrid.css");


// Fire up the router and attach to DOM
Router.run(document.getElementById	("js-content"));

