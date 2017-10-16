/**
 * 网络管道，有可能会有多个网络管道的情况
 * Created by on 2017/9/19.
 */

import GameSocket from "GameSocket";
import ProtoManager from "ProtoManager";
import logger from "Logger";
import AppEvent from "AppEvent";
import Queue from "Queue";



class NetChannel {
    constructor(ip, port) {
        this._gameSocket = new GameSocket();
        this._serverIp = ip;
        this._serverPort = port;
        this._game = null;
        this._recvQueue = new Queue();//接受到的数据队列
        this._transceiverQueue = new Queue() //--协议传输队列

        this._curSendNetCount = 0 //--当前发送的协议数
        this._curRecvNetCount = 0 //--当前接受的协议数

    }

    finalize() {

    }

    //定时器
    onProtoSchedule() {
    //     --------------重新请求---那些服务器还没有返回的协议请求-------------
    //     for _, data in pairs(self._netReqTimeMap) do
    //         local dtTime = os.time() - data.sendTime
    //         if dtTime > 3 then  --超过3秒，服务端还没有对这条协议做处理，重新请求一下
    //             if data.tryReqCount >= 3 then  --尝试了5次请求了，还没有反应，直接断网处理
    //                 self:onAutoCloseNet()  --上面有做处理了，同条协议，请求3次就会断网
    //                 break
    //             else
    //             logger:error("=====no==error=try====c--->s(%d %d)==reqTime:%d==", data.mId, data.cmdId, data.reqTime)
    //                 if self._isCanSend == false then --当前网络不流畅，不直接发送，先push到队列
    //                     self._transceiverQueue:push({mId = data.mId, cmdId = data.cmdId, buffer = data.buffer})
    //                 else
    //                     self:onSendOneNet(data.mId, data.cmdId, data.buffer, data.reqTime)
    //                 end
    //                 data.tryReqCount = data.tryReqCount + 1
    //                 data.sendTime = os.time()
    //             end
    //         end
    //     end
        
    //     if self._curLogNetCount > 800 then
    //         -- logger:error("====当前发送的协议数:%d==当前接受的协议数:%d=======", self._curSendNetCount, self._curRecvNetCount )
    //         self._curLogNetCount = 0
    //     end
    //     self._curLogNetCount = self._curLogNetCount + 1
    //     if self._isCanSend == false then
    //         local size = self._transceiverQueue:size()
    //         if size >= 10 then --有10个协议还未操作，弹框提示
    // --            component.Loading:show("数据正在处理中", 1)
    //         end
    //         if size >= 3 then --直接断网重连
    //             local curState = self._game:getCurState()
    //             if curState.name == GameStates.Scene then
    //                 local sceneModule = curState:getModule(ModuleName.MainSceneModule)
    //                 if sceneModule ~= nil and sceneModule:isEnterScene() then --在场景里面，有3个操作没有返回了
    //                     local list = self._transceiverQueue:getList()
    //                     local maxSame = 0
    //                     local tmpMap = {}
    //                     for _, proto in pairs(list) do
    //                         local cmd = proto.cmdId
    //                         if tmpMap[cmd] == nil then
    //                             tmpMap[cmd] = 0
    //                         end
    //                         tmpMap[cmd] = tmpMap[cmd] + 1
    //                         if maxSame < tmpMap[cmd] then
    //                             maxSame = tmpMap[cmd]
    //                         end
    //                     end
    //                     if maxSame >= 3 then  --还未发送的协议里面，如果有3条一样的，则直接断开连接
    //                         logger:error("~~~~~~~~~~还未发送的协议里面，如果有3条一样的，则直接断开连接~~~~~~~")
    //                         self:onAutoCloseNet()
    //                         return
    //                     end
    //                 end
    //             end
    //         end
    //         if size >= 15 then
    //             local curState = self._game:getCurState()
    //             local sceneModule = curState:getModule(ModuleName.MainSceneModule)
    //             if sceneModule ~= nil and sceneModule:isEnterScene() then --在场景里面，有15个操作没有返回了
    //                 logger:error("~~~~~~~~~在场景里面，有15个操作没有返回了~~~~~~~")
    //                 self:onAutoCloseNet()
    //             end
    //         end
    //         return
    //     end
    
    //     local sendList = {}
    //     local len = 0
    //     for i=1,10 do
    //         local proto = self._transceiverQueue:pop()
    //         if proto ~= nil then
    //             table.insert(sendList, proto)
    //             len = len + string.len(proto.buffer)
    //         end
    //     end
    
    //     if #sendList > 0 then
    //         -- print("=========sendList========", #sendList)
    //         local sendCount = #sendList
    //         local byteArray = ByteArray.new()
    //         byteArray:writeInt(4 + 1 + (1 + 4 + 4) * sendCount + len)
    //         local curTime = math.abs(math.ceil(os.clock() * 100)) 
    //         byteArray:writeInt(curTime)
    //         byteArray:writeByte(sendCount)
    //         for _, proto in pairs(sendList) do
    //             self._curSendNetCount = self._curSendNetCount + 1
    //             byteArray:writeInt(string.len(proto.buffer))
    //             byteArray:writeByte(proto.mId)
    //             byteArray:writeInt(proto.cmdId)
    //             byteArray:writeBytes(proto.buffer)
    //         end
    
    //         self._transceiver:send(byteArray:toString())
    
    //         self._curSendCount = self._curSendCount + 1
    //         if self._curSendCount >= self._maxSendFrame then
    //             self._isCanSend = false --达到最大发送条数了
    //             self._curSendCount = 0
    //         end
    //     end

        for (let i = 0; i < 5; i++) {
            let recvData = this._recvQueue.pop()
            if (recvData) {
                this.dispatchRecvData(recvData)
                this._curRecvNetCount = self._curRecvNetCount + 1
            }
        }
    }

