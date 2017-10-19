/**
 * Created by on 2017/9/25.
 */
class StringUtils {
    
    //第一个参数是要处理的字符串，后面是要替换的字符串列表
    //例子: StringUtils.format("name:{1}, age:{2}", "xx", 18)   返回   "name:xx, age:18"
    //例子: StringUtils.format("name:{1}，age:{2}, 昵称:{1}", "xx", 18)   返回   "name:xx, age:18, 昵称:xx"
    format(/* str, [str...]*/) {
        if (arguments.length < 1) {
            return;
        }
        let str = arguments[0]
        for (let i = 1; i < arguments.length; i++) {
            if (typeof arguments[i] == "string") {                
                let reg = new RegExp("({)" + i + "(})", "g");
                str = str.replace(reg, arguments[i]);
            }
            else {
                logger.warn("=====>第%s个参数不是字符串", i)
            }
        }
        return str
    }

    //第一个字母大写
    firstLowerCase(str) {
        let [first, ...rest] = str;
        return first.toLowerCase() + rest.join('');
    }


    //通过属性ID，来格式化输入的数字
    formatNumber(num){
        if(num == null){
            return ""
        }
        let isMinus = false
        num = parseInt(num)
        if(num < 0){
            isMinus = true
            num = 0 - num
        }
        
        let divider = 1
        let unit = ""
        
        if(num > 999999999){
            divider = 1000000000
            unit = "G"
        }else if(num > 999999 ){
            divider = 1000000
            unit = "M"
        }else if(num > 999 ){
            divider = 1000
            unit = "K"
        }
        
        let str = ""
        let value = num / divider
        if(divider > 1 ){
            // str = string.format("%.1f%s",value, unit)
            str = value.toFixed(1).toString() + unit
        }else{
            str = Math.floor(value) + ""
        }
        if(isMinus == true ){
            str = "-"+str
        }
        return str
    }

}

export default new StringUtils();