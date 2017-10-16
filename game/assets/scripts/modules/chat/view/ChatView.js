import BasicView from "BasicView";
import ChatPanel from "ChatPanel";
import logger from "Logger";

export default class ChatView extends BasicView{

    registerPanels(){
        this.registerPanel(ChatPanel.NAME, ChatPanel);
    }

    showDefaultPanel(){
        this.showPanel(ChatPanel.NAME);
    }

}