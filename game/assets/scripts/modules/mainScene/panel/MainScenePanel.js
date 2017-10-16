/**
 * Created by on 2017/9/25.
 */
import BasicPanel from "BasicPanel";
import logger from "Logger";

class MainScenePanel extends BasicPanel{

    initPanel(){
    }

    afterInitPanel(){        
        this.getAction().loadComplete()
    }
    
    registerEvents(){
    }

    

    ////////////////渲染相关////////////////////////////
    render(){

    }

}

MainScenePanel.NAME = "MainScenePanel";
export default MainScenePanel;