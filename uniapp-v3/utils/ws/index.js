// 需要自己封装 符合 stomp 调用的方法 send , close
class myWs {
	constructor(){
		this.that = this;
		// socket是否连接
		this.socketConnected =false;
		// 待发送的消息队列
		this.messageQueue = [];
		// 是否断线重连
		this.reconnect = true;
	}

	// 发送消息
	send (msg){
	  // console.log(msg);
	  // 如果socket已连接则发送消息
	  if (this.socketConnected) {
		wx.sendSocketMessage({
		  data: msg
		})
	  } else {
		// socket没有连接将消息放入队列中
		messageQueue.push(msg);
	  }
	};

	// 关闭连接
	close(){
	  if (socketConnected) {
		wx.closeSocket()
		socketConnected = false;
	  }
	}
}
export default myWs;
