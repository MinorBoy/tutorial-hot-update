/**
 * 基础视图
 */
// import EventDispatcher from "EventDispatcher"
import FluxContainer from "FluxContainer";
import StringUtils from "StringUtils";
import logger from "Logger";

class BasicView {
    constructor(module, store, action) {
        this._module = module;
        this._parent = module.getModuleNode();
        this._dispatch = module.getDispatcher();
        this._store = store;
        this._action = action;

        this._moduleName = "";

        this._panelMap = {};
        this._panelClassMap = {};
        this.registerPanels();

        this._showPanelMap = {};
        this._showingPanelMap = {};

        this._updateDt = 1000; //毫秒
        this._curCountTime = 0;

        this.initView();
    }

    finalize() {

    }

    initView() {

    }

    getState(){
        return this._store.getState();
    }

    getAction(){
        return this._action;
    }

    setModuleName(name) {
        this._moduleName = name;
    }

    registerPanels() {

    }

    registerPanel(name, panelClass) {
        this._panelClassMap[name] = panelClass;
    }

    //Panel是否注册过
    isPanelRegister(name) {
        return this._panelClassMap[name] != null;
    }

    showPanel(name) {
        let isShowing = this._showingPanelMap[name];
        if(isShowing){
            logger.warn("!!!!!要打开的面板正在打开中!:%s!!!!", name);
            return;
        }
        if (this._panelMap[name] == null && this.isPanelRegister(name) == true) {
            // this._panelMap[name] = new this._panelClassMap[name](this, name);
            //加载对应的Panel UI
            this.createPanel(name);
            return;
        }

        let component = this._panelMap[name];
        if(component != null){
            let panelNode = component.node;
            panelNode.active = true;
            component.onShow();
        }
        // return this._panelMap[name];
    }

    hidePanel(name) {
        let component = this._panelMap[name];
        let panelNode = component.node;
        panelNode.active = false;
    }

    createPanel(name) {
        this._showingPanelMap[name] = true;
        let moduleName = StringUtils.firstLowerCase(this._moduleName.replace("Module", ""));
        let url = "ui/panel/" + moduleName + "/" + name;
        cc.loader.loadRes(url, (err, prefab) => {
            this._showingPanelMap[name] = null;
            let newNode = cc.instantiate(prefab);
            if (newNode === null) {
                logger.error(err);
                return;
            }
            newNode.x = 0;
            newNode.y = 0;
            this._parent.addChild(newNode);

            let panelClass = this._panelClassMap[name];
            

            // let storeModuleName = name.replace("Panel", "Store");
            // let storeClass = require(storeModuleName);
            let component = newNode.addComponent(panelClass);
            component.setView(this);
            component.initPanel();
            component.registerEvents();
            component.onShow();
            this._panelMap[name] = component;
            FluxContainer.createFunctional(component, this._store);
        });
    }

    getParent() {
        return this._parent;
    }

    //确认框
    showConfirm(content, okCallback, canCelcallback,okBtnName, canelBtnName){
        this._module.showConfirm(content, okCallback, canCelcallback, okBtnName, canelBtnName)
    }

    //消息
    showMessage(content){
        self._module.showMessage(content)
    }
}

export default BasicView;