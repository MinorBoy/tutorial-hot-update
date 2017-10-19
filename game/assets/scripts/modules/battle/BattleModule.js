/**
 * Created by on 2017/10/14.
 */

import BasicModule from "BasicModule";
import logger from "Logger";

import BattleView from "BattleView";
import BattleStore from "BattleStore";
import BattleAction from "BattleAction";
import BattleActionTypes from "BattleActionTypes";

import AppEvent from "AppEvent";
import GameProxy from "GameProxy";
import GameModule from "GameModule"; 
import GameConfig from "GameConfig";

class BattleModule extends BasicModule{
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
        let store = new BattleStore(dispatch);
        let action = new BattleAction(dispatch);
        this.setAction(action);

        //界面显示
        this._view = new BattleView(this, store, action);
        this._view.setModuleName(BattleModule.NAME);
        this._view.showDefaultPanel();

    }

    panelActionHandler(type, data) {

    }

    gameActionHandler(event, data){

    }

}
BattleModule.NAME = "BattleModule";

export default BattleModule;
