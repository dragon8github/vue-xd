<template>
  <div class="swiper-container">
    <slot name="parallax-bg"></slot>
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
    <slot name="pagination"></slot>
    <slot name="button-prev"></slot>
    <slot name="button-next"></slot>
    <slot name="scrollbar"></slot>
  </div>
</template>

<script>
  var browser = typeof window !== 'undefined'
  if (browser) {
    window.Swiper = require('swiper')
    require('swiper/dist/css/swiper.css')
  }
  export default {
    name: 'swiper',
    props: {
      // 李钊鸿修改的源码
      index: {
        type:String
      },
      options: {
        type: Object,
        default() {
          return {
            autoplay: 3500
          }
        }
      }
    },
    mounted() {
      var self = this
      var mount = function () {
        if (!self.swiper && browser) {
          delete self.options.notNextTick
          self.swiper = new Swiper(self.$el, self.options)      
        }
      }     
      this.options.notNextTick ? mount() : this.$nextTick(mount)
    },
    updated(){
      if (this.swiper) {
        this.swiper.update()
      }
    },
    beforeDestroy() {
      if (this.swiper) {
        this.swiper.destroy()
        delete this.swiper
      }
    }
  }
</script>
