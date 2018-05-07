import Vue from 'vue'
import store from './store'
import router from './router'
import { sync } from 'vuex-router-sync'
import App from './App.vue'
import Filters from './functions/filters'
import Fastclick from 'fastclick'
import api from './fetch/api'
import VueLocalStorage from 'vue-localstorage'
import Bridge from './bridge'

// 加载公共css
require('./sass/common.scss')
// 加载全局过滤库
Vue.use(Filters)
// 加载自定义插件
Vue.use(api)
// 加载自定义插件-jsbridge  
Vue.use(Bridge) // 使用方式：let bridge = this.Bridge  或者 let bridge = Bridge.Bridge;  // 注意这里的Bridge 是 import Bridge from './bridge'
// 加载第三方插件LocalStorage
Vue.use(VueLocalStorage)
// 加载第三方【快速点击】插件
Fastclick.attach(document.body)
// 融合 router 和 vuex，这样在 vuex的 state 中就可以获取 route 并且动态改变路由
sync(store, router)
// 加载自定义过滤器
Object.keys(Filters.filters).forEach(key => {
	Vue.filter(key, Filters.filters[key])
})

// vue初始化
let initial = () => {
	// 添加宏让全局函数库注入Vue之中
	Vue.mixin({
		methods: Filters.filters
	})

	// 实例化Vue
	window.$vue = new Vue({
		router,
		store,
		...App,
	}).$mount('#app')
}

// 生产环境下，使用源生与bridge进行交互
if(process.env.NODE_ENV === 'production') {
	// 核心API对象：bridge
	let bridge = Bridge.Bridge
	// bridge 的初始化完成事件.必须在此事件之后再开始页面的生命周期，否则期间使用bridge 很可能由于未初始化完成而找不到插件函数报错
	bridge.deviceReady(null, () => {
		// 获取设备信息API
		bridge.exec('GetSharePreference', (AppData) => {
			// 打印出消息测试接口是否正常
			console.log('获取登录后信信息成功:' + JSON.stringify(AppData))
			// 将AppData放入store中
			store.dispatch('setAppData', AppData)
			// 清空首页缓存
			window.localStorage.removeItem('HomeData')
			// vue初始化
			initial()
		}, (err) => {
			console.log('获取登录后信信息失败:' + err)
		}, {
			'key': 'APP_DATA'
		})
	}, () => {
		console.log('离开或关闭webview页面');
	})

	// 监听推送消息,请注意，这里的监听不能放在deviceReady里面。不要问为什么
	bridge.registEvent('pushMsgCallback', (data) => {
		try {
			let json = JSON.parse(data)
			if(json.Url) {
				router.push(json.Url)
			} else {
				router.push("/message")
			}
		} catch(err) {
			window.alert("发现错误::" + err.message)
			window.alert("错误详情::" + err.description)
		}
	})
	
	// 监听上传图片的信息，其实这里是不得不这样做。因为在组件中使用监听时，不知道为什么移动端拿到的回调函数是undefined
	// 之所以在组件中无法使用，就像上面说的“这里的监听不能放在deviceReady里面。不要问为什么”一样的道理
	bridge.registEvent('UploadImgCallBack', (data) => {
		try {
			let json = typeof(data) === 'object' ? data : JSON.parse(data);
			store.dispatch('setUploadInfo', json) 
		} catch(err) {
			window.fundebug.notifyError(err);
		}
	})
	
} else {
	// 开发环境，使用代理地址获取用户信息
	window.fetch('http://192.168.12.193:3000', {
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify({userName: 'admin'}),
		method: 'POST'
	}).then(data => {
		return data.json()
	}).then(json => {
		// 初始化用户信息
		store.dispatch('setAppData', json.appData);
		// 初始化Vue
		initial();
	})
}