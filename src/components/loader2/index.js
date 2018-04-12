import Vue from 'vue'

// 生成组件对象
const LoaderConstructor = Vue.extend(require('./loader.vue'))

let timer = null

// 添加实例方法：show
LoaderConstructor.prototype.show = function () {
  this.visible = true
  /* 李钊鸿加入的代码，0.3秒之后关闭遮罩层 */
  let self = this;
  timer = window.setTimeout( _ => {
    self.openShadow = false;
  }, 300)
 
}

// 添加实例方法：hide
LoaderConstructor.prototype.hide = function () {
   /* 李钊鸿加入的代码，当关闭遮罩层之后，顺便清空timer和重置遮罩层 */
  window.clearTimeout(timer);
  this.openShadow = true;
  this.visible = false
  returnAnInstance(this)
}

// 缓存
let loaderPool = []

// 单例模式：返回组件的实例对象或已缓存好的实例对象
let getAnInstance = () => {
  if (loaderPool.length > 0) {
    let instance = loaderPool[0]
    loaderPool.splice(0, 1)
    return instance
  }
  return new LoaderConstructor({
    el: document.createElement('div')
  })
}

// 添加缓存
let returnAnInstance = instance => {
  if (instance) {
    loaderPool.push(instance)
  }
}

// 返回对象
let Loader = ((options = {}) => {
  let instance = getAnInstance()
  document.body.appendChild(instance.$el)
  return instance
})();

export default Loader
