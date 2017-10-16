/**
 * 派发出行为出来
 * Created by on 2017/9/25.
 */
export default class BasicAction{
    constructor(dispatch){
        this._dispatch = dispatch;
    }

    dispatch(type, data){
        this._dispatch.dispatch({type : type, data : data});
    }
}