<template>
    <div class="mybusinessContainer">
        <bsnheader :bsn-title="'客户还款登记'" :searchFn="searchFn" :addRegister="true" :addFun="addFun" :isHeadAdd="true"></bsnheader>
        <panel :_loadTop="loadTop" :_loadBottom="loadBottom" :_isEmpty="isEmpty" :_bottomDisabled="bottomDisabled" :noThingText="'还没添加还款登记哦'">
            <div slot="body">
                <item v-for="(item,index) in outPutList" :key="index" :data="item"></item>
            </div>
        </panel>
    </div>
</template>

<script>
// header组件
import bsnheader from 'mycomponents/common/header.vue';

// panel组件
import panel from 'mycomponents/common/panel.vue';

//Toast组件
import Toast from 'components/toast/index.js';

import item from 'mycomponents/ledger/regItem.vue';

export default {
    name: 'customerRegister',
    data () {
        return {
            // 台账数据源
            outPutList:[],
            // 数据源是否为空
            isEmpty:false,
            // 是否接口已经不能提供更多的数据了
            bottomDisabled:false,
            // 查询条件
            where: {
                "BusinessId" : this.$route.params.businessId,
                "AfterBusinessId" :this.$route.params.afterId
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
         // 获取数据
        getData (cb) {
           this.api.Ledger.Ledger_GetAllRepaymentRecord(this.where).then(Result => {
                // 如果有数据，还原正常配置
                if (Result.ReturnCode >= 1 && Result.Data.length > 0) {
                    this.bottomDisabled = false;
                    this.isEmpty = false;
                }
                // 执行回调函数，并放入一个请求数据结果的参数
                cb && cb(Result.Data);
           })
        },
        // 下拉刷新数据
        loadTop (cb) {
            this.getData( data => {
               
               cb && cb()
               this.outPutList = data
           })
        },
        // 上拉加载更多的回调事件 (据子尧的说法，其实这个接口是一次性返回所有的数据，因为数据量非常少，所以上拉加载更多事实上只是幌子。直接显示没有更多数据即可)
        loadBottom (cb) {
            this.bottomDisabled = true
            cb && cb()
        },
        addFun () {
            this.$router.push(`/addRegister/${this.$route.params.businessId}/${this.$route.params.afterId}`)
        }
    },
    created () {
        this.getData(data => {
            // 如果首次加载页面时请求数据长度为0，那么展示【没有数据哦~】
            this.isEmpty = data.length === 0
            // 替换数组
            this.outPutList = data;
        })
    }
}
</script>

<style lang="scss" scoped>
    @import "./../../sass/variables";
    @import "./../../sass/func";

    .mybusinessContainer {
        padding-top: pxToRem(86px);
    }
</style>