    /**
     * 方法说明 把已经解析的网络数据发出去
     * @method dispatchRecvData
     * @for NetChannel
     * @param this._recvQueue[i]
     * @return null
     */
    dispatchRecvData(recvData) {
        this._game.dispatchRecvData(recvData)
    }

    setGame(game) {
        this._game = game;
    }

    sendNotification(event, data) {
        this._game.getCurState().sendNotification(event, data);
    }

    launch() {
        this._gameSocket.setChannel(this);
        this._gameSocket.connect(this._serverIp, this._serverPort);
    }

    close() {
        this._gameSocket.close();
    }

    isConnected() {
        this._gameSocket.isConnected();
    }

    onSuccessConnect() {
        this.sendNotification(AppEvent.NET_SUCCESS_CONNECT, null);
    }

    onFailConnect() {
        this.sendNotification(AppEvent.NET_FAIL_CONNECT, null);
    }

    //接受到网络消息
    recvNet(byteArray) {
        let self = this
        let responseSize = byteArray.readByte();
        let iscompress = byteArray.readByte();
        if (iscompress == 1) {  //压缩的，需要解压

        }

        for (var i = 0; i < responseSize; i++) {
            let protoSize = byteArray.readInt();
            let mId = byteArray.readInt();
            let cmdId = byteArray.readInt();
            logger.info("===== S2C ==> cmdId = " + cmdId);
            let offsetEnd = byteArray.offset + protoSize
            let bufferArray = byteArray.copy(byteArray.offset, offsetEnd);
            byteArray.offset = offsetEnd
            
            if(cmdId == 140012){
                logger.info("=========>", 140012);
            }

            let bufferView = bufferArray.view || new Uint8Array();

            this.decode(mId, cmdId, bufferView, (data) => {
                logger.info("数据解析成功", data);
                self._recvQueue.push({ mId: mId, cmdId: cmdId, data: data })
            });
        }

        if (responseSize == 0) {  //只有一个数据包
            let mId = byteArray.readInt();
            let cmdId = byteArray.readInt();
            logger.info("===== S2C ==> cmdId = " + cmdId);
            let bufferArray = byteArray.copy(byteArray.offset, byteArray.buffer.byteLength);

            this.decode(mId, cmdId, bufferArray.view, (data) => {
                logger.info("数据解析成功", data);
                self._recvQueue.push({ mId: mId, cmdId: cmdId, data: data })
            });
        }
    }

    // registerProto(){

    // }

    //发送网络数据
    sendNet(data) {
        let mId = data["mId"];
        let cmdId = data["cmdId"];
        let obj = data["obj"];

        this.encode(mId, cmdId, obj, (buffer) => {
            this.oneSendOneNet(mId, cmdId, buffer, 0);
        });
    }

    //发送1条协议
    oneSendOneNet(mId, cmdId, buffer, reqTime) {
        var len = buffer.byteLength;
        var sendCount = 1;
        var byteArray = new dcodeIO.ByteBuffer();
        byteArray.writeInt(4 + 1 + (1 + 4 + 4) * sendCount + len);
        byteArray.writeInt(reqTime);
        byteArray.writeByte(sendCount);

        byteArray.writeInt(len);
        byteArray.writeByte(mId);
        byteArray.writeInt(cmdId);
        byteArray.flip();   //将缓冲区准备为数据传出状态,执行以上方法后,输出通道会从数据的开头而不是末尾开始.回绕保持缓冲区中的数据不变,只是准备写入而不是读取

        byteArray = dcodeIO.ByteBuffer.concat([byteArray, buffer]);
        byteArray.flip();

        this._gameSocket.send(byteArray.buffer);
    }

    encode(mId, cmdId, obj, callback) {
        ProtoManager.getProtoType("M" + mId, "M" + cmdId + ".C2S", (type) => {
            var message = type.create(obj);
            var buffer = type.encode(message).finish();
            callback.call(this, buffer);
        });
    }

    //将二进制数据，decode成数据结构
    decode(mId, cmdId, buffer, callback) {
        if (140012 == cmdId){
                let x = 1
            }
        ProtoManager.getProtoType("M" + mId, "M" + cmdId + ".S2C", (type) => {
            
            let message = type.decode(buffer);
            callback.call(this, message);
        });
    }
}

NetChannel.GAME = "Game";  //游戏网络管道
NetChannel.CHAT = "Chat";

export default NetChannel;