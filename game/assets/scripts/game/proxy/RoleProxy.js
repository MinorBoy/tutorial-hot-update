/**
 * Created by on 2017/9/28.
 */
import BasicProxy from "BasicProxy";
import logger from "Logger";
import AppEvent from "AppEvent";

class RoleProxy extends BasicProxy {
    constructor() {
        super();

        this._serverOpenTime = 0;
        this._isInitInfo = false;

        this._actorInfo = null;
    }

    //重置数据，在切换账号的时候重置调用
    resetAttr() {
    }

    //数据代理全部初始化前调用
    beforeInitSyncData() {
    }

    initSyncData(data) {
        this._serverOpenTime = data.openServerTime;

        // TODO:播放队列重置
        //EffectQueueManager.reconnectInit()

        this._isInitInfo = true;

        this._actorInfo = data.actorInfo;
        let actorInfo = data.actorInfo;

        this.setRoleAttrInfos(actorInfo.attrInfos);


        // if (data.chargeDoubleList) {
        //     this.setChargeDoubleList(data.chargeDoubleList);
        //     this.sendNotification(AppEvent.PROXY_UPDATE_RECHARGE_INFO, {}); //推送已双倍充值的额度
        // }

        // if (data.cityBattleReward) {
        //     logger.info("城主战 小红点！~~~%d", data.cityBattleReward);
        //     let redPointProxy = this.getProxy(GameProxys.RedPoint);
        //     redPointProxy.updateCityBattleRedNum(data.cityBattleReward);
        // }

        // if (actorInfo.fameState) {
        //     this.setPrestigeState(actorInfo.fameState);
        // }
        // if (actorInfo.engryprice) {
        //     this.setEnergyNeedMoney(actorInfo.engryprice);
        // }
        // this.setCrusadeEnergyNeedMoney(actorInfo.crusadeEnergyPrice);
        // if (actorInfo.boomRefTime) {

        //     this.setBoomRemainTime(actorInfo.boomRefTime);
        // }
        // if (actorInfo.energyRefTime) {

        //     this.setEnergyRemainTime(actorInfo.energyRefTime);
        // }
        // this.setCrusadeEnergyRemainTime(actorInfo.crusadeEnergyTime);
        // if (actorInfo.tanbaoFrees) {
        //     let pubProxy = this.getProxy(GameProxys.Pub);
        //     pubProxy.setPubFreeData(actorInfo.tanbaoFrees[1], actorInfo.tanbaoFrees[2]);
        // }

        // if (rawget(actorInfo, "roleCreateTime") != null) {
        //     GameConfig.roleCreateTime = actorInfo.roleCreateTime;
        // }
        this.name = actorInfo.name;
        this._worldTileX = actorInfo.worldTileX;
        this._worldTileY = actorInfo.worldTileY;

        // this.setLegionLeaderWorldTilePos(actorInfo.legionLeaderX, actorInfo.legionLeaderY); //军团长的坐标

        this._playerId = actorInfo.playerId;    // 玩家ID
        this._iconId = actorInfo.iconId;         // 头像ID
        this._pendantId = actorInfo.pendantId;   // 挂件ID
        this._newGift = actorInfo.newGift;       // 是否领取过新手礼包：0未领取，1已领
        this._fightCount = actorInfo.fightCount; // 西域远征剩余挑战次数
        this._backCount = actorInfo.backCount;

        this._legionName = actorInfo.legionName; //军团名字
        this._legionLevel = actorInfo.legionLevel; //军团等级
        this._legionId = actorInfo.legionId;   //军团ID

        // this.setCustomHeadStatus(actorInfo.customHeadStatus);
        // this.setCustomHeadCoolTime(actorInfo.customCoolTime);

        // let atom = StringUtils.fined64ToAtom(this._legionId); //TODO 容错，使用32位就行了
        // this.setRoleAttrValue(PlayerPowerDefine.POWER_LegionId, atom.low);

        // this.sendNotification(AppEvent.PROXY_LEGION_MAINSCENE_BUILDING_UPDATE, {});

        // this.sendNotification(AppEvent.PROXY_GET_ROLE_INFO, data);

        // if (data.legionrewardinfo != null) {
        //     this.initOpenServerData(data.legionrewardinfo);
        // }

        // //TODO添加value有变化的typeid
        // let updatePowerList = {}
        // this.sendNotification(AppEvent.PROXY_UPDATE_ROLE_INFO, updatePowerList)
    }

    afterInitSyncData() {

    }

    resetCountSyncData(data) {

    }

    //===========================================公用函数===============================================

    //获取角色信息
    getActorInfo() {
        return this._actorInfo;
    }

    //设置角色属性
    setRoleAttrInfos(attrInfos) {
        this._attrInfoMap = {};
        for (let key in attrInfos) {
            let attrInfo = attrInfos[key];
            this.setRoleAttrValue(attrInfo.typeid, attrInfo.value);
        }

        this.sendNotification(AppEvent.PROXY_UPDATE_ROLE_INFO, null);
    }

    setRoleAttrValue(typeid, value) {
        this._attrInfoMap[typeid] = value;
        logger.info("=========>检测任务小红点是否需要刷新");
        // if (typeid == getRoleAttrValue ){            
        //     //如果属性值是活跃度 检测任务小红点是否需要刷新
        //     let taskProxy = this.getProxy(GameProxys.Task)
        //     taskProxy:updateRedPoint()
        // }
    }

    //============================================协议===================================================

    onTriggerNet20000Req() {
        this.syncNetReq(AppEvent.NET_M2, AppEvent.NET_M2_C20000, {})
    }
}

export default RoleProxy;