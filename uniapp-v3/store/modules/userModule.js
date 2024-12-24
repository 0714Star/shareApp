import {userInfo} from "@/utils/api/interface"
import {USERINFO_KEY} from '@/utils/CONSTANTS.js'
import axios from "@/utils/api/axios.js"
const userModule = {
  namespaced: true, // 启用命名空间，防止模块间命名冲突
  state: () => ({
    userInfo: null,
  }),
  mutations: {
	updateUserInfo(state,userInfo){
		// 更新 聊天的属性属性
		state.userInfo = userInfo; 
		uni.setStorageSync(USERINFO_KEY,userInfo);
		console.log("保存成功")
	},
	checkState({userInfo}){
		console.log("userInfo is",userInfo)
		return userInfo == null ? false: true;
	},

  },
  actions: {
	checkState({state,dispatch}){
		console.log("checkState")
		if(state.userInfo == null) {
			dispatch("autoLogin");
			return false;
		}
		return true;
	},
	/**
	 *  一键登录
	 *  @param {Object} context.state
	 */
	autoLogin({state,commit}){
		console.log("autoLogin!")
		const user={
			nickName:"",
			avatar:"",
			openId:"",
			encryptedData:"",
			signature:"",
			wxTempCode:"", // 临时凭证
		}
		/**
		 * 获取用户信息
		 */
		wx.getUserProfile({
			desc:"获取用户信息",
			success:(userInfo,rawData,signature,encryptedData,iv)=>{
				console.log(userInfo)
				user.nickName = userInfo.userInfo.nickName;
				user.avatar = userInfo.userInfo.avatarUrl;
				user.encryptedData = userInfo.encryptedData;
				user.signature = userInfo.signature;
				console.log("------user------" ,user)
				login(state,user)
			}
		})

		/**
		 * 登录请求获取数据库中用户信息同时携带 token 凭证
		 * @param {Object} user
		 */
		function login(state,user){
			// 1. 获取临时凭证code
			wx.login().then(res=>{
				user.wxTempCode = res.code;
				axios.post("/wxAuth/wxLogin",user).then(resWeb=>{
					if(resWeb.code == 200){
						uni.showToast({
							title: "登录成功",
							icon:'success',
							duration: 2000 , 
							success() {
								// 切回profile界面
								uni.switchTab({
									url: "/pages/profile/profile",
								})
							}
						})
						loginSuccess(resWeb)
					}
				})
		
			}).catch((reason )=>{
				console.log(reason)
			})
		}
		// 登录成功
		function loginSuccess(resWeb){
			console.log("后端返回的 登录数据 ",resWeb)
			commit("updateUserInfo",resWeb.data) // 保存用户信息
		}
	} ,
	clearUserInfo(context){
		uni.removeStorageSync(USERINFO_KEY); // 清除userInfo
		// 跳转登录
		uni.showModal({
			title:"请登陆",
			complete() {
				context.dispatch("autoLogin")
			},
			
		})
	}
  },
  getters: {
    
  },
};

export default userModule;