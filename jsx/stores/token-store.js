import dispatcher from "../dispatcher";
import {ReduceStore} from "flux/utils";
import Const from "../constants";

class TokenStore extends ReduceStore {
  getInitialState(){
    return [];
  }
  reduce(state, action){
    switch(action.type){
    case Const.TOKEN_CREATE:
    case Const.TOKEN_FETCH:
      return state.concat(action.token);
    case Const.TOKEN_FETCHALL:
      return action.tokens;
    case Const.TOKEN_MODIFY:
    case Const.TOKEN_DELETE:
      return state.filter(token => token.id !== action.token.id);
    default:
      return state;
    }
  }
}

export default new TokenStore(dispatcher);
