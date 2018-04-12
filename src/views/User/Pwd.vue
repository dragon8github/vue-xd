<template>
<div class="page">
    <cs-header :header-title="appTitle" :has-back='true'></cs-header>
    <div class="content">
        <ul class="listcont">
            <li v-on:click="goDetail('/user/Password/LogPwd');">
                <div>修改登录密码</div>
                <div><i class="icon-arrow"></i></div>
            </li>
             <li v-on:click="ChangeGestruePassword">
                <div>修改手势密码</div>
                <div><i class="icon-arrow"></i></div>
            </li>
             <li v-on:click="ChangeTouchPassword" v-if="isIOS">
                <div>修改指纹密码</div>
                <div><i class="icon-arrow"></i></div>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
import csHeader from 'mycomponents/Header.vue'
export default {
  data  () {
    return {
      appTitle: '信贷中心管理系统'
    }
  },
  components: {
    csHeader
  },
  computed: {
    // 判断是否ios系统
    isIOS () {
        return window.navigator.userAgent.match(/(iPad|iPhone)/)
    }
  },
  methods: {
    goDetail: function (url) {
      this.$router.push(url)
    },
    ChangeGestruePassword () {
      // 调用手势插件
      this.Bridge.exec('ChangeGestruePassword', (response) => {
         
      }, (err) => {
         
      }, {})
    },
    ChangeTouchPassword () {
      // 调用指纹插件
      this.Bridge.exec('ChangeTouchPassword', (response) => {
         
      }, (err) => {
         
      }, {})
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "./../../sass/variables";
  @import "./../../sass/func"; 
 .listcont {
        width: 100%;
        background-color: #fff;
        font-size:pxToRem(36px);
        color: #000;
        margin-top: pxToRem(20px);
        position:relative;
        
        &:before {
            @include border('top', #d9d9d9);
        }
        
    li {
       width: 100%;
       height: pxToRem(100px);
       line-height: pxToRem(100px);
       position:relative;
       text-indent: pxToRem(40px);

       .itemicon {
         width: pxToRem(42px);
         height: pxToRem(42px);
         display: inline-block;
         background-size: cover;
         margin-left: pxToRem(40px);
         margin-top: pxToRem(40px);
       }
       .icon-arrow {
         width: pxToRem(20px);
         height: pxToRem(34px);
         margin-right: pxToRem(40px);
         display: inline-block;
         background-image: url('./../../images/icon_arrow.png');
         background-size: cover;
       }
       &:after {
           @include border('bottom', #d9d9d9);
           left:pxToRem(30px);
       }
    }
     
 }
 .exeit {
    margin-top: pxToRem(40px);
    width: 100%;
    height: pxToRem(100px);
    line-height: pxToRem(100px);
    text-align: center;
    @include pxToPx(font-size, 34);
    background-color: #fff;
    position:relative;
    
    &:after {
        @include border('bottom', #d9d9d9);
    }
    
    &:before {
        @include border('top', #d9d9d9);
    }
 }
 
</style>
