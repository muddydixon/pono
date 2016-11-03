import {dispatch} from "../dispatcher";
import fetch from "isomorphic-fetch";
import BaseAction from "./base-action";
import Const from "../constants";

export default {
  create(token){
    return fetch(`${Const.baseUrl}/tokens`, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(token)
    }).then(BaseAction.status).then((token)=>{
      dispatch({type: Const.TOKEN_CREATE, token});
      return token;
    });
  },
  fetchAll(opts){
    return fetch(`${Const.baseUrl}/tokens`, {
      method: "GET",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(BaseAction.status).then((tokens)=>{
      dispatch({type: Const.TOKEN_FETCHALL, tokens});
      return tokens;
    });
  },
  delete(token){
    return fetch(`${Const.baseUrl}/tokens/${token.name}`, {
      method: "DELETE",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(BaseAction.status).then(()=>{
      dispatch({type: Const.TOKEN_DELETE, token});
      return token;
    });
  }
};
