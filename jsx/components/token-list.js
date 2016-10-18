import React, {Component} from "react";

import Token from "./token";

export default class TokenList extends Component {
  render(){
    const {tokens} = this.props.data;
    return <div className="container">
      <table className="table">
        <thead>
          <tr><th>Name</th><th>Token</th><th>Rule</th><th>Whitelist</th><th /></tr>
        </thead>
        <tbody>
          {tokens.map(token=> <Token key={token.id} token={token} />)}
        </tbody>
      </table>
    </div>;
  }
};
