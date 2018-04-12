import Vue from 'vue'
import Common from './Common'
import User from './User'
import MyBusiness from './MyBusiness'
import Notice from './Notice'
import Notification from './Notification'
import HouseBusiness from './HouseBusiness'
import CarBusiness from './CarBusiness'
import Ledger from './Ledger'
import ThirdRepayment from './ThirdRepayment'
import Qrcode from './Qrcode'

// api总入口
let api = {
    // 公共接口
    Common,
    // 用户接口
    User,
    // 我的业务接口    
    MyBusiness,
    // 通知接口
    Notice,
    // 推送消息接口
    Notification,
    // 房速贷接口
    HouseBusiness,
    // 车易贷接口
    CarBusiness,
    // 台账 
    Ledger,
    // 第三方代扣
    ThirdRepayment,
    // 扫码接口
    Qrcode
}

/**
 * 支持两种使用形式：
 * 1、Vue 插件化
 * 2、直接import使用,主要是兼容无法使用Vue实例的场景
 */
export default {
  api,
  install (Vue) {
	  Vue.prototype.api = api
  }  
}
