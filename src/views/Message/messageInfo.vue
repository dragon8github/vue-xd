<template>
	<div id="messageInfo">
		 <cs-header :header-title="'消息中心'" :has-back="true"></cs-header> 
         <div class="header">
             <div class="header__title">{{ myData.Title }}</div>
             <div class="header__timer">{{ timeYMD(myData.ReportDate) }}</div>
         </div>
         
         <div class="ad">该报告由系统每天早上08:00自动生成，如有疑问请联系运维。</div>
         <div class="case">
                <div class="case__cell"  @click="active(0)" :class="{'is-active' : index == 0}"><div class="case__title">立案数量</div> <div class="case__num">{{ myData.CaseNumber }}</div></div>
                <div class="case__cell"  @click="active(1)" :class="{'is-active' : index == 1}"><div class="case__title">立案失败</div> <div class="case__num">{{ myData.FailNumber }}</div></div>
                <div class="case__cell"  @click="active(2)" :class="{'is-active' : index == 2}"><div class="case__title">立案成功</div> <div class="case__num">{{ myData.Success }}</div></div>
                <div class="case__cell"  @click="active(3)" :class="{'is-active' : index == 3}"><div class="case__title">处理中</div> <div class="case__num">{{ myData.InHand }}</div></div>
         </div>
        <div class="center">
             <div class="casecount">{{ moneyText }}：<span class="casecount__money">{{ allMoney }} 元</span></div>
             <div class="item" v-for="item in tmpData">
                <div class="item__img" :class="getClass(item.status)"></div>
                <div class="item__id">{{ item.business_id }}</div>
                <div class="item__money">出款金额：<span class="item__money--blue">{{ item.upload_output_money }}</span> 元</div>
                <div class="item__address">{{ item.record_number }}</div>
                <div class="item__time">发送时间： {{ timeYMD(item.send_time) }}</div>
                <div class="item__time2">出款日期： {{ timeYMD(item.output_date) }}</div>
                <div class="item__line"></div>
                <div class="item__remark">备注：{{ item.remark }}</div>
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
    	myData : {},
        index: 0,
        moneyText: '立案总金额',
        allMoney: 0,
        tmpData: [],
        allData: [],
        failData:[],
        successData: [],
        doingData: []
    };
  },
  methods: {
    active (index) {
        this.index = index
        switch (index) {
            case 0:
                this.moneyText = '立案总金额'
                this.allMoney = this.myData.CaseMoney
                this.tmpData = this.allData
                break;
            case 1:
                this.moneyText = '立案失败总金额'
                this.allMoney = this.myData.FailMoney
                this.tmpData = this.failData
                break;
            case 2:
                this.moneyText = '立案成功总金额'
                this.allMoney = this.myData.SuccessMoney
                this.tmpData = this.successData
                break;
            case 3:
                this.moneyText = '立案处理中总金额'
                this.allMoney = this.myData.InHandMoney
                this.tmpData = this.doingData
                break;
        }
    },
    getMoneyText (index) {

    },
    getClass (status) {
        if (status == '处理中') {
            return 'is-doing'
        } else if (status.indexOf("失败") >= 0 ) {
            return 'is-fail'
        } else if (status.indexOf("成功") >= 0) {
            return 'is-success'
        }
    }
  },
  beforeMount () {
     const date = this.$route.params.id;
  	 this.api.Common.CommonApi_GetArbitrationRecordReport(date).then(_=>{
        this.myData = _.Data
        this.allData = this.tmpData = _.Data.ReportList;
        this.allMoney = _.Data.CaseMoney

        for (var i = 0; i < this.myData.ReportList.length; i++) {
            var v = this.myData.ReportList[i]
            // 立案成功
            if (v.status_value == '1') {
                this.successData.push(v)
            // 立案失败
            } else if (v.status_value == '2') {
                this.failData.push(v)
            // 处理中
            } else if (v.status_value == '0' || v.status_value == '4') {
                this.doingData.push(v)
            }
        }
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

        .case__cell {
            color: #999999;
            line-height: pxToRem(45px);
            text-align: center;

            &.is-active {
                color: #2da5ff;
                position: relative;
            }

            &.is-active:before {
                @include triangle(bottom, 20px, #fff);
                @include xcenter();
                content: "";
                position: absolute;
                bottom: pxToRem(-38px);
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

        padding: pxToRem(30px) pxToRem(30px) 0 pxToRem(30px);
        margin-bottom: pxToRem(20px);
        // min-height: pxToRem(360px);
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
            position: relative;
            bottom: pxToRem(15px);
            line-height: pxToRem(45px);
        }

}
</style>