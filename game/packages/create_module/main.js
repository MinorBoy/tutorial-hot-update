'use strict';

module.exports = {
  load () {
    // execute when package loaded
  },

  unload () {
    // execute when package unloaded
  },

  createModuleFile(moduleName, subType, fileName, tplName){
    //创建目录
    let moduleUrl = 'db://assets/scripts/modules/' + moduleName + "/";
    let url = moduleUrl + subType + "/";

    let isExists = Editor.assetdb.exists(url);
    if(isExists == false){
      Editor.assetdb.create(url);
    }

    // Editor.log("创建目录：" + url + " " + isExists);

    let fileUrl = url + fileName;
    isExists = Editor.assetdb.exists(fileUrl);

    let upModuleName = moduleName[0].toUpperCase() + moduleName.slice(1);
    if(isExists == false){
      let fspath = Editor.assetdb.urlToFspath('db://create_module-templates/' + tplName);
      var fs = require('fs');

      fs.readFile(fspath, (err, data) => {
        let moduleContext = data.toString();
        moduleContext = moduleContext.replace(new RegExp('#moduleName#',"gm"), upModuleName);
        Editor.assetdb.create(fileUrl , moduleContext);
      });
    }
  },

  createModule(moduleName, panelName){


    if(moduleName == ""){
      Editor.log('请输入模块名称');
      return;
    }

    let reg = /^[A-Z]+$/;
    if(reg.test(moduleName[0])){
      Editor.log('模块名首字母修需要小写');
      return;
    }

    if(panelName != "" && panelName != null){
      if(!reg.test(panelName[0])){
        Editor.log('模块面板名首字母需要大写');
        return;
      }
      Editor.log('创建模块面板:' + moduleName + " " + panelName);
      this.createModuleFile(moduleName, "panel", panelName + "Panel.js", 'Panel.tpl');
      return;
    }

    let upModuleName = moduleName[0].toUpperCase() + moduleName.slice(1);
    Editor.log('创建模块:' + moduleName);
    this.createModuleFile(moduleName, "", upModuleName + "Module.js", 'Module.tpl');
    this.createModuleFile(moduleName, "action", upModuleName + "Action.js", 'Action.tpl');
    this.createModuleFile(moduleName, "panel", upModuleName + "Panel.js", 'Panel.tpl');
    this.createModuleFile(moduleName, "store", upModuleName + "Store.js", 'Store.tpl');
    this.createModuleFile(moduleName, "view", upModuleName + "View.js", 'View.tpl');
    setTimeout(() => {
      this.createModuleFile(moduleName, "action", upModuleName + "ActionTypes.js", 'ActionTypes.tpl');
    }, 100);

  },

  // register your ipc messages here
  messages: {
    'open' () {
      // open entry panel registered in package.json
      Editor.Panel.open('create_module');
    },
    'say-hello' () {
      Editor.log('Hello World!');
      // send ipc message to panel
      Editor.Ipc.sendToPanel('create_module', 'create_module:hello');
    },
    'clicked' (event, moduleName, panelName) {

      this.createModule(moduleName, panelName);
    }
  },





};