import React, {Component} from "react";
import PropAction from "../actions/prop-action";
import Prop from "./prop";

export default class PropList extends Component {
  onSubmit(){
    const key = this.refs.key.value.trim();
    const val = this.refs.val.value.trim();

    PropAction.create({key, val, rule: this.props.ruleName});
  }
  render(){
    const {props} = this.props;
    return <table className="table">
      <thead>
      <tr><th>Prop</th><th colSpan="2">Value</th></tr>
      </thead>
      <tfoot>
      <tr>
      <th><input className="form-control" type="text" ref="key" /></th><th><input className="form-control" type="text" ref="val" /></th><th><button className="btn btn-info" onClick={this.onSubmit.bind(this)}>Add Properties</button></th></tr>
      </tfoot>
      <tbody>
      {props.map(prop => <Prop key={prop.id} prop={prop} />)}
      </tbody>
      </table>;
  }
};
