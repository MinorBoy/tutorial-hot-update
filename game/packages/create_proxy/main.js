'use strict';

module.exports = {
  load() {
    // execute when package loaded
  },

  unload() {
    // execute when package unloaded
  },

  createProxyFile(proxyName, tplName) {

    let fileUrl = 'db://assets/scripts/game/proxy/' + proxyName + "Proxy.js";
    let isExists = Editor.assetdb.exists(fileUrl);

    if (isExists == false) {
      let fspath = Editor.assetdb.urlToFspath('db://create_proxy-templates/' + tplName);
      var fs = require('fs');

      fs.readFile(fspath, (err, data) => {
        let context = data.toString();
        context = context.replace(new RegExp('#proxyName#', "gm"), proxyName);
        Editor.assetdb.create(fileUrl, context);
      });
    }
    else {
      Editor.log( proxyName + 'Proxy.js 已存在'); 
    }
  },

  createProxy(proxyName) {

    if (proxyName == "") {
      Editor.log('请输入Proxy名称');
      return;
    }

    let reg = /^[a-z]+$/;
    if (reg.test(proxyName[0])) {
      Editor.log('Proxy名首字母修需要大写');
      return;
    }

    Editor.log('创建Proxy:' + proxyName);
    this.createProxyFile(proxyName, 'Proxy.tpl');

  },

  // register your ipc messages here
  messages: {
    'open'() {
      // open entry panel registered in package.json
      Editor.Panel.open('create_proxy');
    },
    'say-hello'() {
      Editor.log('Hello World!');
      // send ipc message to panel
      Editor.Ipc.sendToPanel('create_proxy', 'create_proxy:hello');
    },
    'clicked'(event, proxyName) {

      this.createProxy(proxyName);
    }
  },





};