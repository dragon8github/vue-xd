<template>
  <div v-show="visible" :class="openShadow ? 'shadow' : ''">
    <div class="loader-wrapper" >
        <spinner :show="true"></spinner>
    </div>
  </div>
</template>

<script>
  import Spinner from '../spinner/spinner.vue'
  export default {
    components: {
      Spinner
    },
    data () {
      return {
        visible: false,
        openShadow: true
      }
    }
  }
</script>

<style lang="scss" scoped>
@import "./../../sass/variables.scss";
@import "./../../sass/func.scss";
  .loader-wrapper {
      $length: 90px;
      position: fixed;
      width: pxToRem($length);
      height: pxToRem($length);
      left: 50%;
      top: 50%;
      margin-left: - pxToRem($length) / 2;
      margin-top:  - pxToRem($length) / 2;
      border-radius: pxToRem(10px);
      background: rgba(0, 0, 0, .7);
      color: #fff;
      box-sizing: border-box;
      text-align: center;
      z-index: 1000;
      padding: pxToRem(20px);
  }
  .shadow {
    position:absolute;
    z-index: 19930710;
    top:0;
    left:0;
    right:0;
    bottom: 0;
  }
</style>
