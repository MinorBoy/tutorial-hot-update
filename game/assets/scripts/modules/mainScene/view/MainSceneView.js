import BasicView from "BasicView";
import MainScenePanel from "MainScenePanel";
import logger from "Logger";

export default class MainSceneView extends BasicView{

    registerPanels(){
        this.registerPanel(MainScenePanel.NAME, MainScenePanel);
    }

    showDefaultPanel(){
        this.showPanel(MainScenePanel.NAME);
    }

}