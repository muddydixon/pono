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
    const headers = querystring.parse(refs.headers.value.trim().split("\n").join("&"));
    const body    = querystring.parse(refs.body.value.trim().split("\n").join("&"));
    return {
      headers,
      body
    };
  }
};
