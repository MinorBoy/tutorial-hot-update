/**
 * Created by on 2017/10/14.
 */
import GameProxy from "GameProxy";

import RoleProxy from "RoleProxy";
import SystemProxy from "SystemProxy";

let GameProxyMap = {};
GameProxyMap[GameProxy.Role] = RoleProxy;
GameProxyMap[GameProxy.System] = SystemProxy;

export default GameProxyMap;