import dispatcher from "../dispatcher";
import {ReduceStore} from "flux/utils";
import Const from "../constants";

class RuleStore extends ReduceStore {
  getInitialState(){
    return [];
  }
  reduce(state, action){
    switch(action.type){
    case Const.RULE_CREATE:
    case Const.RULE_FETCH:
      return state.concat(action.rule);
    case Const.RULE_FETCHALL:
      // return state.concat(action.rules);
    case Const.RULE_MODIFY:
    case Const.RULE_DELETE:
    default:
      return state;
    }
  }
}

export default new RuleStore(dispatcher);
