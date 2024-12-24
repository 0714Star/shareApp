import myWs from '@/utils/ws/index.js'; // 封装的websocket
import {WEBSOCKET_BASEURL,USERINFO_KEY} from '@/utils/CONSTANTS.js';
import {iSession,iMessagePrivate,iMessagePublic,userInfo,iTalkItem,iState} from '@/utils/api/interface';
import Stomp from 'stompjs'
import axios from '@/utils/api/axios.js';
const  wsModule = {
	namespaced : true, //  启用命名空间
	// 创建一个store 
	// 全局状态
	state:()=>(uni.getStorageSync("state")?{
		...JSON.parse(uni.getStorageSync("state")),
		my_ws: null,
	}:{
		curUser : uni.getStorageSync(USERINFO_KEY),
		sessions:{} , // 聊天记录
		talkLists:[], //  消息列表
		currentSession :{username: '群聊',nickname :'群聊'}, // 当前选中的用户
		stomp : null, // 当前stomp端点
		isDot:{} ,//  用户之间是否有未读信息
		my_ws: null, // myWs
	}),
	// 同步方法 使用 store.commit('',args) 调用同步方法
	mutations :{
		// 初始化用户信息
		INIT_DATA(state){
			console.log("INIT_DATA")
			state.curUser = uni.getStorageSync(USERINFO_KEY)
			axios.get("/tkTalkList/selectById/"+state.curUser.userId).then((res)=>{
				state.talkLists = [...res.data]
				console.log(" ")
			})
		},
		// 切换聊天框  :iState 
		changeCurrentSession( state  , currentSession:iSession){
			//切换到当前用户时候 显示消息已读
			// 标记当前会话
			state.currentSession = currentSession;
		},

		/** 保存群聊消息 msg为消息内容 */
		addGroupMessage(state :iState,msg){
			let to_group_message :iMessagePublic = {
				message_type_id:1, // 消息类型ID ：1 文本 | 2 图片 | 3 文件
				from_id : state.curUser.user_id, // 当前用户ID
				to_id: state.currentSession.to_id, // 群聊ID
				content:msg,
				from_nickname:state.curUser.nickName,
				from_user_profile:state.curUser.avatar, 
			}
			state.stomp.send("app/publicMessage",{},to_group_message)
		}, 
		/** 保存私聊消息 */
		addPrivateMessage(state,msg){
			// let to_user_message :iMessagePrivate = {
			// 	message_type_id:1, // 消息类型ID ：1 文本 | 2 图片 | 3 文件
			// 	from_id : state.curUser.user_id, // 当前用户ID
			// 	to_id: state.currentSession.to_id, // 收信息用户ID
			// 	content:msg,
			// 	from_nickname:state.curUser.nickName,
			// 	from_user_profile:state.curUser.avatar, 
			// }

			// console.log(msg)
			// state.stomp.send("app/privateMessage",{
			// 	"Content-Type":"application/json"
			// },JSON.stringify({
			// 	// messageTypeId:1, // 消息类型ID ：1 文本 | 2 图片 | 3 文件
			// 	fromId : 1, // 当前用户ID
			// 	toId: 2, // 收信息用户ID
			// 	content:msg,
			// 	// fromNickname:"我是熊浩毅",
			// 	// fromUserProfile:"/images/xxbb.jpg", 
			// }) )
			
			const messgae = {
				from_id: 1,
				to_id:2,
				content:"你好！"
			}
			const testMessage = new Object();
			testMessage.fromId = 1;
			testMessage.toId = 2;
			testMessage.content = "你好!"
			// 向服务端发送消息
			state.stomp.send("/app/privateMessage", {}, JSON.stringify(testMessage));
		},
		/**
		 * 发送消息
		 * @param {Object} context
		 */
		sendMessage(state:iState,destination,originMsg){
			const sendHeader = {}
			// 如果保持连接 
			if(state.my_ws.socketConnected){
				let curSession : iSession  = state.currentSession;
				curSession.messageList.push(msg); // 向会话中塞入消息 
				let messgae = {
					from_id: 1,
					to_id:2,
					content:"你好！"
				}
				// 向服务端发送消息
				state.stomp.send("/app/privateMessage", {},messgae);
				// state.stomp.send("/app/privateMessage", {}, JSON.stringify(messgae));
			}else { // 连接断开后续从消息队列中读取消息发送
				// 断开连接放置到消息队列中
				state.my_ws.messageQueue.push({
					destination: "app/privateMessage",// 发送的目的地
					message: JSON.stringify(messgae)
				})
			}
		},
		
	},
	// 异步方法 使用 store.dispatch('',args)，调用异步方法方法
	actions:{
	
		/**
		 * 实现连接服务器连接和消息订阅
		 * @param {Object} context
		 */
		connect(context){
			const headers = {};
			// 创建一个 WebSocket 连接
			let my_ws =  new myWs();
			context.state.my_ws = my_ws; // 设置连接
			/** 连接ws */
			function connect_ws() {
				wx.connectSocket({
					url:WEBSOCKET_BASEURL,
					token: "temp-token"
				})
			}
			connect_ws()
			// 使用 wx的websocket实现 Stomp websocket传输
	
			// 监听 WebSocket 连接打开事件
			wx.onSocketOpen(function(res) {
			  console.log("WebSocket 连接成功")
			  my_ws.socketConnected = true;
			  my_ws.onopen();
			  // 连接成功后，将队列中的消息发送出去
			  console.log(my_ws.reconnect)
			  let queueLength = my_ws.messageQueue.length
			  for (let i = 0; i < queueLength; i++) {
			    my_ws.send(my_ws.messageQueue.shift())
			  }
			  // 初始化信息
			  context.commit("INIT_DATA");
			})
			
			// 监听 WebSocket 接受到服务器的消息事件
			wx.onSocketMessage(function(res) {
			  my_ws.onmessage(res);
			})
			
			// 监听 WebSocket 错误事件
			wx.onSocketError(function(res) {
			  console.log("WebSocket 错误事件")
			  if (!my_ws.socketConnected) {
			    // 断线重连
			    if (my_ws.reconnect) {
			      connect_ws();
			    }
			  }
			})
			
			// 监听 WebSocket 连接关闭事件
			wx.onSocketClose(function(res) {
			  console.log("WebSocket 连接关闭")
			  my_ws.socketConnected = false;
			  // 断线重连
			  if (my_ws.reconnect) {
			    connect_ws();
			  }
			})
			////////////
			/**
			 * 定期发送心跳或检测服务器心跳
			 *  The heart-beating is using window.setInterval() to regularly send heart-beats and/or check server heart-beats.
			 *  可看stomp.js的源码（195,207，489行），由于小程序没有window对象，所以我们要调用小程序的定时器api实现
			 */
			Stomp.setInterval = function(interval, f) {
			  return setInterval(f, interval);
			};
			// 结束定时器的循环调用
			Stomp.clearInterval = function(id) {
			  return clearInterval(id);
			};
			
			context.state.stomp = Stomp.over(my_ws);
			
			context.state.stomp.connect(headers,
				(success)=>{
					console.log("连接成功" , success)
					// 连接成功
					// 设置用户在线 TODO
					/**
					 * 订阅用户状态信息
					 */
					context.state.stomp.subscribe("/topic/notification",(msg)=>{
						// xxx上线了
						// 更新用户列表(的登录状态)
						// context.commit("GET_USERS");
					})
					/**
					 * 订阅群聊消息
					 */
					context.state.stomp.subscribe("/topic/message",msg=>{
						// 收到消息
						let receiveMsg = JSON.parse(msg.body)
						console.log(receiveMsg);
						// 判断当前界面是否为收到消息的群聊 , 如果不是群聊则消息未读
						if(context.state.currentSession.to_id != receiveMsg.group_id){
							// TODO 设置消息未读
						}
						// 渲染消息
						context.commit('addGroupMessage',receiveMsg);
					})
					/**
					 * 订阅私聊消息 currentUserId
					 */
					context.state.stomp.subscribe("/private/all/2" ,msg=>{
						console.log("receiveMsg:",msg)
						// 获取接受的消息
						let receiveMsg = JSON.parse(msg.body); 
						// 当前聊天框不是正在会话的用户 显示 未读
						if(!context.state.currentSession || receiveMsg.from_id != context.state.currentSession.from_id){
							// 渲染该消息位置为未读 TODO
						}
					})
					
				},
				(error)=>{
					console.log("连接失败 :",error)
				}
			);
	
		},
		
		/**
		 * 断开websocket连接 :iState
		 * @param {Object} context
		 */
		disconnect(context ){
			// context.state : iState
			if(context.state.stomp !=null ){
				context.stomp.disconnect(); // 断开连接
			}
		}
	},
	// 计算属性
	getters:{
		
	}
}

export default wsModule;