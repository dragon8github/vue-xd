/**
 * action 是一种专门供vue组件调用的函数库,它的职责是更新vuex中的state，但必须通过 mutations 函数来触发对 store 的更新。
 * 大部分情况下，它只负责进行异步操作，并且调用mutations函数来更新state。
 * 也许会有这个疑问，为什么不直接调用 vuex 中的 mutations ？而需要一个中间人 actions 来管理？
 * 这是由于 mutations 必须同步执行，而 actions 不受约束，所以我们可以在action中执行异步、后端操作
 */

import * as type from './mutation-types.js'

// 添加或者减少fetch请求数量
export const set_fetch_count = ({commit, state}, b) => {
	 commit(type.SET_FETCH_COUNT,b)
}

// 直接清空fetch的请求数量
export const set_fetch_zero = ({commit, state}) => {
   state.fetchCount = 0
}

// 设置translateX的值
export const set_translateX = ({commit, state}, v) => {
  state.translateX = v
}

// 设置translateY的值
export const set_translateY = ({commit, state}, v) => {
  state.translateY = v
}

// 转化rem
export const pxToRem = ({getters}, v) => {
  return v / getters.fontSize
}

// 转化绝对Px
export const pxToPx = ({getters}, v) => {
  return v * getters.dataDpr / 2
}