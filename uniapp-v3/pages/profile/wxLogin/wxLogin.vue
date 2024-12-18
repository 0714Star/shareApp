<template>
	<button type="primary" class="login-button" @click="autoLogin">一键登录</button>
	<uni-card title="Code" thumbnail="" extra="额外信息" note="Tips">
		<view>wxCode : {{wxCode.code}}</view>
		<view>userInfo: {{userInfo.nickName}}</view>
		<image :src="userInfo.avatarUrl"></image>
		<button type="primary" class="login-button" @click="pingRequest">基础请求</button>
		<button type="warn" @click="clearUserData">清除登录凭证</button>
		<button type="default" open-type="getPhoneNumber" bindgetphonenumber="getPhoneNumber"></button>
	</uni-card>

</template>

<script setup >
import {ref ,reactive , onMounted, onActivated} from 'vue'
import axios from '@/utils/api/axios.js'
import {loginByWX, saveLoginData, getUserdata ,clearUserData} from '@/utils/api/wxLogin';

let wxCode  = reactive({code :"a"});
let userInfo = reactive({})
let respData = reactive({});
/**
 * 一键登录
 */
function autoLogin(){
	const user={
		nickName:"",
		avatar:"",
		openId:"",
		encryptedData:"",
		signature:"",
		wxTempCode:"", // 临时凭证
	}
	wx.getUserProfile({
		desc:"获取用户信息",
		success:(userInfo,rawData,signature,encryptedData,iv)=>{
			console.log(userInfo)
			user.nickName = userInfo.userInfo.nickName;
			user.avatar = userInfo.userInfo.avatarUrl;
			user.encryptedData = userInfo.encryptedData;
			user.signature = userInfo.signature;
			console.log("------user------" ,user)
			login(user)
		}
	})
	/**
	 * 登录请求获取数据库中用户信息同时携带 token 凭证
	 * @param {Object} user
	 */
	function login(user){
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
		saveLoginData(resWeb.data);
		console.log("后端返回的 登录数据",resWeb)
	}
}	
function pingRequest(){
	// axios.get("/wxAuth/test").then(res=>{
	// 	console.log(res)
	// })
	// uni.showToast({
	// 	title: "登录成功",
	// 	icon:'success',
	// 	duration: 2000 , 
	// 	success() {
			
	// 	}
	// })
	uni.showModal({
		
		title:"登录成功",
		complete() {
			
		}
	})
}
function getPhoneNumber (e) {
    console.log(e.detail.code)  // 动态令牌
    console.log(e.detail.errMsg) // 回调信息（成功失败都会返回）
    console.log(e.detail.errno)  // 错误码（失败时返回）
  }

</script>

<style lang='scss' >
.login-button{
	width: 30%;
	min-width: 100px;
	height: auto;
	.onClick{
		background-color: red;
	}
}
</style>
