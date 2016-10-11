import {dispatch} from "../dispatcher";
import fetch from "isomorphic-fetch";
import Const from "../constants";

export default {
  status(res){
    if(res.status >= 300) throw new Error(res.message || res.statusText);
    return res.json();
  },
  fetch(){
    return fetch(`${Const.baseUrl}/config`, {
      method: "GET",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      }
    }).then((res)=> res.json()).then((config)=>{
      dispatch({type: "CONFIG_FETCH", config});
      return config;
    }).catch((err)=>{
      dispatch({type: "ERROR", err});
    });
  }
};
