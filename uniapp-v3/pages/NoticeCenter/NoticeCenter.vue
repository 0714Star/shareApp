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

function loadChatDetail(userid : number){
	let t:number = 12;
	return t+12;
}

let contactsList  =[
	{
		username : '熊浩毅',
		nickname : '熊bb',
		userid: 1,
		avatar:"http://localhost:24123/images/xbb.jpg",
		time:"2024-12-16 22:45",
		endMessage:"你还在生气嘛，叶不丢QAQ",
		unreadnumber: 1
	},
	{
		username : '叶子彤',
		nickname : '小彤饱饱',
		userid: 2,
		avatar:"http://localhost:24123/images/xtbb.jpg",
		time:"2024-12-16 22:44",
		endMessage:"对不起，我不该一心二用还对你那样",
		unreadnumber:12,
	}
]

</script>

<style>

</style>
