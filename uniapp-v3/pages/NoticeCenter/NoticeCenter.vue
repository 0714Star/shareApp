<template>
	<uni-list v-for="item in contactsList">
		<uni-list-chat :avatar-circle="true"  :title="item.username"  :clickable="true"
		:avatar="item.avatar"
		:time="item.time?item.time:null"
		:note="item.endMessage"
		badge-positon="left" :badge-text="item.unreadnumber"
		@click="loadChatDetail(item.userid)"
		link="navigateTo"
		to="/pages/NoticeCenter/chat/chat"
		 />
	</uni-list>
</template>

<script setup lang="ts">
import {reactive} from 'vue'
import {iMessagePublic,iMessagePrivate} from '@/utils/api/interface'
function loadChatDetail(userid : number){
	let t:number = 12;
	return t+12;
}

let contactsList  =[
	{
		username : '熊浩毅',
		nickname : '熊bb',
		userid: 1,
		avatar:"http://192.168.123.203:24123/images/xbb.jpg",
		time:"2024-12-16 22:45",
		endMessage:"你好",
		unreadnumber: 1
	},
	{
		username : '叶子彤',
		nickname : '小彤饱饱',
		userid: 2,
		avatar:"http://192.168.123.203:24123/images/xtbb.jpg",
		time:"2024-12-16 22:44",
		endMessage:"你好！41",
		unreadnumber:12,
	}
]

</script>

<style>

</style>
