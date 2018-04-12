<template>
   <div id="app">
      <!-- <router-view :class="{view: true}" ></router-view> -->
      <picker
        ref="picker2"
        type="date"
        v-model="value2"
        @confirm="handleChange">
      </picker>
  </div>
</template>

<script>  
import picker from 'components/datetimepicker/datetimepicker.vue';
  export default {
    name: 'app',
    data () {
      return {
        value2:null
      }
    },
    components: {
      picker 
    },
    methods: {
      handleChange (v) {
        window.alert(v);
      }
    },
    mounted () {
      console.log(this.$refs['picker2'].open())
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
