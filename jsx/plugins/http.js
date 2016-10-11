import React, {Component} from "react";
import querystring from "querystring";

export default class Http extends Component {
  render(){
    return <div>
      <div className="form-group">
        <label>Method</label>
        <select ref="method" id="method" className="form-control">
          {["GET", "POST", "PUT", "DELETE"].map(method => <option key={method} value={method}>{method}</option>)}
        </select>
      </div>
      <div className="form-group">
        <label>Headers</label>
        <textarea ref="headers" id="headers" className="form-control" placeholder="Headers"/>
      </div>
      <div className="form-group">
        <label>Body</label>
        <textarea ref="body" id="body" className="form-control" placeholder="Body"/>
      </div>
    </div>;
  }
  static parseRef(refs){
    const method  = refs.method.value.trim();
    const headers = querystring.parse(refs.headers.value.trim().split("\n").join("&"));
    const body    = querystring.parse(refs.body.value.trim().split("\n").join("&"));
    return {
      method,
      headers,
      body
    };
  }
};

Http.Detail = class Detail extends Component {
  render(){
    const {rule} = this.props;
    return <tbody>
      <tr><td>Name</td><td>{rule.name}</td></tr>
      <tr><td>Identifier</td><td>{rule.identifier}</td></tr>
      <tr><td>Protocol</td><td>{rule.protocol}</td></tr>

      <tr><td>Method</td><td>{rule.method}</td></tr>
      <tr><td>Host</td><td>{rule.host}</td></tr>
      <tr><td>Port</td><td>{rule.port}</td></tr>

      <tr><td>Headers</td><td>{querystring.stringify(rule.payload.headers)}</td></tr>
      <tr><td>Body</td><td>{querystring.stringify(rule.payload.body)}</td></tr>
      </tbody>;
  }
};
