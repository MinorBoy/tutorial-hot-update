/**
 * Created by on 2017/10/14.
 */

import BasicModule from "BasicModule";
import logger from "Logger";

import MainSceneView from "MainSceneView";
import MainSceneStore from "MainSceneStore";
import MainSceneAction from "MainSceneAction";
import MainSceneActionTypes from "MainSceneActionTypes";

class MainSceneModule extends BasicModule{
    constructor(dispatcher){
        super(dispatcher);
        this._view = null;
    }

    finalize(){
        super.finalize();
    }

    initModule(){
        super.initModule();
        //设置分发监听绑定
        let dispatch = this.getDispatcher();
        let store = new MainSceneStore(dispatch);
        let action = new MainSceneAction(dispatch);
        this.setAction(action);

        //界面显示
        this._view = new MainSceneView(this, store, action);
        this._view.setModuleName(MainSceneModule.NAME);
        this._view.showDefaultPanel();

    }

    panelActionHandler(type, data) {
        switch(type){
            case MainSceneActionTypes.LOAD_COMPLETE:
            break;
        }
    }

    gameActionHandler(event, data){

    }

}
MainSceneModule.NAME = "MainSceneModule";

export default MainSceneModule;
