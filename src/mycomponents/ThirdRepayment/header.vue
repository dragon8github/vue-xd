<template>
    <div>
        <header id="bsn_header" class="header-bar bsn-header">
            <i class="icon icon-back" @click="backPath"></i>
             <h1 v-if="isLoading"><img src="../../images/Spinner.gif">{{ loadingText }}</h1>
            <h1 v-else>{{bsnTitle}}</h1>
            <i class="icon icon-search" @click="mask = !mask;search = !search;showOrNone = 'true'"
               v-if="!isHeadAdd"></i>
            <i v-if="addFun" @click="goToAdd" :class="headAddShow()"></i>
        </header>
        <div class="component-search">
            <section class="search-block" v-show="showOrNone" :class="search === true ? 'slideInDown' : 'slideOutUp'">
                <div class="input-wrap">
                    <span>代扣平台：</span>
                    <div class="input-area">
                        <select v-model="where.Platform">
                            <option value="">请选择</option>
                            <option v-for="item in paramsModel.ThirdRepaymentPlatforms" :value="item.Key">
                                {{item.Value}}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="input-wrap">
                    <span>业务类型：</span>
                    <div class="input-area">
                        <select v-model="where.BusinessType">
                            <option value="">请选择业务类型</option>
                            <option v-for="o in paramsModel.BusinessTypes" :value="o.Key">{{ o.Value }}</option>
                        </select>
                    </div>
                </div>
                <div class="input-wrap">
                    <span>客户名称：</span>
                    <div class="input-area">
                        <input id="customerName" type="text" v-model="where.CustomerName" @keyup.enter="sublimeSearch">
                    </div>
                </div>
                <div class="input-wrap">
                    <span>业务编号：</span>
                    <div class="input-area">
                        <input id="carBusinessID" type="text" v-model="where.BusinessId" @keyup.enter="sublimeSearch">
                    </div>
                </div>
                <div class="input-wrap">
                    <span>业务获取：</span>
                    <div class="input-area">
                        <input type="text" v-model="where.BusinessOriginalUserName" @keyup.enter="sublimeSearch">
                    </div>
                </div>
                <div class="input-wrap">
                    <span>备注：</span>
                    <div class="input-area">
                        <input type="text" v-model="where.Remark" @keyup.enter="sublimeSearch">
                    </div>
                </div>
                <div class="input-wrap double">
                    <span>日期：</span>
                    <div class="input-area input-date">
                        <input type="text" placeholder="开始日期" @click="openPicker(0)" v-model="where.BeginTime" />
                        <i> - </i>
                        <input type="text" placeholder="结束日期" @click="openPicker(1)" v-model="where.EndTime" />
                    </div>
                </div>
                <div class="input-wrap">
                    <span>业务状态：</span>
                    <div class="input-area">
                        <select name="bsn-type" v-model="where.ProcessStatus">
                            <option value="">请选择业务状态</option>
                            <option v-for="o in paramsModel.ThirdRepaymentStates" :value="o.Key">{{ o.Value }}</option>
                        </select>
                    </div>
                </div>
                   <div class="input-wrap">
                    <span>分公司：</span>
                    <div class="input-area">
                        <select name="bsn-type" v-model="where.BranchId">
                            <option value="">请选择分公司</option>
                            <option v-for="o in paramsModel.Branchs" :value="o.Key">{{ o.Value }}</option>
                        </select>
                    </div>
                </div>
                <div class="search-margin">
                    <button type="button" class="btn-default search-submit" @click="sublimeSearch">确  定</button>
                </div>
            </section>
            <div class="masker fadeIn" v-show="mask" @click="mask = !mask;search = !search;">
            </div>
        </div>
        <picker ref="picker" type="date" v-model="inputTime" @confirm="handleChange"></picker>
    </div>
</template>

<script>
    // Timepicker组件
    import picker from 'components/datetimepicker/datetimepicker.vue';

    export default {
        data () {
            return {
                search: false,
                showOrNone: false,
                mask: false,
                where: {
                    "BusinessId": "",
                    "BusinessType": "",
                    "BranchId": "",
                    "CustomerName": "",
                    "BusinessOriginalUserName": "",
                    "ProcessStatus": "",
                    "Platform": "",
                    "Remark": "",
                    "BeginTime": "",
                    "EndTime": "",
                },
                startOrEnd: 0,
                inputTime: new Date()
            }
        },
        components: {
            picker
        },
        props: {
            // 是否处于加载中
            isLoading: {type: Boolean, default: false},
            // 加载中时，header的提示文字
            loadingText: {type: String, default: "获取中..."},
            // 标题
            bsnTitle: {type: String, default: "标题"},
            // 当用户点击【确定】按钮时，会回调的函数。并且传递一些参数过去
            searchFn: {type: Function },
            paramsModel: {}
        },
        methods: {
            resetWhere () {
                this.where = {
                    "BusinessId": "",
                    "BusinessType": "",
                    "BranchId": "",
                    "CustomerName": "",
                    "BusinessOriginalUserName": "",
                    "ProcessStatus": "",
                    "Platform": "",
                    "Remark": "",
                    "BeginTime": "",
                    "EndTime": "",
                }
            },
            openPicker (type) {
                this.startOrEnd = type;
                if (type === 0) {
                    this.inputTime = this.where.BeginTime == "" ? new Date() : new Date(this.where.BeginTime);
                } else {
                    this.inputTime = this.where.EndTime == "" ? new Date() : new Date(this.where.EndTime);
                }
                this.$refs.picker.open();
            },
            handleChange (v) {
                var date = new Date(v),
                    forMatDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
                if (this.startOrEnd === 0) {
                    this.where.BeginTime = forMatDate;
                } else {
                    this.where.EndTime = forMatDate;
                }
            },
            backPath () {
                this.$router.push(this.$store.getters.siteMap)
            },
            sublimeSearch () {
                // 关闭阴影
                this.mask = false
                // 关闭搜索框
                this.showOrNone = false
                // 关闭伸缩
                this.search = false
                // 将scrollTop的位置置顶
                document.querySelector(".page-loadmore-wrapper").scrollTop = 0;
                // 回调
                this.searchFn(this.where)
            }
        }
    }
</script>


<style lang="scss" scoped>
@import "../../sass/header";

.input-wrap {
    & > span {
        min-width: pxToRem(150px);
    }
}

.input-date {
    justify-content: space-between;

    input {
        width: 45%;
    }

    i {
        position: relative;
        color: #ccc;
        font-size: pxToRem(58px);
    }
}
</style>