<template>
  <div id="app">
      <!-- <router-view :class="{view: true}" ></router-view> -->
        <cellswipe
          v-for="n in 10"
          :right="rightButtons"
          title="swipe me">
        </cellswipe>
  </div>
</template>

<script>
import cellswipe from 'components/cellswipe/cellswipe.vue'
  export default {
    name: 'app',
    components: {
      cellswipe
    },
    created () {
       this.rightButtons = [
        {
          content: 'Mark as Unread',
          style: { background: 'lightgray', color: '#fff' }
        },
        {
          content: 'Delete',
          style: { background: 'red', color: '#fff' },
          handler: () => window.alert('delete')
        }
      ];
    },
    methods: {
      leftButtonHandler(evt) {
        console.log(123);
      }
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
</style>
