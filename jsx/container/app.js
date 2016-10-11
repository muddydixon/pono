import React, {Component} from "react";

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
    return <div>
      <Header currentUser={this.state.currentUser} />
      <Error error={this.state.error} />
      {this.props.children && React.cloneElement(this.props.children, {data: this.state})}
      </div>;
  }
};
