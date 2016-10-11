import React, {Component} from "react";
import RuleAction from "../actions/rule-action";
import TokenAction from "../actions/token-action";

export default class Authed extends Component {
  componentWillMount(){
    if(!this.props.data.currentUser){
      this.context.router.push("/signin");
    }else{
      RuleAction.fetchAll();
      TokenAction.fetchAll();
    }
  }
  componentWillReceiveProps(){
    if(!this.props.data.currentUser){
      this.context.router.push("/signin");
    }
  }
  render(){
    return <div>
      {this.props.children && React.cloneElement(this.props.children, {data: this.props.data})}
      </div>;
  }
};
Authed.contextTypes = {router: React.PropTypes.object.isRequired};
