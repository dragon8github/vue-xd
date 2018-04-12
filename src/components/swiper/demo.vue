<template>
   <div id="app">
      <!-- <router-view :class="{view: true}" ></router-view> -->
      <swiper>
        <swiper-slide>
        <ul class="myslide">
          <li>Slide 2</li>
          <li>Slide 2</li>
          <li>Slide 2</li>
          <li>Slide 2</li>
        </ul>
        </swiper-slide>
        <swiper-slide>
          <ul class="myslide">
          <li>Slide 2</li>
          <li>Slide 2</li>
          <li>Slide 2</li>
          <li>Slide 2</li>
        </ul>
        </swiper-slide>
        <swiper-slide>
          <ul class="myslide">
          <li>Slide 2</li>
          <li>Slide 2</li>
          <li>Slide 2</li>
          <li>Slide 2</li>
        </ul>
        </swiper-slide>
      </swiper>
  </div>
</template>

<script>  
import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    name: 'app',
     components: {
    swiper,
    swiperSlide
  },
    created () {
      console.log(VueAwesomeSwiper)
    }
  }
</script>

<style lang="scss" scoped>
  @import "sass/variables";
  @import "sass/func";
  .view {
    width: pxToRem(750px);
    height: 100vh;
    margin: 0 auto;
    position: relative;
    transition: all .3s ease-in-out;
    box-sizing: border-box;
    background-color: $bg;
  }

  .myslide {
    display:flex;
    justify-content:space-around;

    li {
      font-size:pxToRem(35px);
      padding:pxToRem(20px);
    }
  }
</style>
