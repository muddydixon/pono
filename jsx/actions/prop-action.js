import {dispatch} from "../dispatcher";
import fetch from "isomorphic-fetch";
import BaseAction from "./base-action";
import Const from "../constants";

export default {
  create(prop){
    return fetch(`${Const.baseUrl}/props`, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(prop)
    }).then(BaseAction.status).then((prop)=>{
      dispatch({type: "PROP_CREATE", prop});
      return prop;
    }).catch((err)=>{
      dispatch({type: "ERROR", err});
    });
  },
  fetchAll(opts){
    return fetch(`${Const.baseUrl}/props`, {
      method: "GET",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(BaseAction.status).then((props)=>{
      dispatch({type: "PROP_FETCHALL", props});
      return props;
    }).catch((err)=>{
      dispatch({type: "ERROR", err});
    });
  },
};
