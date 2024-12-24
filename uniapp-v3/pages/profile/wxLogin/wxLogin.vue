<template>

	<uni-card title="Code" thumbnail="" extra="额外信息" note="Tips">
		<view>wxCode : {{wxCode?.code}}</view>
		<view>userInfo: {{userInfo?.nickName}}</view>
		<image :src="userInfo?.avatarUrl"></image>
		<button type="primary" class="login-button" @click="pingRequest">基础请求</button>
		<button type="warn" @click="clearUserData">清除登录凭证</button>
		<button type="warn" class="login-button" @click="autoLogin">登录测试</button>
	</uni-card>

</template>

<script setup lang='ts'>
import {ref ,reactive , onMounted, onActivated} from 'vue'
import axios from '@/utils/api/axios.js'

import store from "@/store"

let wxCode  = reactive({code :"a"});
let userInfo = reactive({})
let respData = reactive({});

function autoLogin(){
	store.dispatch("userModule/autoLogin")
}
function clearUserData(){
	store.dispatch("userModule/clearUserInfo") // 清除
}
function pingRequest(){
	uni.showModal({
		title:"登录成功",
		complete() {
			
		}
	})
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
