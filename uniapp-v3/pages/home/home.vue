<template>
	<view>
		this is home
		<button type="default" @click="clearUserData" >清除登录状态</button>
	</view>
</template>

<script setup lang="ts">
	import {clearUserData} from "@/utils/api/wxLogin.js"
</script>

<style>
	       
</style>
