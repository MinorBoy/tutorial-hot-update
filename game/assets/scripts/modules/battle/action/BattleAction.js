import BasicAction from "BasicAction";
import BattleActionTypes from "BattleActionTypes";

export default class BattleAction extends BasicAction{

    showOtherHandler(data){
        this.dispatch(BattleActionTypes.SHOW_OTHER_EVENT, data)
    }
}