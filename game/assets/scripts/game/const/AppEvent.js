
let AppEvent = {};

//--模块事件
AppEvent.MODULE_EVENT = "module_event";
AppEvent.MODULE_OPEN_EVENT = "module_open_event" ;
AppEvent.MODULE_LOADING_OPEN_EVENT = "module_loading_open_event"; //--通过加载界面打开模块
AppEvent.MODULE_CLOSE_EVENT = "module_close_event" ;
AppEvent.MODULE_FINALIZE_EVENT = "module_finalize_event" ;//--模块释放事件

//--状态事件
AppEvent.GAME_STATE_EVENT = "game_state_event";
AppEvent.GAME_STATE_CHANGE_EVENT = "game_state_change_event";

//--场景事件
AppEvent.SCENE_EVENT = "scene_event";
AppEvent.SCENE_ENTER_EVENT = "scene_enter_event";
AppEvent.SCENEMAP_MOVE_UPDATE = "scenemap_move_update";  //--更新主城地图坐标

//--游戏事件
AppEvent.GAME_EVENT = "game_event";
AppEvent.GAME_LOGOUT_EVENT = "game_logout_event";
AppEvent.GAME_SCENE_LOGIN_EVENT = "game_scene_login_event"; //--在场景中登录游戏

//--网络事件
AppEvent.NET_EVENT = "net_event";
AppEvent.NET_SEND_DATA = "net_send_data" ;//--发送数据
AppEvent.NET_RECV_DATA = "net_recv_data" ;//--接收数据
AppEvent.NET_START_CONNECT = "net_start_connect"; //--开始网络链接
AppEvent.NET_SUCCESS_CONNECT = "net_success_connect" ;//--成功连接上网络
AppEvent.NET_FAIL_CONNECT = "net_fail_connect"; //--连接失败
AppEvent.NET_SUCCESS_RECONNECT = "net_success_reconnect" ;//--重新连接成功
AppEvent.NET_HAND_CLOSE_CONNECT = "net_hand_close_connect"; //--请求手动网络关闭
AppEvent.NET_AUTO_CLOSE_CONNECT = "net_auto_close_connect"; //--自动关闭网络，需要重连
AppEvent.NET_FAILURE_RECONNECT = "net_failure_reconnect" ;//--重连失败
AppEvent.NET_LOGIN_GATEWAY = "net_login_gateway"//登录网关
AppEvent.NET_LOGIN_GATEWAY_SUCCESS = "net_login_gateway_success"//登录网关
//---------------系统SystemProxy
AppEvent.PROXY_SYSTEM_LOGINGATE = "proxy_system_logingate" //网关登录
AppEvent.PROXY_SYSTEM_OTHERLOGIN = "proxy_system_otherlogin" //被动退出
AppEvent.PROXY_SYSTEM_HEARTBEAT = "proxy_system_heartbeat" //心跳
AppEvent.PROXY_SYSTEM_LOGIN = "proxy_system_login" //登录
AppEvent.PROXY_SYSTEM_CHARGESUCESS = "proxy_system_chargesucess" //充值成功

//-------------loader event -----
AppEvent.LOADER_MAIN_EVENT = "loader_main_event" ;//--加载事件
AppEvent.LOADER_UPDATE_PROGRESS = "loader_update_progress"; //--进度更新
AppEvent.LOADER_UPDATE_STATE = "loader_update_state" ;//--更新状态
AppEvent.LOADER_START = "loader_start" ;//--加载开始

//--------------role event-------------
AppEvent.PROXY_UPDATE_ROLE_INFO = "proxy_update_role_info";





//-------------proto--------------
AppEvent.NET_M1 = 1  //登录协议
AppEvent.NET_M1_C8888 = 8888 //心跳

AppEvent.NET_M1_C9988 = 9988 //退出排队系统
AppEvent.NET_M1_C9998 = 9998 //通知异地登陆
AppEvent.NET_M1_C9999 = 9999 //登录网关
AppEvent.NET_M1_C10000 = 10000 //登录游戏
AppEvent.NET_M1_C10001 = 10001
AppEvent.NET_M1_C10002 = 10002 //登录后的事件ID 只能记录登录成功的

AppEvent.NET_M2 = 2
AppEvent.NET_M2_C20000 = 20000 //请求角色信息

export default AppEvent;