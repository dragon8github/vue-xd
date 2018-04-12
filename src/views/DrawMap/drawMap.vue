<template>
   <div id="drawMap">
      <cs-header :header-title="title" :has-back="true"></cs-header> 
      <swiper :options="swiperOption" ref="swiperRef" class="drawMapswiper">
           
         <!--  <swiper-slide style="background:url(http://cdn.gousa.cn/sites/default/files/styles/original_with_watermark/public/kennedy_meadows_0.jpg) no-repeat;background-size:100% 100%"></swiper-slide> -->
         
          <swiper-slide v-for="(item, index) in drawMap.list" :key="index"  :style="`background:url(${item}) no-repeat;background-size:100% 100%`"></swiper-slide>
          <div class="swiper-pagination swiper-pagination-white" slot="pagination"></div>
          <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
          <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
        </swiper>
  </div>
</template>



<script>  
import csHeader from 'mycomponents/Header.vue'
import { swiper, swiperSlide } from 'components/swiper'
export default {
  name: 'drawMap',
   components: {
      swiper,
      swiperSlide,
      csHeader
  },  
  data () {
    return {
      swiperOption: {
          pagination: '.swiper-pagination',
          paginationClickable: true,
          nextButton: '.swiper-button-next',
          prevButton: '.swiper-button-prev',
          spaceBetween: 30,
          effect: 'coverflow',
          onTransitionStart: function (swiper) {
            this.drawMap.index = swiper.activeIndex
          }.bind(this)
      },
      drawMap: {
        title: "",
        list: [],
        index: 0,
      },
      subTitle: ''
    } 
  },
  computed:{
    title () {
      return `${this.subStr(this.drawMap.title, 20)} (${this.drawMap.index + 1} / ${this.drawMap.list.length})`;
    }
  },
  beforeMount () {
    this.drawMap = this.$store.getters.drawMap
    setTimeout(() => {
       this.$refs.swiperRef.swiper.slideTo(this.drawMap.index, 1000, false)
    }, 1)
  }
}
</script>

<style lang="scss" scoped>
  @import "./../../sass/variables";
  @import "./../../sass/func";
  #drawMap {
    padding-top: pxToRem(86px);
    background: #000;
  }
  .swiper-inner {
    width: 100%;
    height: 100%;
  }
  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 100%;
    height: pxToRem(800px);
  }
  .swiper-container {
    top: 50%;
    transform: translateY(-50%);
  }
</style>
