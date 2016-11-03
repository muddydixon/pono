import React, {Component} from "react";
import * as Url from "url";

import ErrorStore from "../stores/error-store";
import UserStore from "../stores/user-store";
import RuleStore from "../stores/rule-store";
import TokenStore from "../stores/token-store";

import Header from "../components/header";
import Error from "../components/error";

export default class App extends Component {
  static getStores(){
    return [UserStore, RuleStore, TokenStore, ErrorStore];
  }
  static calculateState(){
    return {
      currentUser: UserStore.getState(),
      rules: RuleStore.getState(),
      tokens: TokenStore.getState(),
      error: ErrorStore.getState()
    };
  }
  componentDidMount(){
  }
  render(){
    console.log(this.state);
    const url = Url.parse(location.hash.slice(1));
    // if(url.pathname === "/") location.href = "#/signin";
    if(url.pathname === "/"){
      return <div>
        <Header currentUser={this.state.currentUser} />
        <Error error={this.state.error} />
        <div className="container">
        <h1 className="text-center" style={{fontSize: "10em"}}>>Pono></h1>
        <hr />
        <p className="lead">
        Pono ("right" in Hawaii) is a service to translate HTTP GET requests into arbitrary TCP protocol requests, such as:
        </p>
        <ul className="lead">
        <li>GET HTTP Requeest -> POST HTTPS Request with headers and a body</li>
        <li>GET HTTP Requeest -> MQTT Request with a topic and a message</li>
        <li>GET HTTP Requeest -> Fluentd Request with a tag and a records</li>
        </ul>
        <p className="lead">
        Pono enpowers "webhook" from "slack" / "github" to post "Slack" or "Line",
        </p>
        <img className="text-center" style={{display: "block", margin: "auto"}} src="/images/pono-example.png" />

        <hr />
        <h2>Security</h2>
        <p className="lead">
        You can make "tokens" for each rule. These are used with query in GET requests to PONO.
        </p>
        <pre className="lead">
        <code>
        curl -X GET "https://pono.XXX?token=YYY&message=hello"
        </code>
        </pre>
        <ul className="lead">
        <li>You can revoke / regenerate tokens easily</li>
        <li>You can set whitelist ip / cidr for each token</li>
        </ul>
        </div>
        </div>;
    }

    return <div>
      <Header currentUser={this.state.currentUser} />
      <Error error={this.state.error} />
      {this.props.children && React.cloneElement(this.props.children, {data: this.state})}
      </div>;
  }
};
