import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations.js'
import * as actions from './actions'
import * as getters from './getters'
import * as state from './state.js'
import user from './modules/user'
import AppData from './modules/AppData'
import drawMap from './modules/drawMap'
import siteMap from './modules/siteMap'
import LentOutDetailData from './modules/LentOutDetailData'
import requestTimer from './modules/requestTimer'
import uploadImg from './modules/uploadImg'
import transition from './modules/transition'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        user,
        AppData,
        drawMap,
        siteMap,
        requestTimer,
        LentOutDetailData,
        uploadImg,
        transition: {
            namespaced: true,
            ...transition
        }
    },
    state,
    getters,
    actions,
    mutations
})

export default store