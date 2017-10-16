/**
 * Created by on 2017/10/14.
 */

import GameModule from "GameModule";

import LoginModule from "LoginModule";
import LoaderModule from "LoaderModule";
import MainSceneModule from "MainSceneModule";
import ToolbarModule from "ToolbarModule";
import RoleInfoModule from "RoleInfoModule";
import ChatModule from "ChatModule";
import ActivityModule from "ActivityModule";

let GameModuleMap = {};
GameModuleMap[GameModule.LoginModule] = LoginModule;

GameModuleMap[GameModule.LoaderModule] = LoaderModule;
GameModuleMap[GameModule.MainSceneModule] = MainSceneModule;
GameModuleMap[GameModule.ToolbarModule] = ToolbarModule;
GameModuleMap[GameModule.RoleInfoModule] = RoleInfoModule;
GameModuleMap[GameModule.ChatModule] = ChatModule;
GameModuleMap[GameModule.ActivityModule] = ActivityModule;

/**
 * 场景模块的，在这里加入
 * @type {Array}
 */
let SceneModuleNameList = [
    GameModule.LoaderModule,
    GameModule.MainSceneModule,
    GameModule.ToolbarModule,
    GameModule.RoleInfoModule,
    GameModule.ChatModule,
    GameModule.ActivityModule,
];

////////////////////////////////////////////////////////////

GameModuleMap.getModule = (name) => {
    return GameModuleMap[name];
};

GameModuleMap.getSceneModuleNameList = () => {
    return SceneModuleNameList;
};

export default GameModuleMap;