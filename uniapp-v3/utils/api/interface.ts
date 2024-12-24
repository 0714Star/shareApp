/**
 * 用户信息
 */
export interface userInfo {
		userId:Number,
		nickName:String,
		avatar:String,
		role: String,
		sex: String,
		phone:String,
		email:String,
		remark:String,
		createBy:String,
		create_time:String,
		updateBy:String,
		updateTime:String,
		account:String , // 账户金额注意处理 ！
		openId:String,
		encryptedData:String,
		signature:String,
}

/**
 * 私聊消息
 */
export interface iMessagePrivate{
	message_id:number,
	message_type_id:number, // 消息类型ID ：1 文本 | 2 图片 | 3 文件
	from_id : number,
	to_id: number,
	content:string,
	create_time:Date,
	from_nickname:string,
	from_user_profile:string, 
}

/**
 * 群聊消息
 */
export interface iMessagePublic{
	message_id: number,
	message_type_id:number, // 消息类型ID ：1 文本 | 2 图片 | 3 文件
	group_id:number,
	from_id : number,
	content:string,
	create_time:Date,
	from_nickname:string,
	from_user_profile:string, 
	parent_message_id:number
}
/**
 * 聊天列表 Item
 * 包含 群聊和私聊
 */
export interface iTalkItem{
	talk_type: Number, // 会话类型 1 私聊 | 2 群聊
	from_id : Number , // 发起方 ID
	to_id:Number, //  接收方 ID | 群聊ID
	name:String, // 群聊名称
	create_time:String,  // 创建时间
	create_by:String , // 创建者
	// 连表问题
	group_id : Number , // 群聊 ID
	group_name:String , // 群聊名称
	group_state: Number, //  群聊状态
}
/**
 * 会话信息
 */
export interface iSession{
	talkType:Number, // 会话类型 群聊 | 私聊
	to_id:Number,
	messageList:Array<iMessagePrivate>  | Array<iMessagePublic> , // 当前会话的消息列表
	name : String , // 会话的名称 ： 用户昵称 | 群聊昵称
}

export interface iState{
	curUser: userInfo,
	sessions :Array<iSession>,
	talkLists : [iTalkItem],
	currentSession : iSession,
	stomp : Object,
	isDot: {},
	my_ws :iMyWs, // 连接
}

export interface iMyWs {
	that : Object,
	socketConnected : Boolean,
	messageQueue : [],
	reconnect : Boolean,
	send :Function,
	close:Function,
}