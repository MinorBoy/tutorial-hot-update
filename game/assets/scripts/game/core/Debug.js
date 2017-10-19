import GameProxy from "GameProxy";
import ChatProxy from "ChatProxy";


class Debug {
    create(game) {
        this._game = game

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    getProxy(proxyName) {
        return this._game.getProxy(proxyName);
    }

    onKeyDown(event) {
        switch (event.keyCode) {
            case cc.KEY.f1:
                break;
        }
    }

    onKeyUp(event) {
        switch (event.keyCode) {
            case cc.KEY.f1:
                //this.onZuoBi_GetSolider()
                this.onAtkBanditDungeon()
                break;
        }
    }

    onZuoBi_GetSolider() {
        let chatProxy = this.getProxy(GameProxy.ChatProxy);
        let data = {};
        data.type = 1;
        data.contextType = 1;
        data.context = "zb as 10";
        chatProxy.onTriggerNet140000Req(data)
    }

    onAtkBanditDungeon(){


    }
}

export default new Debug();
