import axios from 'axios';
import store from '@/store'
// 动态设置 IP，根据平台使用不同的 URL
const ip = 'http://192.168.123.203:24123'; // 可根据需求动态切换
axios.defaults.baseURL = ip;

// 设置默认的请求头
axios.defaults.headers.common['Content-Type'] = 'application/json';

// 创建 axios 实例
const instance = axios.create({
  baseURL: "http://192.168.123.203:24123",
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 获取本地存储的 token
    const user = uni.getStorageSync('user-info')|| {};
    if (user) {
      config.headers['token'] = user?.token; // 将 token 添加到请求头
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
	  console.log("resp! ")
    // 返回响应数据
	if(response.data.code == "200")
    return response.data;
	else if(response.data.code == "401"){
		// store.dispatch("userModule/autoLogin"); // 自动登录
	}
  },
  (error) => {
	  console.log("error! ")
    // 错误处理
    if (error.response) {
      switch (error.response.code) {
        case "401":
          // 认证失败，跳转到登录页面
          uni.navigateTo({
            url: '/pages/profile/wxLogin/wxLogin',
          });
          break;
        case "500":
          // 服务器错误
          uni.showToast({
            title: '服务器错误，请稍后重试',
            icon: 'none',
          });
          break;
        default:
          uni.showToast({
            title: error.response.data.message || '请求失败',
            icon: 'none',
          });
          break;
      }
    }
    return Promise.reject(error);
  }
);

// 自定义适配器，替换默认请求逻辑
instance.defaults.adapter = function (config) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: config.baseURL + config.url, // 拼接完整的 URL
      method: config.method || 'GET', // 默认为 GET 请求
	  params:config.params,
      data: config.data,
      header: config.headers || {}, // 确保 header 是对象
      success: (res) => {
        resolve({
          data: res.data,
          status: res.statusCode,
          headers: res.header,
          config: config,
        });
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
};

export default instance;
