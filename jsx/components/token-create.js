import React, {Component} from "react";
import Const from "../constants";
import uuid from "uuid";

import TokenAction from "../actions/token-action";
import ErrorAction from "../actions/error-action";

const ipRegexp = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

export default class TokenCreate extends Component {
  constructor(props){
    super(props);
    this.state = {
      token: uuid().replace(/-/g, "")
    };
  }
  isValidWhitelist(whitelist){
    if(whitelist.length === 0) return true;
    const lists = whitelist.split(/\s*,\s*/);
    return lists.every(l => ipRegexp.test(l));
  }
  onRegenerate(){
    this.setState({
      token: uuid().replace(/-/g, "")
    });
  }
  onSubmit(ev){
    ev.preventDefault();
    const name      = this.refs.name.value.trim();
    const whitelist = this.refs.whitelist.value.trim();
    const token     = this.refs.token.value.trim();
    const rule_id   = this.refs.rule.value.trim();
    if(!this.isValidWhitelist(whitelist)) return ErrorAction.error(new Error("invalid whitelist"));
    return TokenAction.create({name, whitelist, rule_id, token}).then(()=>{
      this.context.router.push("/tokens");
    });
  }
  render(){
    const {rules} = this.props.data;
    if(!rules || !rules.length) return null;
    return <div className="container">
      <form onSubmit={this.onSubmit.bind(this)}>
        <div className="form-group">
          <label>Token Name</label>
          <input type="text" ref="name" id="name" className="form-control" placeholder="Token name"/>
        </div>
        <div className="form-group">
          <label>IP Whitelist (Comma Separated)</label>
          <input type="text" ref="whitelist" id="whitelist" className="form-control" placeholder="Whitelist" />
        </div>
        <div className="form-group">
          <label>Rule</label>
          <select ref="rule" id="rule" className="form-control" defaultValue={rules[0].id}>
            {rules.map(rule => <option key={rule.id} value={rule.id}>{rule.name}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label>Token</label>
          <input type="text" ref="token" id="token" className="form-control" readOnly value={this.state.token} />
        </div>
        <button className="btn btn-danger" onClick={this.onRegenerate.bind(this)}>Regenerate</button>&nbsp;
        <button type="submit" className="btn btn-info">Create Token</button>
      </form>
      </div>;
  }
};

TokenCreate.contextTypes = {router: React.PropTypes.object.isRequired};
