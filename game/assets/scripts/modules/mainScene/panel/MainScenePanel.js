/**
 * Created by on 2017/9/25.
 */
import BasicPanel from "BasicPanel";
import logger from "Logger";
import ConfigDataManager from "ConfigDataManager";
import ConfigName from "ConfigName";
import BuildingCreatePanel from "BuildingCreatePanel";
import BuildingUpgratePanel from "BuildingUpgratePanel";

class MainScenePanel extends BasicPanel{

    initPanel(){
        this.sceneScrollView = this.getChildByName("sceneScrollView");
        this.scenePanel = this.getChildByName("sceneScrollView/view/scenePanel");
        this.sceneMap = this.getChildByName("sceneScrollView/view/scenePanel/sceneMap");
        this.buildingMap = this.getChildByName("sceneScrollView/view/scenePanel/buildingMap");
        this._buildingPanel = this.getChildByName("buildingPanel");
        this._buildingPanel.active  = false;

        this._buildingPanelMap = {};
        this._buildingInfoMap = this.testData();
    }

    // 测试数据
    testData(){

        // let data1 = ConfigDataManager.get(ConfigName.BuildResourceConfig, 1);  //object
        let data2 = ConfigDataManager._getConfigData(ConfigName.BuildOpenConfig);  //object
        // logger.info("data2>>>",data2,typeof(data2));

        return data2;
    }

    afterInitPanel(){        
        this.getAction().loadComplete()
    }
    
    registerEvents() {
    }

    _registerBuildingEvents(buildingPanel){
        this.addTouchEventListener(buildingPanel, (sender) => this.onBuildingTouch(sender));
    }

    // 点击建筑
    onBuildingTouch(sender){
        let buildingInfo = sender.target.buildingInfo;
        let buildingType = buildingInfo.type;
        let index = buildingInfo.index;
        logger.info("点击建筑~~~~~",index,buildingType);

        this.getAction().onBuildingTouch(buildingInfo);

        this.onBuildingCreatePanel();
    }


    
    // 打开创建建筑面板
    onBuildingCreatePanel() {
        logger.info("!!!!!!!!!BuildingCreatePanel!!!!!!!!!!!!!");
        this.showPanel(BuildingCreatePanel.NAME);
    }

    // 初始化建筑
    initSceneBuilding(){
        // let info = ConfigDataManager.getInfoFindByTwoKey(ConfigData.BuildOpenConfig, "ID", buildingIndex, "type", buildingType);

    }

    // 更新建筑
    updateBuildingPanel(){

    }

    ////////////////渲染相关////////////////////////////
    render(){
        
        let infoMap = this._buildingInfoMap;
        for (var key in infoMap) {
            let buildingInfo = infoMap[key];
            logger.info(buildingInfo);

            buildingInfo.index = buildingInfo.ID;
            let buildKey = buildingInfo.index + '_' + buildingInfo.type;
            let buildingPanel = this.buildingMap.getChildByName("building_" + buildingInfo.type + "_" + buildingInfo.index);
            if (buildingPanel) {
                buildingPanel.buildingInfo = buildingInfo;
                let newBuilidngPanel = this._buildingPanelMap[buildKey];
                if (newBuilidngPanel == null) {                
                    newBuilidngPanel = cc.instantiate(this._buildingPanel);
                    this._buildingPanelMap[buildKey] = newBuilidngPanel;
                    
                    buildingPanel.addChild(newBuilidngPanel);
                    // this._registerBuildingEvents(buildingPanel);
                }
                this._renderBuildingPanel(buildingPanel, buildingInfo);
                
                
            } else {
                logger.info("建筑节点不存在：", buildKey);
            }
        }

    }

    _renderBuildingPanel(buildingPanel, buildingInfo){
        logger.info("渲染建筑：", buildingInfo.index, buildingInfo.type);
        buildingPanel.active  = true;

        let childPanel = buildingPanel.getChildByName("buildingPanel");
        childPanel.active = true;
        childPanel.buildingInfo = buildingInfo;
        this._registerBuildingEvents(childPanel);

        let buildingIcon = childPanel.getChildByName("buildingIcon");
        let name = childPanel.getChildByName("nameBg/name");

        // 加载 SpriteFrame
        let url = "/images/mainScene/building_"+buildingInfo.type;
        logger.info("建筑图片URL：",url);

        url = "resources/images/mainScene/building_" + buildingInfo.type + ".png";
        let realUrl = cc.url.raw(url);
        let texture = cc.textureCache.addImage(realUrl);
        buildingIcon.getComponent(cc.Sprite).spriteFrame.setTexture(texture);

    }

}

MainScenePanel.NAME = "MainScenePanel";
export default MainScenePanel;

