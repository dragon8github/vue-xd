<template>
  <div class="swiper-slide" :class="{'is-select' : $parent.index === title}" @click="handleClick">
    <!-- 李钊鸿修改了源码 -->
    <slot>{{ title  }}</slot>
  </div>
</template>

<script>
  export default {
    name: 'swiper-slide',
    // 李钊鸿修改了对外开放属性    
    props: {
      title: {
        type:String
      },
      clickMethod : Function
    },
    mounted() {
      this.update()
    },
    updated(){
      this.update()
    },
    attached(){
      this.update()
    },
    methods: {      
      update() {
        if (this.$parent && this.$parent.swiper && this.$parent.swiper.update) {
          this.$parent.swiper.update(true)
          if (this.$parent.options.loop) {
            this.$parent.swiper.reLoop()
          }
        }
      },
      handleClick () {
        this.clickMethod && this.clickMethod();
      }
    }
  }
</script>
