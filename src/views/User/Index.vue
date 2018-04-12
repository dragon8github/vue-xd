<template>
<div class="page">
    <cs-header :header-title="appTitle"></cs-header>
    <div class="content">
        <ul class="listcont">
            <li v-on:click="goDetail('/user/userInfo');">
                <div>个人信息</div>
                <div><i class="icon-arrow"></i></div>
            </li>
            <li v-on:click="goDetail('/user/password');">
                <div>管理密码</div>
                <div><i class="icon-arrow"></i></div>
            </li>
            <li v-on:click="goDetail('/user/about');">
                <div>关于</div>
                <div><i class="icon-arrow"></i></div>
            </li> 
        </ul>
        <div class='exeit' @click="logout">退出登录</div>
    </div>
    <cs-footer></cs-footer>
</div>

 
</template>

<script>
import csHeader from 'mycomponents/Header.vue'
import csFooter from 'mycomponents/Footer.vue'
import messagebox from 'components/messagebox/messagebox'

export default {
  name: "user",
  data  () {
    return {
      appTitle: '信贷中心管理系统'
    }
  },
  components: {
    csHeader,
    csFooter
  },
  methods: {
    goDetail: function (url) {
      this.$router.push(url)
    },
    logout () {
      // 退出登录
      this.api.User.Account_Logout().then(data => {
          // 调用注销插件
          this.Bridge.exec('LoginOut', (response) => {
             
          }, (err) => {
             
          }, {})
      })
    },
    ChangeGestruePassword () {
      // 调用注销插件
      this.Bridge.exec('ChangeGestruePassword', (response) => {
         
      }, (err) => {
         
      }, {})
    },
    ChangeTouchPassword () {
      // 调用注销插件
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
    font-size:pxToRem(34px); 
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
