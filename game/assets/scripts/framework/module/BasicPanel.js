/**
 * 基础面板
 * Created by on 2017/9/19.
 */


import BasicComponent from "BasicComponent";
import logger from "Logger";
import AllComponent from "AllComponent";

const {ccclass, property} = cc._decorator;
@ccclass
class BasicPanel extends BasicComponent{

    constructor(){
        super();
        this._view = null;

        this._uiSecLvBg = null;
    }

    finalize(){

    }

    setView(view){
        this._view = view;
    }

    getAction(){
        return this._view.getAction();
    }

    getInitialState(){
        return this.getStoreState();
    }

    getStoreState(){
        if(this._view == null){
            return null;
        }
        return this._view.getState();
    }

    initComponent(){

    }

    initPanel(){

    }

    registerEvents(){

    }

    onShow(){
        let storeState = this.getStoreState();
        let state = this.getState();
        if(storeState === state){
            return;
        }
        this.setState(storeState); //用目前最新的数据刷新
    }

    showPanel(name){
        this._view.showPanel(name);
    }

    hidePanel(name){
        this._view.hidePanel(name);
    }

    setState(state){
        if(!this.node.active){
            logger.debug("!!!!!面板节点未激活，不更新!!!:%s!!!!!", this.constructor.name);
            return;
        }
        super.setState(state);
    }

    //确认框
    showConfirm(content, okCallback, canCelcallback,okBtnName, canelBtnName){
        this._view.showConfirm(content, okCallback, canCelcallback, okBtnName, canelBtnName)
    }

    //消息
    showMessage(content){
        self._view.showMessage(content)
    }

      //
      initUI(titleName,PanelLevel,width,height,helpCallback,closeCallback)
      {
          if (PanelLevel == 2 )
          {
              this._uiSecLvBg = AllComponent.getInstantiate(AllComponent.uiSecLvPanel);
              let component =this._uiSecLvBg.getComponent("UISecLvPanel")
             
              this.node.addChild(this._uiSecLvBg);
              this._uiSecLvBg.zIndex = -1
              //通用控件 要在 addChild 方法之后 
              component.registerEvents()
              component.addPanel(titleName,width,height,this.node)
              component.setCloseBtn( closeCallback )
              if(helpCallback != null) 
              {
                  component.setHelpBtn(helpCallback)   
              }
              else
              {
                  component.hideHelpBtn()
              }
  
  
              
          }      
      }
}
  



export default BasicPanel;

