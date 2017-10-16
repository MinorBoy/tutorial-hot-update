/**
 * Created by on 2017/9/25.
 */
import FluxReduceStore from "FluxReduceStore";
import LoginActionTypes from "LoginActionTypes";
import Server from "Server";

export default class LoginStore extends FluxReduceStore {

    getInitialState() {
        return Immutable.fromJS({
            selectServer: null,
            serverList: []
        });
    }

    reduce(state, action) {
        switch (action.type) {
            case LoginActionTypes.GET_SERVER_LIST:
                return this.changeToServerMap(state, action.data);
                break;
            case LoginActionTypes.SELECT_SERVER:
                let server = action.data;
                let selectServer = state.get("selectServer");
                if(server.serverId == selectServer.serverId){
                    return state;  //一样的选择id，直接返回，不刷新
                }
                return state.set("selectServer", action.data);
            default:
                return state;
        }
    }

    changeToServerMap(state, info){
        let serverList = [];
        let serverInfoList = info.split(";");
        let selectServer = null;
        serverInfoList.forEach( (infoStr) => {
            let server = Server.valueOf(infoStr);
            serverList.push(server);
            selectServer = server;
        });

        let s1 = state.set("serverList", serverList);
        return s1.set("selectServer", selectServer);
    }



}