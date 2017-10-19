import FluxReduceStore from "FluxReduceStore";
import BattleActionTypes from "BattleActionTypes";

export default class BattleStore extends FluxReduceStore {

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