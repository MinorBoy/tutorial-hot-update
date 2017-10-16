/**
 * Created by on 2017/9/25.
 */
import BasicPanel from "BasicPanel";
import logger from "Logger";
import ServerListPanel from "ServerListPanel";

class LoginPanel extends BasicPanel{

    initPanel(){
        this._enterBtn = this.getChildByName("enterBtn");
        this._serverTxt = this.getChildByName("serverTxt");
        this._stateTxt = this.getChildByName("stateTxt");
        this._infoImg = this.getChildByName("infoImg");
        this._accountInput =  this.getChildByName("accountInput");
        this._editBox = this._accountInput.getComponent(cc.EditBox);
    }

    registerEvents(){
        this.addTouchEventListener(this._infoImg, () => this.onShowServerListPanel());
        this.addTouchEventListener(this._enterBtn, () => this.onEnterGameBtn());
    }

    onShowServerListPanel(){
        logger.info("!!!!!!!!!onShowServerListPanel!!!!!!!!!!!!!");
        this.showPanel(ServerListPanel.NAME);
    }

    onEnterGameBtn(){
        logger.info("!!!!!!!!!onEnterGameBtn!!!!!!!!!!!!!");
        let selectServer = this.state.get("selectServer");
        this.getAction().enterGame({server : selectServer, accountName : this._editBox.string});
    }

    //新的点击按钮，点击切换模块
    onOpenLoaderModule(){
        logger.info("点击打开LoaderModule")
        this.getAction().showOtherHandler({moduleName : "LoaderModule"})
    }


    ////////////////渲染相关////////////////////////////
    render(){
        let selectServer = this.state.get("selectServer");
        let serverList = this.state.get("serverList");
        // logger.info(selectServer);
        this._renderSelectServer(selectServer);
    }

    _renderSelectServer(selectServer){
        if(selectServer == null){
            return;
        }
        let serverName = selectServer.name;
        this.setLabel(this._serverTxt, serverName);
    }

}

LoginPanel.NAME = "LoginPanel";
export default LoginPanel;