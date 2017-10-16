import FluxReduceStore from "FluxReduceStore";
import RoleInfoActionTypes from "RoleInfoActionTypes";

export default class RoleInfoStore extends FluxReduceStore {

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