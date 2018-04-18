<template>
	<div id="messageErr">
		<cs-header :header-title="'消息中心'" :has-back="true"></cs-header> 
        <div class="header">
            <div class="header__title">{{ myData.title }} <a class="header__title--link" v-if="myData.id" @click="go">（{{ myData.id }}）</a> </div>
            <div class="header__timer">{{ timeYMD(myData.time) }}</div>
        </div> 
        <div class="line"></div>
        <div class="text"> 
            <div class="text__title">{{ myData.title }}，具体内容如下：</div>
            <p class="text__main"> {{ myData.content }} </p> 
        </div>
	</div>
</template>

<script>
import csHeader from 'mycomponents/Header.vue'
import Toast from 'components/toast/index.js'

export default {
  name: 'messageErr',
	components: {
	  csHeader
	},
  data () {
    return {
    	myData : this.$store.state.message
    };
  },
  methods: {
    go () {
        var type = this.myData.type
        if (type === '车易贷') {
            this.$router.push(`/CarBusinessDetails/id/${this.myData.id}`)
        } else if (type === '房速贷') {
            this.$router.push(`/houseBusinessDetails/id/${this.myData.id}`)
        } else {
            Toast('暂时没有此业务详情')
        }
    }
  },
  beforeMount () {
  	 console.log(this.myData)
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

        .text__title {
            margin-bottom: pxToRem(20px);
        }

        .text__main {
            text-indent: pxToRem(40px);
        }
    }

}
</style>