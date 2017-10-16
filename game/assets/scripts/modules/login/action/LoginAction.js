/**
 * Created by on 2017/9/25.
 */
import BasicAction from "BasicAction";
import LoginActionTypes from "LoginActionTypes";

export default class LoginAction extends BasicAction{

    getServerList(info){  //获取到服务器列表
        this.dispatch(LoginActionTypes.GET_SERVER_LIST, info);
    }

    selectServer(server){
        this.dispatch(LoginActionTypes.SELECT_SERVER, server);
    }

    enterGame(server){
        this.dispatch(LoginActionTypes.CONNECT_SERVER, server);
    }

    showOtherHandler(data){
        this.dispatch(LoginActionTypes.SHOW_OTHER_EVENT, data)
    }
}