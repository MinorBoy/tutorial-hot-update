import BasicAction from "BasicAction";
import MainSceneActionTypes from "MainSceneActionTypes";

export default class MainSceneAction extends BasicAction{

    showOtherHandler(data){
        this.dispatch(MainSceneActionTypes.SHOW_OTHER_EVENT, data);
    }

    loadComplete(){
        this.dispatch(ToolbarActionTypes.LOAD_COMPLETE, null);
    }
}