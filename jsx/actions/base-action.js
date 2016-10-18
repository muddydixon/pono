import {dispatch} from "../dispatcher";
import fetch from "isomorphic-fetch";
import Const from "../constants";

export default {
  status(res){
    if(res.status >= 300){
      // dispatch({type: Const.ERROR, error: new Error(res.message || res.statusText)});
      return null;
    }
    return res.json();
  }
};
