/**
 * Created by on 2017/9/27.
 */

import BasicProxy from "BasicProxy";

class LegionProxy extends BasicProxy{

    constructor(){
        super();

        this._myLegionInfo = {};
    }

    updateMyLegionInfo(){
        this._myLegionInfo = {};
        this.sendNotification("update_my_legion_info", this._myLegionInfo);
    }

    getMyLegionInfo(){
        return this._myLegionInfo;
    }

}

export default LegionProxy;