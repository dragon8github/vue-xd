import fetch from './../../fetch/api.js'
import * as types from '../mutation-types'

let state = {
    userinfo: {
        UserId:'',
        UserName:'',
        DeptName:'',
        EmailAddr:'',
        PhoneNumber:'',
        AvatarPath:'',
        MyQrCodeUrl:'',
        MyBigQrCodeUrl:''
    }
}

const getters = {
  userinfo (state) {
    return state.userinfo;
  }
}

const actions = {
  setUserinfo ({ commit }, cb) {
    fetch.api.User.User_GetUserInfo().then((Result) => {
        commit(types.SET_USER_INFO, Result.Data)
        cb && cb(Result.Data)
    })
  }
}

const mutations = {
  [types.SET_USER_INFO] (state, userinfo) {
     state.userinfo = userinfo
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
