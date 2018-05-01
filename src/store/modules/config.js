import * as types from '../types'

let state = {
  bgWidth: 1920, // 背景尺寸
  bgHeight: 1080,
  width: 0,      // 根据背景尺寸计算后的body尺寸
  height: 0,
  ratio: 1
}

let mutations = {
  [types.CONFIG_INIT](state, size) {
    size = size || {}
    state.bgWidth = size.bgWidth || 1920 
    state.bgHeight = size.bgHeight || 1080
    let innerWidth = window.innerWidth
    let innerHeight = window.innerHeight
    state.width = innerWidth
    state.ratio = Math.ceil(100 * state.bgWidth / state.width) / 100;
    state.height = state.bgHeight / state.ratio
  }
}

const actions = {
}

export default {
  state,
  mutations,
  actions
}
