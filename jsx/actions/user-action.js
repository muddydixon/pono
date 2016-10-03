import {dispatch} from "../dispatcher";
import fetch from "isomorphic-fetch";
import BaseAction from "./base-action";
import Const from "../constants";

export default {
  signup(user){
    if(user.password !== user.confirm) return Promise.reject(new Error("password unmatched"));
    return fetch(`${Const.baseUrl}/users/signup`, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    }).then(BaseAction.status).then((user)=>{
      dispatch({type: "USER_SIGNUP", user});
      return user;
    }).catch((err)=>{
      dispatch({type: "ERROR", err});
    });
  },
  signin(user){
    return fetch(`${Const.baseUrl}/users/signin`, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    }).then(BaseAction.status).then((user)=>{
      dispatch({type: "USER_SIGNIN", user});
      return user;
    }).catch((err)=>{
      dispatch({type: "ERROR", err});
    });
  },
  signout(){
    return fetch(`${Const.baseUrl}/users/signout`, {
      method: "GET",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(BaseAction.status).then(()=>{
      dispatch({type: "USER_SIGNOUT"});
      return ;
    }).catch((err)=>{
      dispatch({type: "ERROR", err});
    });
  },
  fetchCurrentUser(){
    return fetch(`${Const.baseUrl}/users/current`, {
      method: "GET",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(BaseAction.status).then((user)=>{
      dispatch({type: "USER_CURRENT", user});
      return user;
    }).catch((err)=>{
      dispatch({type: "ERROR", err});
    });
  },
};
