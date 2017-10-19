import BasicView from "BasicView";
import MapPanel from "MapPanel";
import logger from "Logger";

export default class MapView extends BasicView{

    registerPanels(){
        this.registerPanel(MapPanel.NAME, MapPanel);
    }

    showDefaultPanel(){
        this.showPanel(MapPanel.NAME);
    }

}