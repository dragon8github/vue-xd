<template>
   <div id="app">
      <!-- <router-view :class="{view: true}" ></router-view> -->
       <div class="page-button">
        <div class="page-button-group">
          <mt-button size="large">default</mt-button>
          <mt-button size="large" type="primary">primary</mt-button>
          <mt-button size="large" type="danger">danger</mt-button>
        </div>

        <div class="page-button-group">
          <mt-button>default</mt-button>
          <mt-button type="primary">primary</mt-button>
          <mt-button type="danger">danger</mt-button>
        </div>

        <div class="page-button-group">
          <mt-button size="small">default</mt-button>
          <mt-button size="small" type="primary">primary</mt-button>
          <mt-button size="small" type="danger">danger</mt-button>
        </div>

        <div class="page-button-group">
          <mt-button disabled size="large">default</mt-button>
          <mt-button disabled size="large" type="primary">primary</mt-button>
          <mt-button disabled size="large" type="danger">danger</mt-button>
        </div>

        <div class="page-button-group">
          <mt-button plain size="large">default</mt-button>
          <mt-button plain size="large" type="primary">primary</mt-button>
          <mt-button plain size="large" type="danger">danger</mt-button>
        </div>
     </div>
  </div>
</template>
<script>  
import mtButton from 'components/button/button.vue';
  export default {
    name: 'app',
    components: {
      mtButton
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

  .page-button {
     padding: 0 pxToRem(15px) pxToRem(15px * 2);

      .page-button-group {
        margin-bottom: pxToRem(15px * 2);

        & > * {
          margin-bottom: pxToRem(15px * 2);
        }
      }
  }

 
</style>
