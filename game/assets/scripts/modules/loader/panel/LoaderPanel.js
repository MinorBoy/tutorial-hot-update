/**
 * Created by on 2017/10/13.
 */
import BasicPanel from "BasicPanel";
import logger from "Logger";

class LoaderPanel extends BasicPanel{
    initPanel(){

        this._presentTxt  = this.getChildByName("presentTxt");
        this._versionTxt  = this.getChildByName("versionTxt");
        this._percentTxt  = this.getChildByName("percentTxt");

       
    }

    onShow(){
        super.onShow()

        //loader面板完成，开始预加载
        this.getAction().loaderStart()
    }

    registerEvents(){

    }

    //渲染相关
    render(){
        let curProgress = this.state.get("curProgress");//获取state

        this._renderProgress(curProgress);
    }

    //渲染进度条，动作gctodo
    _renderProgress(curProgress){
        this.setLabel(this._percentTxt, curProgress + "%")
    }


}

LoaderPanel.NAME = "LoaderPanel";
export default LoaderPanel;