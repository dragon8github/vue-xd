//出款详情数据
let state = {
    LentOutDetailData: null
}

const getters = {
    LentOutDetailData(state) {
        return state.LentOutDetailData;
    }
}

const actions = {
    setLenOutDatailData({ commit, state }, data) {
        state.LentOutDetailData = data;
    }
}

export default {
    state,
    getters,
    actions
}