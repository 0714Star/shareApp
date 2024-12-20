<template>

<!-- 	<swiper circular indicator-color="yellow" indicator-active-color="#007aff" :indicator-dots="true" :autoplay="false" :interval="3000" :duration="3000">
		<swiper-item >
			<view class="swiper-item"><image mode="aspectFill" src="../../static/Xidian_logo.png" alt="西电Logo" /></view>
		</swiper-item>
		<swiper-item>	
			<view class="swiper-item">b</view>
		</swiper-item>
	</swiper> -->
	
<!-- <uni-icons custom-prefix="icon-newYear" type="icon-newYearxiaoxi" size="300"></uni-icons> -->

</template>


<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
onMounted(()=>{
	wx.openAppAuthorizeSetting({
	  success (res) {
	    console.log(res)
	  }
	})
})


</script>

<style lang='scss'>
/* @import "@/static/icons/iconfont.css";   */
.scoll{
	white-space: nowrap;
	.box{
		display: inline-block;
		margin: 5px;
	}
}
.swiper-item{
}
</style>
