interface userInfo {
		nickName:String,
		avatar:String,
		openId:String,
		encryptedData:String,
		signature:String,
}

/**
 * 消息发送信息
 */
interface message{
	from_id : number,
	to_id: number,
	content:string,
	create_time:Date,
	from_nickname:string,
	from_user_profile:string, 
}
export {
	userInfo,
	message
}