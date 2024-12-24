import SockJS from 'sockjs-client';// 小程序不支持
import Stomp from 'stompjs'; 

import axios from 'axios'
import {iSession,iState} from '@/utils/api/interface'
// 分模块导入
import wsModule from './modules/stomp-websocket'
import userModule from './modules/userModule.js'
// #ifndef VUE3
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
// #endif

// #ifdef VUE3
import { createStore } from 'vuex'
const store = createStore({
// #endif
	modules:{
		wsModule,
		userModule
	}
})

/**
 * 监听state.sessions, 
 */
export default store