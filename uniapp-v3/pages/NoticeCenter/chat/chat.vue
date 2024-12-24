<template>
  <view class="chat-container">

    <view class="message-area">
      <view class="message" v-for="(msg, index) in messages" :key="index">
        <view :class="['message-box', msg.type]">
          <view class="message-content">{{ msg.content }}</view>
        </view>
      </view>
    </view>


    <view class="input-area">
      <input
        type="text"
        v-model="newMessage"
        placeholder="请输入消息"
        @keyup.enter="sendMessage"
        class="input-box"
      />
      <button class="send-button" @click="sendMessage">发送</button>
    </view>
  </view>
</template>


<script setup>
import store from '@/store'
import {iMessagePrivate} from '@/utils/api/interface'

// 获取 当前用户的消息列表 

function sendMessage(){
	let message  = {
		from_id : 1,
		to_id: 2,
		content : "你好，我正在发送消息",
		from_nickname:"小熊bb",
		from_user_profile:"/images/xxbb.jpg",
	}
	store.state.stomp.send("/ws/chat",{} ,JSON.stringify(message));
}

</script>

<style>
	
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 10px;
  background-color: #f5f5f5;
}

.message-area {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  background-color: #ffffff;
  border-radius: 5px;
  margin-bottom: 10px;
}

.message {
  display: flex;
  margin-bottom: 10px;
}

.message-box {
  max-width: 70%;
  padding: 10px;
  border-radius: 5px;
  word-wrap: break-word;
}

.message-box.received {
  background-color: #e6f7ff;
  align-self: flex-start;
}

.message-box.sent {
  background-color: #cce5ff;
  align-self: flex-end;
}

.input-area {
  display: flex;
  align-items: center;
}

.input-box {
  flex: 1;
  padding: 10px;
  border: 1px solid #dcdcdc;
  border-radius: 5px;
  outline: none;
}

.send-button {
  margin-left: 10px;
  padding: 10px 20px;
  background-color: #1890ff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.send-button:hover {
  background-color: #40a9ff;
}
</style>
