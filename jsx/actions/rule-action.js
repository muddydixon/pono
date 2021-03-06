import {dispatch} from "../dispatcher";
import fetch from "isomorphic-fetch";
import BaseAction from "./base-action";
import Const from "../constants";

export default {
  create(rule){
    return fetch(`${Const.baseUrl}/rules`, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(rule)
    }).then(BaseAction.status).then((rule)=>{
      dispatch({type: Const.RULE_CREATE, rule});
      return rule;
    });
  },
  fetchAll(opts){
    return fetch(`${Const.baseUrl}/rules`, {
      method: "GET",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(BaseAction.status).then((rules)=>{
      dispatch({type: Const.RULE_FETCHALL, rules});
      return rules;
    });
  },
  delete(rule){
    return fetch(`${Const.baseUrl}/rules/${rule.name}`, {
      method: "DELETE",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(BaseAction.status).then(()=>{
      dispatch({type: Const.RULE_DELETE, rule});
      return rule;
    });
  },
  flight(rule){
  }
};
