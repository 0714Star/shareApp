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
	function sendMessage(){
		
	}
	
/*
import { ref, onMounted, onBeforeUnmount } from 'vue';

// 消息列表和输入消息内容
const messages = ref([
  { type: 'received', content: '你好，有什么需要帮助的吗？' },
  { type: 'sent', content: '你好，我想问一下这个功能怎么用？' },
]);
const newMessage = ref('');
let websocket = null;

// WebSocket 连接函数
const connectWebSocket = () => {
  websocket = new WebSocket('ws://127.0.0.1:24123/chat');

  websocket.onopen = () => {
    console.log('WebSocket 已连接');
  };

  websocket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data && data.content) {
      messages.value.push({ type: 'received', content: data.content });
    }
  };

  websocket.onclose = () => {
    console.log('WebSocket 已关闭，尝试重连...');
    setTimeout(connectWebSocket, 5000); // 自动重连
  };

  websocket.onerror = (error) => {
    console.error('WebSocket 错误:', error);
  };
};

// 发送消息函数
const sendMessage = () => {
  if (newMessage.value.trim() !== '' && websocket && websocket.readyState === WebSocket.OPEN) {
    const message = { type: 'sent', content: newMessage.value };
    messages.value.push(message);
    websocket.send(JSON.stringify(message));
    newMessage.value = '';
  }
};

onMounted(() => {
  connectWebSocket();
});

onBeforeUnmount(() => {
  if (websocket) {
    websocket.close();
  }
});
*/
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
