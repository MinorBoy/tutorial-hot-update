import BasicAction from "BasicAction";
import ChatActionTypes from "ChatActionTypes";

export default class ChatAction extends BasicAction{

    showOtherHandler(data){
        this.dispatch(ChatActionTypes.SHOW_OTHER_EVENT, data)
    }
}