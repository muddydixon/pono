import dispatcher from "../dispatcher";
import {ReduceStore} from "flux/utils";
import Const from "../constants";

class RuleStore extends ReduceStore {
  getInitialState(){
    return [];
  }
  reduce(state, action){
    switch(action.type){
    case Const.PROP_CREATE:
      return state.map(rule =>{
        if(rule.id !== action.prop.rule_id) return rule;
        rule.props.push(action.prop);
        return rule;
      });
    case Const.RULE_CREATE:
    case Const.RULE_FETCH:
      return state.concat(action.rule);
    case Const.RULE_FETCHALL:
      return action.rules;
    case Const.RULE_MODIFY:
    case Const.RULE_DELETE:
      return state.filter(rule => rule.id !== action.rule.id);
    default:
      return state;
    }
  }
}

export default new RuleStore(dispatcher);
