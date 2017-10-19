class UIUtils {
    //创建精灵
    createSprite(name, url) {
        let node = new cc.Node(name);
        this.updateSprite(node, url);
        return node;
    }

    //更新精灵
    updateSprite(node, url){     
        let sprite = node.getComponent(cc.Sprite);   
        if (sprite == null){
            sprite = node.addComponent(cc.Sprite);
        }
        
        if(sprite.spriteFrame && sprite.spriteFrame.rawUrl == cc.url.raw(url)){
            //相同的图片
            return;
        }
        //url = "resources/images/common9Scale/S9Black.png"
        //url = "resources/bg/battle/101/bg.webp"
        logger.info("=======下面看怎么改，没法更改图片========")
        cc.loader.loadRes(cc.url.raw(url), cc.SpriteFrame, function (err, spriteFrame) {  
            sprite.spriteFrame = spriteFrame;
            node.parent = self.node
        });
    }

    //创建按钮
    createButton(){
        logger.info("后面再补")
        
    }

}

export default new UIUtils();