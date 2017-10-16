import FluxReduceStore from "FluxReduceStore";
import ChatActionTypes from "ChatActionTypes";

export default class ChatStore extends FluxReduceStore {

    getInitialState() {
        return Immutable.fromJS({
        });
    }

    reduce(state, action) {
        switch (action.type) {
            default:
                return state;
        }
    }
}