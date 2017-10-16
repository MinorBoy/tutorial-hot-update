
import GameBaseState from "GameBaseState";
import NetChannel from "NetChannel";
import ProtoManager from "ProtoManager";
import ConfigDataManager from "ConfigDataManager";
import ConfigName from "ConfigName";
import logger from "Logger";
import GameLayerName from "GameLayerName";
import BasicPanel from "BasicPanel";
import LoginModule from "LoginModule";
import AppEvent from "AppEvent";
import GameModule from "GameModule";
import GameModuleMap from "GameModuleMap";
import GameConfig from "GameConfig";
import PhoneInfo from "PhoneInfo";
import GameProxy from "GameProxy";

class SceneState extends GameBaseState {
    constructor() {
        super();

        //加载总数
        this._totalDownLoadCount = 0;
        //当前加载数
        this._curDownLoadCount = 0;
        //资源加载是否已经OK
        this._isPreLoadResOk = false;
        //预加模块是否已经OK
        this._isPreLoadModuleOk = false;
        //请求的数据是否已经Ok
        this._isServerDataOk = false;
    }

    registerModules() {
        super.registerModules();

        let sceneModuleNameList = GameModuleMap.getSceneModuleNameList();
        for (let index in sceneModuleNameList) {
            let moduleName = sceneModuleNameList[index];
            let module = GameModuleMap.getModule(moduleName);
            this.registerModuleClass(moduleName, module);
        }
    }

    //scene加载完成
    onLoad() {
        super.onLoad();

        //直接网关请求 登录网关成功了
        this.onLoginGateResp({ rs: 0 });

        //因为资源加载异步，必须先将加载模块加载完再加载其它资源
        this.openModuleLoading();
    }

    //预加载资源
    onPreLoadRes() {
        ++this._totalDownLoadCount;

        this.updateLoadingModuleProgress()
    }

    //预加载模块prefab
    onPreLoadModule() {

        let callback = (this.updateLoadingModuleProgress).bind(this);

        let ary = [
            GameModule.RoleInfosModule,
            GameModule.ToolbarModule,
            GameModule.MainSceneModule,
            GameModule.ChatModule,
        ]

        for (let index in ary) {
            let moduleName = ary[index]
            logger.info("=======>预加载模块:%s", moduleName)
            ++this._totalDownLoadCount;
            this.sendNotification(AppEvent.MODULE_OPEN_EVENT, { moduleName: moduleName, callback: callback });
        }
    }


    //打开加载模块
    openModuleLoading() {
        this.sendNotification(AppEvent.MODULE_OPEN_EVENT, { moduleName: GameModule.LoaderModule });
    }


    //更新模块进度
    updateLoadingModuleProgress() {
        ++this._curDownLoadCount;

        let progress = this._curDownLoadCount / this._totalDownLoadCount * 100;

        this.sendNotification(AppEvent.LOADER_UPDATE_PROGRESS, { moduleName: GameModule.LoginModule, loadProgress: progress });

        //TODO:等loadingModule完成修改下面代码
        //等loading回调打开登录模块
        if (this._curDownLoadCount == this._totalDownLoadCount) {
            this._isPreLoadResOk = true;
            this.enterScene();
        }
    }

    enterScene() {
        if (!this._isPreLoadResOk) {
            return;
        }

        if (!this._isServerDataOk) {
            //TODO:协议还没处理好，先通过
            //return;
        }

        if (!this._isPreLoadModuleOk) {
            return;
        }


        logger.info("===============>enter Scene")

        this.sendNotification(AppEvent.MODULE_OPEN_EVENT, { moduleName: GameModule.MainSceneModule });
    }


    //打开登录模块
    openModuleLogin() {
        // let loginModuleName = GameModule.LoginModule;
        // logger.info(loginModuleName);
        // let loginModule = GameModuleMap.getModule(loginModuleName);
        //
        // this.registerModuleClass(GameModuleMap.GameModule.LoginModule, loginModule);
        //
        // this.sendNotification(AppEvent.MODULE_OPEN_EVENT, { moduleName: loginModuleName });
    }

