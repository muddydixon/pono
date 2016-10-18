import React, {Component} from "react";
import querystring from "querystring";

export default class Mqtt extends Component {
  render(){
    return <div>
      <div className="form-group">
        <label>Topic</label>
        <input ref="topic" id="topic" className="form-control" placeholder="Topic"/>
      </div>
      <div className="form-group">
        <label>Message</label>
        <textarea ref="message" id="message" className="form-control" placeholder="Message"/>
      </div>
    </div>;
  }
  static parseRef(refs){
    const topic   = refs.topic.value.trim();
    const message = refs.message.value.trim();
    return {
      topic,
      message
    };
  }
};

Mqtt.Detail = class Detail extends Component {
  render(){
    const {rule} = this.props;
    return <tbody>
      <tr><td>Name</td><td>{rule.name}</td></tr>
      <tr><td>Identifier</td><td>{rule.identifier}</td></tr>
      <tr><td>Protocol</td><td>{rule.protocol}</td></tr>

      <tr><td>Topic</td><td>{rule.payload.topic}</td></tr>
      <tr><td>Message</td><td>{rule.payload.message}</td></tr>
      </tbody>;
  }
};
