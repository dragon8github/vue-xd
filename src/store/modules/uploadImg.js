import fetch from './../../fetch/api.js'
import * as types from '../mutation-types'

let state = {
    uploadInfo: {
		Count: null,       
		docType: null,    
		businessId: null, 
		docName: null
    }
}

const getters = {
  uploadInfo (state) {
    return state.uploadInfo;
  }
}

const actions = {
  setUploadInfo ({ commit, state, getters }, data) {
	state.uploadInfo = data;
  }
}


export default {
  state,
  getters,
  actions
}
