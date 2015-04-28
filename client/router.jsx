// React
var React = require("react");
var Router = require("react-router");
var App = require("./components/app");
var Home = require("./components/home");
var Agencies = require("./components/agencies");
var Agents = require("./components/agents");
var Users = require("./components/users");
var User = require("./components/user.edit");
var Me = require("./components/user.me");
var UserSignUp = require("./components/user.sign.up");
var UserSignIn = require("./components/user.sign.in");
var UserSignOut = require("./components/user.sign.out");

var NotFound = require("./components/notfound");

// Request
var request = require("superagent");

// Set up Router object
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

// Declare routes
var routes = (
  <Route handler={App} path="/">
    <DefaultRoute name="app" handler={Home} />
    <Route name="agencies" handler={Agencies.list} />
    <Route name="agency" path="/agency/:agencyId" handler={Agencies.view} />
    <Route name="agency-create" handler={Agencies.create} />
    <Route name="agency-edit"  path="/agency-edit/:agencyId" handler={Agencies.edit} />
    <Route name="agency-delete"  path="/agency-delete/:agencyId" handler={Agencies.del} />
    
    <Route name="agents" handler={Agents.list} />
    <Route name="agent" path="/agent/:agentId" handler={Agents.view} />
    <Route name="agent-create" handler={Agents.create} />
    <Route name="agent-edit"  path="/agent-edit/:agentId" handler={Agents.edit} />
    <Route name="agent-delete"  path="/agent-delete/:agentId" handler={Agents.del} />

    <Route name="users" handler={Users}>
      <Route name="user" path="/user/:userId" handler={User} />

    </Route>
    <Route name="me" path="/me" handler={Me} props={{userId:'hey'}} />
    <Route name="signup" handler={UserSignUp} />
    <Route name="signin" handler={UserSignIn} />
    <Route name="signout" handler={UserSignOut} />
    <NotFoundRoute handler={NotFound} />
  </Route>
);

module.exports = {
  run: (el)=> {
    Router.run(routes, function (Handler, state) {
          // "Alternatively, you can pass the param data down..."
          // https://github.com/rackt/react-router/blob/master/docs/guides/
          // overview.md#dynamic-segments
          var params = state.params;
          React.render(<Handler params={params} />, el);
        });
   
  }
};
