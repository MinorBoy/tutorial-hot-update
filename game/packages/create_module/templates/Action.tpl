import BasicAction from "BasicAction";
import #moduleName#ActionTypes from "#moduleName#ActionTypes";

export default class #moduleName#Action extends BasicAction{

    showOtherHandler(data){
        this.dispatch(#moduleName#ActionTypes.SHOW_OTHER_EVENT, data)
    }
}