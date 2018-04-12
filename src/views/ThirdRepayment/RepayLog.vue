<!--查看代扣列表-->
<template>
    <div id="RepayLog">
        <bsnheader :headerTitle="'查看扣款列表'" :has-back="true"></bsnheader>
        <panel :_isEmpty="isEmpty" :_loadTop = "busilistloadTop" :_loadBottom = "busilistloadBottom" :_bottomDisabled = "bottomDisabled">
            <div slot="body">
                <!-- 循环渲染自定义组件 -->
                <item v-for="(item,index) in dataList" :key="index" :data="item" :index="index"></item>
            </div>
        </panel>
    </div>
</template>

<script>
// header组件
import bsnheader from 'mycomponents/Header.vue';

// panel组件
import panel from 'mycomponents/common/panel.vue';

//Toast组件
import Toast from 'components/toast/index.js';

// 我的业务列表组件
import item from 'mycomponents/ThirdRepayment/repayItem.vue';

export default {
    name: 'RepayLog',
    data () {
        return {
            isEmpty: false,
            bottomDisabled: false,
            dataList: [],
            where: {
                "BusinessId": this.$route.params.businessId,
                "AfterBusinessId": this.$route.params.afterId
            }
        }
    },
    components: {
        Toast,
        bsnheader,
        panel,
        item
    },
    methods: {
        loadData (cb) {
            this.api.ThirdRepayment.ThirdRepayment_GetPerBusinessThirdRepaymentProcessLogs(this.where).then(result => {
                if (result.ReturnCode == 1) {
                    this.dataList = result.Data;
                    this.isEmpty = this.dataList.length === 0;
                } else {
                    Toast(result.ReturnMessage);
                }
                cb && cb();
            });
        },
        busilistloadTop (cb) {
            this.getData( data => {
               
               cb && cb()
               this.dataList = data
           })
        },
        busilistloadBottom (cb) {
          // 直接展示【没有更多数据啦~】
          this.bottomDisabled = true;
          // 执行回调函数：关闭loading
          cb && cb();
        }
    },
    beforeMount () {
        this.loadData();
    }
}
</script>

<style lang="scss">
@import "./../../sass/variables";
@import "./../../sass/func";

#RepayLog {
    padding-top: pxToRem(86px);
}
</style>