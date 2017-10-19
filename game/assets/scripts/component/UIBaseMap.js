/**
 * Created by on 2017/10/17.
 */

import BasicComponent from "BasicComponent";
import logger from "Logger";

const {ccclass, property} = cc._decorator;
@ccclass
class UIBaseMap extends BasicComponent{

    @property
    width = 0;
    @property
    height = 0;

    constructor(){
        super();
        logger.info("UIBaseMap初始化");
    }

    initComponent(){
        super.initComponent();
        this.state = {width : this.width, height : this.height};
    }


}

export default UIBaseMap;