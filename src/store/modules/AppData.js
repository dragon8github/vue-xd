let state = {
    AppData: {
        "Ip": null,
        "SystemName": null,
        "Version": '2.0.0',
        "userId": '',
        'token': ''
    }
}

const getters = {
    AppData(state) {
        return state.AppData;
    }
}

const actions = {
    setAppData({ commit, state }, data) {
        state.AppData = data;
    }
}

export default {
    state,
    getters,
    actions
}