    gameActionHandler(event, data) {
        super.gameActionHandler(event, data)

        switch (event) {
            case AppEvent.LOADER_START:
                this.onPreLoadRes();
                this.onPreLoadModule();
                break;
            case AppEvent.PROXY_SYSTEM_LOGINGATE:
                this.onLoginGateResp(data);
                break;
            case AppEvent.PROXY_SYSTEM_LOGIN:
                this.onLoginResp(data);
                break;
        }
    }

    //网关登录      
    onLoginGateResp(data) {
        // let serverTime = GameConfig.serverTime
        // let now = new Date()
        // if (now - serverTime >= 30 * 60){
        //     //重连成功后，如果大于半小时的时间，则直接重登游戏
        //     this.onGameLogoutHandler()  
        //     return
        // }

        this.sceneReLogin()
    }

    //登出游戏
    onGameLogoutHandler(data) {
    }

    //场景中重新登录
    sceneReLogin() {
        // this._lastHeartbeatTime = new Date()
        // GameConfig.lastHeartbeatTime = new Date()
        // GameConfig.isInitRoleInfo = false

        // let roleProxy = this.getProxy(GameProxy.Role)
        // let isInitInfo = roleProxy.isInitInfo()
        // if (isInitInfo == true ){ 
        //     //数据初始化完毕，才证明是重登的
        //     self._reLogin = true
        // }

        //请求登录
        let areId = GameConfig.serverId
        //let loginData = PhoneInfo.getLoginData(GameConfig.accountName, areId)
        let loginData = { account: GameConfig.accountName, areId: areId }
        let systemProxy = this.getProxy(GameProxy.System)
        systemProxy.onTriggerNet10000Req(loginData)
    }

    //被动退出    
    onOtherLoginResp() {
    }

    //心跳
    onHeartbeatResp(data) {
    }

    //登录
    onLoginResp(data) {
        let rs = data.rs
        if (rs == 0 || rs == 5) {
            // if (rs == 5) {
            //     GameConfig.isNewPlayer = true;
            // }
            // GameConfig.isLoginSucess = true;
        }
        else if (rs == -1) {
            // //没有角色
            // GameConfig.isLoginSucess = true;
        }

        if (rs == 0 || rs == 5) {
            //登录成功
            GameConfig.isLoginSucess = true;


            GameConfig.serverTime = data.serverTime;

            this.roleInfoReq() //角色信息请求

            // let isfirstLogin = LocalDBManager.getValueForKey("firstLogin", nil, "");
            // if (isfirstLogin == nil) {
            //     this.gameEventLog(EventConfig.ReqRoleInfo);
            // }

            //KKKLog.accountLoginLog();
        }
        else if (rs == -2) {//被封号了！
            // let parent = this.getLayer(GameLayer.popLayer);
            // let reason = rawget(data, "reason");
            // if (reason == nil || reason == "") {
            //     reason = TextWords.getTextWord(14);
            // }
            // let box = this.showMessageBox(reason, nil, nil, nil, nil, parent);
            // box.setLocalZOrder(12345);
            // this.sendNotification(AppEvent.NET_EVENT, AppEvent.NET_AUTO_CLOSE_CONNECT, {}); //断开连接
        }
        else if (rs == -3) {//IP被封了
            // let parent = this.getLayer(GameLayer.popLayer);
            // let box = this.showMessageBox(TextWords.getTextWord(19), nil, nil, nil, nil, parent);
            // box.setLocalZOrder(12345);
            // this.sendNotification(AppEvent.NET_EVENT, AppEvent.NET_AUTO_CLOSE_CONNECT, {});  //断开连接
        }
        else {
            //登录失败
            // logger.error("===重登登录失败！！！=====");
            // let parent = this.getLayer(GameLayer.popLayer);
            // let box = this.showMessageBox(TextWords.getTextWord(15), nil, nil, nil, nil, parent);
            // box.setLocalZOrder(12345);
            // this.sendNotification(AppEvent.NET_EVENT, AppEvent.NET_AUTO_CLOSE_CONNECT, {});  //断开连接
        }
    }

    //充值成功
    onChargeSucessResp(data) {

    }

    //请求角色信息
    roleInfoReq(){        
        this.sendNotification(AppEvent.NET_M2, AppEvent.NET_M2_C20000, {})

        let roleProxy = this.getProxy(GameProxy.Role)
        roleProxy.onTriggerNet20000Req()

    }
    
}


export default SceneState;