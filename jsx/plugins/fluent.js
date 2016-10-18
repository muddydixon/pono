import React, {Component} from "react";
import querystring from "querystring";

export default class Fluent extends Component {
  render(){
    return <div>
      <div className="form-group">
        <label>Tag</label>
        <input ref="tag" id="tag" className="form-control" placeholder="Tag"/>
      </div>
      <div className="form-group">
        <label>Message</label>
        <textarea ref="message" id="message" className="form-control" placeholder="Message"/>
      </div>
    </div>;
  }
  static parseRef(refs){
    const tag   = refs.tag.value.trim();
    const message = querystring.parse(refs.message.value.trim().split("\n").join("&"));
    return {
      tag,
      message
    };
  }
};

Fluent.Detail = class Detail extends Component {
  render(){
    const {rule} = this.props;
    return <tbody>
      <tr><td>Name</td><td>{rule.name}</td></tr>
      <tr><td>Identifier</td><td>{rule.identifier}</td></tr>
      <tr><td>Protocol</td><td>{rule.protocol}</td></tr>

      <tr><td>Tag</td><td>{rule.payload.tag}</td></tr>
      <tr><td>Message</td><td>{rule.payload.message}</td></tr>
      </tbody>;
  }
};
