<template>
  <div class="mint-tabbar" :class="{
      'is-fixed': fixed
    }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'mt-tabbar',
  props: {
    fixed: Boolean,
    value: {}
  }
};
</script>

<style lang="scss" scoped>
.mint-tabbar {
   background-image:linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
   background-size: 100% 1px;
   background-repeat: no-repeat;
   background-position: top left;
   position: relative;
   background-color: #fff;
   display: flex;
   position: absolute;
   right:0;
   bottom: 0;
   left: 0;
   text-align: center;
   color:#333;

   .is-fixed {
      position: fixed;
      right:0;
      bottom: 0;
      left: 0;
      z-index: 1;
   }

   & > .mint-tab-item.is-selected {
     color: #2DA5FF;
   }
}
</style>
