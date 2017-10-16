/**
 * Created by on 2017/9/19.
 */

class TimeUtils{

    //获取时间戳 单位：秒
    getStampTime(){
        return Math.floor((new Date()).valueOf() / 1000);
    }
}

export default new TimeUtils();