let state = {
    drawMap: {
      title: "",
      list: [],
      index: 0
    }
}

const getters = {
  drawMap (state) {
    return state.drawMap
  }
}

const actions = {
  setDrawMap ({ commit, state }, Result) {
    state.drawMap = Result
  }
}


export default {
  state,
  getters,
  actions
}
