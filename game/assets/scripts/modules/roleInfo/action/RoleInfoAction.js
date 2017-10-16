import BasicAction from "BasicAction";
import RoleInfoActionTypes from "RoleInfoActionTypes";

export default class RoleInfoAction extends BasicAction{

    showOtherHandler(data){
        this.dispatch(RoleInfoActionTypes.SHOW_OTHER_EVENT, data)
    }

    loadComplete(){
        this.dispatch(ToolbarActionTypes.LOAD_COMPLETE, null)
    }
}