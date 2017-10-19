/**
 * Created by on 2017/9/25.
 */
import BasicPanel from "BasicPanel";
import logger from "Logger";

class BattlePanel extends BasicPanel {

    //panel的初始化，还没能调用action
    initPanel() {
        //let comBg = this.createLv1Bg("战斗")
        //comBg.setImageBg("resources/bg/battle/101/bg.webp")

        this._panelBg = this.getChildByName("panelBg");

        this._panelTop = this.getChildByName("panelTop");

    }

    //panel的节点事件注册
    registerEvents() {
    }

    //panel的初始化后，可能调用action了
    afterinitPanel() {
    }

    //打开面板
    onShowHandle() {
    }

    //关闭面板
    onHideHandle() {
    }

    ////////////////渲染相关////////////////////////////
    render() {
        this._onUpdateRound()
        this._setNameByCamp()
    }

    //更新回合
    _onUpdateRound(round) {
        let roundTxt = this.getChildByName("headPanel/roundTxt")
        roundTxt.setString(round)
    }

    //更新阵型
    _setNameByCamp(name, camp) {
        let nameTxt = this.getChildByName("headPanel/nameTxt" + camp)
        nameTxt.setString(name)
    }

    //设置先手值
    _setFirstByCamp(name, camp){
        let firstTxt = this.getChildByName("headPanel/first" + camp)
        firstTxt.setString(name)
    }

    _setMaxHpByCamp(maxHp, camp){
        this._maxHpMap[camp] = maxHp
        this._curHpMap[camp] = maxHp
    
        this.setHpByCamp(maxHp, camp)
        this.setRedHpByCamp(maxHp, camp)
    }
}

BattlePanel.NAME = "BattlePanel";
export default BattlePanel;