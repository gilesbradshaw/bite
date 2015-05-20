// ENTRY POINT

// Router
import Router from "./router";

import ticker from "./ticker";
import 'core-js/modules/es6.reflect' // Reflect polyfill is required


require("./styles/main.css");
require("./styles/menu.css");
require("./styles/flexboxgrid.css");

//require("./styles/flexboxgrid.css");


// Fire up the router and attach to DOM
Router.run(document.getElementById	("js-content"));

