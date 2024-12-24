<script>
	import store from '@/store'
	export default {
		onLaunch: function() {
			console.log("小程序启动中...");
			store.dispatch("userModule/checkState")
			  .then(() => {
			    console.log("登录状态检测完成");
			  })
			  .catch((error) => {
			    console.error("登录状态检测失败：", error);
			  });
		},
		onShow: function() {
			store.dispatch("userModule/checkState")
			  .then(() => {
			    console.log("登录状态检测完成");
			  })
			  .catch((error) => {
			    console.error("登录状态检测失败：", error);
			  });
		},
		onHide: function() {
			store.dispatch("userModule/checkState")
			  .then(() => {
			    console.log("登录状态检测完成");
			  })
			  .catch((error) => {
			    console.error("登录状态检测失败：", error);
			  });
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
