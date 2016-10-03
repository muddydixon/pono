import React from "react";
import {render} from "react-dom";
import {IndexRoute, Route, Router, hashHistory} from "react-router";
import {Container} from "flux/utils";

import App from "./container/app";
import Authed from "./components/authed";
import Unauthed from "./components/unauthed";
import RuleList from "./components/rule-list";
import RuleDetail from "./components/rule-detail";
import RuleCreate from "./components/rule-create";
import TokenList from "./components/token-list";
import PropList from "./components/prop-list";
import Signin from "./components/user-signin";
import Signup from "./components/user-signup";

const routes = <Router history={hashHistory}>
        <Route path="/" component={Container.create(App)} >
          <Route component={Authed}>
            <Route path="rules/new" component={RuleCreate} />
            <Route path="rules/:name" component={RuleDetail} />
            <Route path="rules" component={RuleList} />
          </Route>
          <Route component={Unauthed}>
            <Route path="signin" component={Signin} />
            <Route path="signup" component={Signup} />
          </Route>
        </Route>
  </Router>;

render(routes, document.querySelector("#app"));
