export const loginByWX = (data)=> http.get('/u/loginByWechat',{param: data})

export const saveLoginData = (data)=>{
	console.log("save ,data : ",data)
	let storageData = data;//  || data
	
	uni.setStorageSync("user-info",storageData);
}

export const getUserdata = ()=>{
	return uni.getStorageSync("user-info")
}

export const clearUserData = ()=>{
	uni.setStorageSync("user-info",null)
	uni.$emit("updateUserInfo")
}