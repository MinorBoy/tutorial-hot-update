/**
 * Created by on 2017/10/14.
 */

import BasicModule from "BasicModule";
import logger from "Logger";

import ChatView from "ChatView";
import ChatStore from "ChatStore";
import ChatAction from "ChatAction";
import ChatActionTypes from "ChatActionTypes";

class ChatModule extends BasicModule{
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
        let store = new ChatStore(dispatch);
        let action = new ChatAction(dispatch);
        this.setAction(action);

        //界面显示
        this._view = new ChatView(this, store, action);
        this._view.setModuleName(ChatModule.NAME);
        this._view.showDefaultPanel();

    }

    panelActionHandler(type, data) {

    }

    gameActionHandler(event, data){

    }

}
ChatModule.NAME = "ChatModule";

export default ChatModule;
