<template>
	<div id="messageInfo" v-if="myData">
		 <cs-header :header-title="'消息中心'" :has-back="true"></cs-header> 
         <div class="header">
             <div class="header__title">2018年03月07日湛仲院立案上传报告</div>
             <div class="header__timer">2018-03-07  08:00</div>
         </div>
         <div class="ad">该报告由系统每天早上08:00自动生成，如有疑问请联系运维。</div>
         <div class="case">
                <div class="case__cell is-active"><div class="case__title">立案数量</div> <div class="case__num">386</div></div>
                <div class="case__cell"><div class="case__title">立案失败</div> <div class="case__num">32</div></div>
                <div class="case__cell"><div class="case__title">立案成功</div> <div class="case__num">332</div></div>
                <div class="case__cell"><div class="case__title">处理中</div> <div class="case__num">22</div></div>
         </div>
        <div class="center">
             <div class="casecount">立案总金额：<span class="casecount__money">350,000.00元</span></div>
             <div class="item">
                <div class="item__img is-fail"></div>
                <div class="item__id">TDF8272017031701</div>
                <div class="item__money">出款金额：<span class="item__money--blue">350,000.00</span>元</div>
                <div class="item__address">(2017)湛仲字第E04085800号</div>
                <div class="item__time">发送时间： 2015-03-08  23：53</div>
                <div class="item__time2">出款日期： 2015-03-08</div>
                <div class="item__line"></div>
                <div class="item__remark">备注：处理成功</div>
             </div>
         </div>
	</div>
</template>

<script>
import csHeader from 'mycomponents/Header.vue'

export default {
  name: 'messageInfo',
	components: {
	  csHeader
	},
  data () {
    return {
    	myData : null
    };
  },
  beforeMount () {
     const date = this.$route.params.id;
  	 this.api.Common.CommonApi_GetArbitrationRecordReport(date).then(_=>{
        this.myData = _.Data
     })
  }
};
</script>

<style lang="scss" scoped>
@import "~@sass/_variables";
@import "~@sass/_func";
#messageInfo {
    background-color: #eee;

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

        .header__timer {
            color: #999999;
            font-size: pxToRem(24px);
        }

	.ad {
        color: #000000;
        font-size: pxToRem(24px);
        background-color: #fef9dd;
        height: pxToRem(50px);
        line-height: pxToRem(50px);
        padding-left: pxToRem(30px);
    }

    .case {
        @include flex(a, c);
        position: relative;
        height: pxToRem(136px);
        background-color: #fff;
    }

        .case:before {
            @include triangle(bottom, 20px, #fff);
            content: "";
            position: absolute;
            left: pxToRem(80px);
            bottom: pxToRem(-14px);
        }

        .case__cell {
            color: #999999;
            line-height: pxToRem(45px);
            text-align: center;

            &.is-active {
                color: #2da5ff;
            }
        }

        .case__title {
            font-size: pxToRem(24px);
        }

        .case__num {
            font-size: pxToRem(38px);
        }

    .casecount {
        color: #222222;
        font-size: pxToRem(27px);
        height:pxToRem(90px);
        line-height:pxToRem(90px);
    }

        .casecount__money {
            color: #999999;
        }

    .center {
        margin: 0px pxToRem(30px);
    }    

    .item {
        position: relative;

        padding: pxToRem(30px);
        margin-bottom: pxToRem(20px);
        height: pxToRem(360px);
        font-size: pxToRem(24px);
        
        background: #fff;
        color: #999999;
        box-sizing: border-box;
    }

        .item__img {
            @include _bg(86px, 102px, '~@images/doing_icon.png');
            position: absolute;
            top: 0;
            right: pxToRem(30px);

            &.is-fail {
                background-image: url('~@images/fail_icon.png')
            }

            &.is-doing {
                background-image: url('~@images/doing_icon.png')
            }

            &.is-success {
                background-image: url('~@images/success_icon.png')
            }
        }

       

        .item__id {
            font-size: pxToRem(27px);
            margin-bottom: pxToRem(25px);
        }

        .item__money {
            margin-bottom: pxToRem(23px);
        }

        .item__money--blue {
            color: #2da5ff;
            font-size: pxToRem(35px);
        }

        .item__address {
            margin-bottom: pxToRem(30px);
        }

        .item__time {
            margin-bottom: pxToRem(17px);
        }

        .item__time2 {
            margin-bottom: pxToRem(2px);
        }

        .item__line {
            @include line(50px, #c8c7cc)
        }

        .item__remark {
            position: absolute;
            bottom: pxToRem(30px);
        }

}
</style>