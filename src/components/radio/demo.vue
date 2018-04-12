<template>
   <div id="app">
      <!-- <router-view :class="{view: true}" ></router-view> -->
       <mt-radio
          style="display:flex;"
          class="page-part"
          v-model="value1"
          :options="options1" />

      <div class="page-radio">
        <mt-radio
          class="page-part"
          title="单选框列表"
          v-model="value1"
          :options="options1" />
        <div>
          <mt-cell title="选中的项">{{ value1 }}</mt-cell>
        </div>

        <mt-radio
          class="page-part"
          title="第二个单选框列表"
          v-model="value2"
          :options="options2" />
        <div>
          <mt-cell title="选中的项">{{ value2 }}</mt-cell>
        </div>

        <mt-radio
          align="right"
          class="page-part"
          title="右对齐"
          v-model="value3"
          :options="options3" />
      </div>
  </div>
</template>
<script>  
import mtRadio from 'components/radio/radio.vue'
import mtCell from 'components/cell/cell.vue'
  export default {
    name: 'app',
    data() {
      return {
        value1: '',
        value2: '值A',
        value3: ''
      };
    },
    components: {
      mtRadio,
      mtCell
    },
    created() {
       this.options1 = ['选项A', '选项B', '选项C'];
        this.options3 = ['选项A', '选项B', '选项C'];
        this.options2 = [
          {
            label: '被禁用',
            value: '值F',
            disabled: true
          },
          {
            label: '选项A',
            value: '值A'
          },
          {
            label: '选项B',
            value: '值B'
          }
        ];
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
 
   .page-radio .page-part {
    margin-top: 40px;
  }
</style>
