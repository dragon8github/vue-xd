<template>
	<header id="header" class="header-bar cs-header">
		<i class="icon-back" v-show="hasBack" @click="goBack"></i>
		<h1 v-if="isLoading"><img src="../images/Spinner.gif">{{ loadingText }}</h1>
    <h1 v-else>{{ headerTitle }}</h1>
    <div class="right-btn">
		  <slot name="expandHeader"></slot>
    </div>
	</header>
</template>

<script>
export default {
  props: {
  	headerTitle: {type: String, default :""},
  	hasBack: {type: Boolean }, 
    // 是否处于加载中
    isLoading: {type: Boolean, default: false},
    // 加载中时，header的提示文字
    loadingText: {type: String, default: "获取中..."}
	},
	methods: {
		goBack () {
      this.$router.push(this.$store.getters.siteMap)
    }
	}
}
</script>

<style lang="scss" scoped>
	@import "../sass/variables";
	@import "../sass/func";
  .cs-header {
    font-size:pxToRem(36px);
    color:#fff;
    
    h1 {
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        height:pxToRem(85px);
      }
    }
  }
  .icon-back {
          display:block;
          position: absolute;
          width: pxToRem(90px);
          height: 100%;
          top:50%;
          transform: translateY(-50%);
          background: url(../images/back.png) no-repeat;
          background-size: pxToRem(25px) pxToRem(40px);
          background-position: center;
   }
   .right-btn {
      position: absolute;
      top:50%;
      transform: translateY(-50%);
      right: 0;
      padding-right: pxToRem(25px);
   }
</style>