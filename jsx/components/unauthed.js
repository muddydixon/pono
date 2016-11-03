import React, {Component} from "react";
import UserAction from "../actions/user-action";

export default class Unauthed extends Component {
  componentWillMount(){
    if(this.props.data.currentUser){
      this.context.router.push("/dashboard");
    }else{
      UserAction.fetchCurrentUser();
    }
  }
  componentWillReceiveProps(){
    if(this.props.data.currentUser){
      this.context.router.push("/dashboard");
    }else{
      UserAction.fetchCurrentUser();
    }
  }
  render(){
    return <div>
      {this.props.children && React.cloneElement(this.props.children, {data: this.props.data})}
      </div>;
  }
};
Unauthed.contextTypes = {router: React.PropTypes.object.isRequired};
