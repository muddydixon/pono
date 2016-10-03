import React, {Component} from "react";

import UserStore from "../stores/user-store";
import UserAction from "../actions/user-action";
import RuleStore from "../stores/rule-store";
import RuleAction from "../actions/rule-action";

import Header from "../components/header";

export default class App extends Component {
  static getStores(){
    return [UserStore, RuleStore];
  }
  static calculateState(){
    return {
      currentUser: UserStore.getState(),
      rules: RuleStore.getState()
    };
  }
  componentDidMount(){
  }
  render(){
    console.log(this.state);
    return <div>
      <Header currentUser={this.state.currentUser} />
      {this.props.children && React.cloneElement(this.props.children, {data: this.state})}
      </div>;
  }
};
