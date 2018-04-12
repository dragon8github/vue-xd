<template>
	<footer class="cs-footer">
   <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="/home">
        <i class="footer-icon home" :class="{active: selected === '/home'}"></i>
        首页
      </mt-tab-item>

      <mt-tab-item id="/myBusiness">
        <i class="footer-icon myBusiness" :class="{active: selected.includes('myBusiness')}"></i>
        我的业务
      </mt-tab-item>

      <mt-tab-item id="/user">
        <i class="footer-icon user" :class="{active: selected.includes('user')}"></i>
        我
      </mt-tab-item>
    </mt-tabbar>
	</footer>
</template>

<script>

import mtTabbar from 'components/tabbar/tabbar.vue';

import mtTabItem from 'components/tabItem/tabItem.vue';

export default {
  data () {
    return {
      selected: ''
    }
  },
	components: {
		mtTabbar,
		mtTabItem
	},
  watch: {
    selected (curVal) {
      // 设置当前激活项
      this.selected = curVal
       // 跳转页面
      this.$router.push(curVal)
    }
  },
  beforeMount () {
    this.selected = this.$route.path
  },
  // 兼容keep-alive的页面
  activated () {
    this.selected = this.$route.path
  }
}
</script>

<style lang="scss" scoped>
	@import "../sass/variables";
	@import "../sass/func";
	.cs-footer{
		position: fixed;
		left:0;
		right:0;
		bottom:0px;
		background-color:#fff;		
		@include pxToPx(font-size,30);
		color:#444444;
		text-align: center;
		height:pxToRem($footer-height);
		line-height: pxToRem($footer-height);
		ul {
			position: relative;
			width:100%;
			height:100%;
			display:flex;
			border-top:1px solid $border-color;
		}
		.footer-tab {
			width:33.33%;
			border-right:1px solid $border-color;
		}
	}

  .footer-icon {
    display:block;
    background-size: contain;
    width:pxToRem(50px);
    height:pxToRem(50px);
    background-position: center;
    margin: auto;
    padding-bottom:pxToRem(10px); 
    background-repeat: no-repeat;

    &.home {
      background-image: url('../images/home/tab1.png');

      &.active {
        background-image: url('../images/home/tab1-active.png');
      }
    }


   &.myBusiness {
      background-image: url('../images/home/tab2.png');

      &.active {
        background-image: url('../images/home/tab2-active.png');
      }
    }

    &.user {
      background-image: url('../images/home/tab3.png');

      &.active {
        background-image: url('../images/home/tab3-active.png');
      }
    }
  }

</style>