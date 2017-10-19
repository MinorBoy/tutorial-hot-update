//module("battleCore", package.seeall)

let instance = null

class PuppetFactory{
    getInstance(){
        if( instance == null ){
            instance = PuppetFactory.new()
        }
        return instance
    }
    
    finalize(){
        for (let key in this._entMap){
            this._entMap[key].finalize()
        }
        this._entMap = {}
    }
    
    constructor(){
        this._entMap = {}
    }
    
    create(attr, rootNode){
        let ent = Puppet.new(attr, rootNode)
        
        let index = attr.index
        this._entMap[index] = ent
        return ent
        
    }
    
    getEntitysByCamp(camp){
        let list = []
        for (let key in this._entMap) {
            let ent = this._entMap[key]
            if( ent.camp == camp ){
                list.push(ent)
            }
        }
        
        return list
    }
    
    getEntitys(){
        return this._entMap
    }
    
    getEntity(index){
        return this._entMap[index]
    }
}

export default new PuppetFactory();







