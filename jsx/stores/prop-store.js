import dispatcher from "../dispatcher";
import {ReduceStore} from "flux/utils";
import Const from "../constants";

class PropStore extends ReduceStore {
  getInitialState(){
    return [];
  }
  reduce(state, action){
    switch(action.type){
    case Const.PROP_CREATE:
    case Const.PROP_FETCH:
      return state.concat(action.prop);
    case Const.PROP_FETCHALL:
      return state.concat(action.props);
    case Const.PROP_MODIFY:
    case Const.PROP_DELETE:
    default:
      return state;
    }
  }
}

export default new PropStore(dispatcher);
