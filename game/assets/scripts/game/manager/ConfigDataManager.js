/**
 * Created by on 2017/9/20.
 */

import ConfigName from "ConfigName";
import logger from "Logger";



class ConfigDataManager{

    constructor(){
        this._configDataMap = {};
        this._keyResultMap = {};
    }

    init(callback){
        this._loadAllConfig(callback);
    }

    //通过唯一ID获取
    get(name, id){
        let configData = this._getConfigData(name);
        return configData[id];
    }

    //通过kv组获取配置数据
    getByUnique(name, ...kv){
        if(kv.length % 2 != 0){
            throw "参数不匹配，需要k v 一组";
        }

        if(kv.length == 2){
            if(kv[0] == "ID"){
                return this.get(name, kv[1]);
            }
        }

        let key = name;
        for(let value in kv){
            key += "#" + value;
        }

        let list = this.getByList(name, ...kv);
        if(list.length == 0){
            return null;
        }
        return list[0];
    }

    getByList(name, ...kv){
        if(kv.length % 2 != 0){
            throw "参数不匹配，需要k v 一组";
        }

        let key = name;
        for(let index in kv){
            key += "#" + kv[index];
        }

        let result = this._keyResultMap[key];
        if (result != null) {
            return result;
        }

        let fieldMap = {};
        let index = 0;
        let length = kv.length;
        while (index < length){
            let k = kv[index];
            fieldMap[k] = kv[index + 1];
            index = index + 2;
        }
        result = this._getInfoFindByField(name,fieldMap);
        this._keyResultMap[key] = result;
        return result;
    }


    //通过多个key-value 找出对应的配置数据
    _getInfoFindByField(name, fieldMap){
        let configData = this._getConfigData(name);

        let result = [];
        for(let id in configData){
            let config = configData[id];
            let flag = true;
            for(let fieldKey in fieldMap){
                let fieldValue = fieldMap[fieldKey];
                if(fieldValue != config[fieldKey]){
                    flag = false;
                }
            }
            if(flag){
                result.push(config);
            }
        }
        return result;
    }

    _addConfigData(name, obj){
        this._configDataMap[name] = obj;
    }

    _getConfigData(name){
        return this._configDataMap[name];
    }

    _loadAllConfig(complete){
        let loadCount = 0;
        let completeCount = 0;
        for(let key in ConfigName){
            loadCount++;
            let name = ConfigName[key];
            this._loadConfig(name, (obj) => {
                this._addConfigData(name, obj);
                completeCount++;
                if(loadCount == completeCount){
                    complete.call(this);
                }
            })
        }
    }

    _loadConfig(name, callback){
        let url = "config/" + name;
        cc.loader.loadRes(url, (err, obj) => {
            if(err == null){
                //logger.error("!!!!!!!配置文件 : %s!!!!!!!!!!", name);
                callback.call(this, obj);
            }else {
                logger.error("!!!!!!!要加载的配置文件出错:%s!!!!!!!!!!", err);
                callback.call(this, null);
            }
        })

    }
}

let manager = new ConfigDataManager();

export default manager;