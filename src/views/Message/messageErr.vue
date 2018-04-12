<template>
	<div id="messageErr">
		<cs-header :header-title="'消息中心'" :has-back="true"></cs-header> 
        <div class="header">
            <div class="header__title">部分扣款失败提示<a class="header__title--link" @click="go">（TDF1032017112102）</a></div>
            <div class="header__timer">2018-03-07  08:00</div>
        </div> 
        <div class="line"></div>
        <div class="text">
            部分扣款失败，具体内容如下：
            <p class="text__main">
                尊敬的***先生/女士，您的客户张三，于2017年3月11日借入的35万借款第_期还款部分扣款失败,失败原因【可用余额不足，请联系发卡银行】，请及时联系客户，避免造成逾期。
            </p>
        </div>
	</div>
</template>

<script>
import csHeader from 'mycomponents/Header.vue'

export default {

  name: 'messageErr',
	components: {
	  csHeader
	},
  data () {
    return {
    	myData : null
    };
  },
  methods: {
    go (id) {
        id && this.$router.push();
    }
  },
  beforeMount () {
  	
  }
};
</script>

<style lang="scss" scoped>
@import "~@sass/_variables";
@import "~@sass/_func";
#messageErr {
    background-color: #fff;

    .header {
        height: pxToRem(130px);
        line-height: pxToRem(40px);
        padding: pxToRem(30px) pxToRem(55px);
        box-sizing: border-box;
        margin-top: pxToRem($header-height);
        background: #fff;
    }

        .header__title {
            color: #000000;
            font-size: pxToRem(28px);
        }

            .header__title--link {
                color: #2da5ff;
            }

        .header__timer {
            color: #999999;
            font-size: pxToRem(24px);
        }

    .line {
        margin: 0 pxToRem(30px);
        background-color: #c8c7cc;
        height: pxToRem(1px);
    }

    .text {
        margin: pxToRem(30px) pxToRem(55px);
        font-size: pxToRem(28px);
        color: #000000;
        line-height: pxToRem(45px);

        .text__main {
            text-indent: pxToRem(40px);
        }
    }

}
</style>