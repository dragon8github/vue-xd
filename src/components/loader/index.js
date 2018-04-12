import Vue from 'vue';

const Indicator = Vue.extend(require('./loader.vue'));
let instance;

export default {
  show(options = {}) {
    if (!instance) {
      instance = new Indicator({
        el: document.createElement('div')
      });
    }
    if (instance.visible) return;
    instance.text = typeof options === 'string' ? options : options.text || '';
    instance.spinnerType = options.spinnerType || 'snake';
    document.body.appendChild(instance.$el);
    
    Vue.nextTick(() => {
      instance.visible = true;
    });
  },

  hide() {
    if (instance) {
      instance.visible = false;
    }
  }
};