// 请求API地址
import * as Constants from './constants'
// Toast 组件
import Toast from 'components/toast/index.js'
// messagebox 组件
import msg from 'components/messagebox/messagebox.js'
// loader 组件
import Loader from 'components/loader/index.js'
// 状态管理工具vuex
import store from '../store/index.js';
// Fetch兼容插件
import 'whatwg-fetch'
// 源生交互桥梁
import Bridge from './../bridge'
let bridge = Bridge.Bridge

/**
 * helper methods
 * 解密函数
 */
let decodeFunc = data => {
    // 使用async 和 await 必须配合使用Promise
    return new Promise((resolve, reject) => {
        bridge.exec('Decode', response => {
            resolve(response)
        }, err => {
            reject(err)
        }, data)
    });
}

/**
 * helper methods
 * 加密函数
 */
let EncodeFunc = data => {
    // 使用async 和 await 必须配合使用Promise
    return new Promise((resolve, reject) => {
        bridge.exec('Encode', response => {
            resolve(response)
        }, err => {
            reject(err)
        }, data)
    });
}

/**
 * helper methods
 * 验证状态码
 */
const checkStatus = async(response) => {
    // 请求数量--
    store.dispatch('set_fetch_count', '-');
    console.log('进入状态监测逻辑')

    // 判断请求状态
    if (response.status >= 200 && response.status < 300) {
        console.log('状态正常,下面开始打印数据')
        var json = response.json()
        json.then(_=>{ console.log(_) })
        // 返回Promise，注意，这里不能连续使用两次.json()，不然会报错
        // 这里也不能直接console.log(.json())，是打印不出的,只能这样打印
        return json
    } else {
      // 服务器响应异常
      Toast('网络异常!')
      var error = new Error(response.statusText)
      error.response = response
      throw error
    }
}

/**
 * helper methods
 * 检查是否需要解密
 */
const checkDecode = async(json) => {
    // 生产环境下，需要对数据进行解密 && false
    // 注意点：这里通过await返回的_json，其实是一个普通的Object。可以通过window.alert(JSON.stringify(_json))进行测试
    // 但由于Promise的特性，当我在函数中return出去之后。外部接受到的实际上是一个Promose对象
    // 调用者必须通过使用.then(data=>{}).catch(err=>{})来操作Promose
    if (process.env.NODE_ENV === 'production') { 
        json = await decodeFunc(json) 
    }

    return json
}

/**
 * helper methods
 * 检查是否重复登录
 */
const checkRepLog = json => {

    // 如果请求数量已经为0，那么关闭loader.并且重置fetchCount
    if (store.state.fetchCount <= 0) {
        // 重置fetchCount
        store.dispatch('set_fetch_zero')
        // 关闭loader
        Loader.hide()
    }

    // 如果状态码为4的话，说明账号被人抢占了。要求对方重新登录！
    if (json.ReturnCode == 4) {
         msg.alert('登录状态失效，请退出后重新登录账号！', '警告').then(() => {
             // 退出登录并且回到登录页API
             bridge.exec('LoginOut', (response) => {
                 // code...
             }, (err) => {
                 // code...
             }, {})
         });
    }

    return json
}

/**
 * helper methods
 * 抛出响应异常
 */
const throwError = (err) => {
    // 请求数量--
    store.dispatch('set_fetch_count', '-')

    // 如果请求数量已经为0，那么关闭loader。并且仅弹出一次错误提示.并且重置fetchCount
    if (store.state.fetchCount <= 0) {
        // 重置fetchCount
        store.dispatch('set_fetch_zero')
        // 关闭loader
        Loader.hide()
        // 弹出异常提示
        Toast('网络异常!!')
    }

    // 弹出错误供调试
    throw new Error(err.message)
}


/**
 * core methods
 * 发送请求
 * isQuiet 为 treu 时表示偷偷的运行，不显示loading图.某些业务需要偷偷进行的
 */
const handleFetch = async(url, params, isQuiet = false) => {
    // 默认配置
    let option = { headers: {"Content-Type": "application/json", "source": window.location.href || ""} }

    // 合并对象，拼接默认配置，如果有属性冲突的情况，后面的参数会替换前面的重复参数;也就是参数越往后，权限越大。
    // 并且第一个参数会变成合并后的值。所以一定要小心使用Object.assign
    option = Object.assign(params, option)


    // 合并对象，拼接AppData数据.如果有属性冲突的情况，后面的参数会替换前面的重复参数;也就是参数越往后，权限越大。
    // 并且第一个参数会变成合并后的值。所以一定要小心使用Object.assign
    let body = Object.assign(option.body, store.getters.AppData)


    // 拼接服务器地址(目前项目中url都为空)
    url = Constants.API_SERVER + url

    // 真机环境下执行加密函数.请注意，传入的body必须是object对象  && false
    if (process.env.NODE_ENV === 'production') {
        body = await EncodeFunc(body)
    }

    // fetch请求必备的body参数字符串化 
    option.body = JSON.stringify(body)

    // 请求数量++   
    store.dispatch('set_fetch_count', '+')

    // 是否偷偷运行？ 默认开启了loading，并且启动了超时限制。如果isQuiet为true时，不启动loading
    if (!isQuiet) {
        // 开始倒计时
        store.dispatch('startTimer')
        // 打开蒙版loading
        Loader.show('加载中...')
    }

    // 开发环境使用代理地址请求数据
    if (process.env.NODE_ENV === 'development')  url = '/api/'


    // 一切准备就绪，开始HTTP请求.请注意返回的是Promise对象.调用者必须通过使用.then(data=>{}).catch(err=>{})来操作Promose
    return window.fetch(url, option).then(checkStatus).then(checkDecode).then(checkRepLog).catch(throwError);
}

/**
 * core methods
 * 发送post请求
 * 如果isQuiet 为 true 的话，则不开启loading。悄悄偷偷摸摸在后台运行
 */
const postData = (url, params, isQuiet = false) => {
    return handleFetch(url, {method: 'POST', body: params }, isQuiet)
}

/**
 * core methods
 * 发送get请求
 */
const getData = (url) => {
    return handleFetch(url, {method: 'GET'})
}

export default {
    postData,
    getData
}