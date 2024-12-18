<template>
  <view class="profile-container">
    <!-- 用户信息卡片 -->
    <view class="card user-info-card">
      <image class="avatar" :src="userData.avatar" mode="aspectFill"></image>
      <text class="username">{{userData.nickName}}</text>
    </view>

    <!-- 预留的业务逻辑卡片 -->
    <view class="card placeholder-card">
      <text class="placeholder-text">这里预留扩展业务逻辑</text>
      <text class="placeholder-text">这里预留扩展业务逻辑</text>
      <text class="placeholder-text">这里预留扩展业务逻辑</text>
      <text class="placeholder-text">这里预留扩展业务逻辑</text>
      <text class="placeholder-text">这里预留扩展业务逻辑</text>
      <text class="placeholder-text">这里预留扩展业务逻辑</text>
      <text class="placeholder-text">这里预留扩展业务逻辑</text>
      <text class="placeholder-text">这里预留扩展业务逻辑</text>
      <text class="placeholder-text">这里预留扩展业务逻辑</text>
    </view>
  </view>

</template>

<script setup lang="ts">
import {ref ,onMounted,onActivated, reactive}from 'vue'
import {getUserdata} from '@/utils/api/wxLogin.js'
import {userInfo} from "@/utils/api/interface"

let userData:userInfo = reactive(getUserdata());

onMounted (()=>{
	// 如果本地没有token 自动跳转到登录界面
  // #ifdef MP
  const userData = getUserdata();
  const token :string= userData?.token;
  console.log("userData is :",userData);
  // 如果本地没有token 自动跳转到登录界面
  if (!token) {
    uni.navigateTo({
      url: "/pages/profile/wxLogin/wxLogin"  // 假设你的登录页路径为 /pages/login/login
    });
  }
  // #endif
})
</script>

<style>
/* 整体页面样式 */
.profile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16rpx;
  background-color: #f5f5f5;
  height: 100vh;
  box-sizing: border-box;
}

/* 卡片公共样式 */
.card {
  width: 90%;
  margin: 16rpx 0;
  padding: 24rpx;
  background-color: #fff;
  border-radius: 16rpx;
  box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 用户信息卡片样式 */
.user-info-card {
  justify-content: center;
}

.avatar {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  margin-bottom: 16rpx;
}

.username {
  font-size: 32rpx;
  color: #333;
  font-weight: bold;
}

/* 预留业务逻辑卡片样式 */
.placeholder-card {
  justify-content: center;
}

.placeholder-text {
  font-size: 28rpx;
  color: #999;
}
</style>