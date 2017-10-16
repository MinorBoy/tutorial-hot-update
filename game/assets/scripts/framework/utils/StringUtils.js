/**
 * Created by on 2017/9/25.
 */
class StringUtils{

    firstLowerCase(str){
        let [first, ...rest] = str;
        return first.toLowerCase() + rest.join('');
    }
}

export default new StringUtils();