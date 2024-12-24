<template>
	<view>
		this is home
		<button type="success" @click='connect'> 点击连接服务器</button>
		<button type="default" @click="clearState" >清除登录状态</button>
		<button type="success" @click='store.commit("wsModule/addPrivateMessage","this is a message.")'> 点击发送消息</button>
		<button type="success" @click='store.commit("userModule/checkState")'> 验证是否登录</button>
		<button type="success" @click='check()'> 测试请求</button>
	</view>
</template>

<script setup lang="ts">
	import store from '@/store'
	import { onMounted } from "vue";
import axios from "@/utils/api/axios.js"
function check(){
	axios.get("/wxAuth/test");
	
	
}
function connect(){
	store.dispatch("wsModule/connect"); // 连接服务器
}
function clearState(){
	store.dispatch("userModule/clearUserInfo")
}
onMounted(()=>{
	// this.$store.dispatch("connect"); // 连接服务器
})
</script>

<style>
	       
</style>
