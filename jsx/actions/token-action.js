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
      dispatch({type: "TOKEN_CREATE", token});
      return token;
    }).catch((err)=>{
      dispatch({type: "ERROR", err});
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
      dispatch({type: "TOKEN_FETCHALL", tokens});
      return tokens;
    }).catch((err)=>{
      dispatch({type: "ERROR", err});
    });
  },
};
