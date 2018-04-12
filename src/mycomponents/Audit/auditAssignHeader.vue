<template>
    <div>
        <header id="bsn_header" class="header-bar bsn-header">
            <i class="icon icon-back" @click="backPath"></i>
            <h1 v-if="isLoading"><img src="../../images/Spinner.gif">{{ loadingText }}</h1>
            <h1 v-else>{{bsnTitle}}</h1>
            <i class="icon icon-search" @click="mask = !mask;search = !search;showOrNone = 'true'" v-if="!isHeadAdd"></i>
        </header>
        <div class="component-search">
            <section class="search-block" v-show="showOrNone" :class="search === true ? 'slideInDown' : 'slideOutUp'">
                <div class="input-wrap">
                    <span>审批中心：</span>
                    <div class="input-area">
                        <select id="businessType" name="bsn-type" v-model="where.audit_center">
                            <option v-for="o in optionList['audit_center']" :value="o.id">{{ o.text }}</option>
                        </select>
                    </div>
                </div>
                <div class="input-wrap">
                    <span>分 公 司 ：</span>
                    <div class="input-area">
                        <select id="businessType" name="bsn-type" v-model="where.serach_dept">
                            <option v-for="o in optionList['branch_list']" :value="o.id">{{ o.text }}</option>
                        </select>
                    </div>
                </div>
                <div class="input-wrap">
                    <span>业务类型：</span>
                    <div class="input-area">
                        <select id="businessType" name="bsn-type" v-model="where.business_type">
                            <option v-for="o in optionList['business_type']" :value="o.id">{{ o.text }}</option>
                        </select>
                    </div>
                </div>
                <div class="input-wrap">
                    <span>业务编号：</span>
                    <div class="input-area">
                        <input id="customerName" type="text" v-model="where.business_id" @keyup.enter="sublimeSearch">
                    </div>
                </div>
                <div class="input-wrap">
                    <span>客户名称：</span>
                    <div class="input-area">
                        <input id="customerName" type="text" v-model="where.customer_name" @keyup.enter="sublimeSearch">
                    </div>
                </div>
                <div class="search-margin">
                    <button type="button" class="btn-default search-submit" @click="sublimeSearch">确  定</button>
                </div>
            </section>
            <div class="masker fadeIn" v-show="mask" @click="mask = !mask;search = !search;">
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        data () {
            return {               
                search: false,
                showOrNone: false,
                mask: false,
                where: {
                    audit_center: 'ALL',    //审批中心
                    serach_dept: 'ALL',   //分公司
                    business_type: '',   //业务类型
                    business_id: '',  //订单编号
                    customer_name:"",//客户名称
                }
            }
        },
        props: {
            // 标题
            bsnTitle: {type: String, default: "标题"}, 
            // 当用户点击【确定】按钮时，会回调的函数。并且传递一些参数过去
            searchFn: {type: Function }, 
            //select-option数据
            optionList:{type:Object, default:{}},
            // 外部可强制指定返回的路径。当然默认使用的是地图链
            path : {type: String, default: ''},
            // 是否处于加载中
            isLoading: {type: Boolean, default: false},
            // 加载中时，header的提示文字
            loadingText: {type: String, default: "获取中..."}
        },        
        methods: {
            backPath () {
                // 外部可强制指定返回的路径。当然默认使用的是地图链
                this.$router.push(this.path || this.$store.getters.siteMap)
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
            },
            resetWhere () {
                this.where = {
                    audit_center: '',    //审批中心
                    serach_dept: '',   //分公司
                    business_type: '',   //业务类型
                    business_id: '',  //订单编号
                    customer_name:"",//客户名称
                }
            }
        }
    }
</script>


<style lang="scss" scoped>
@import "../../sass/header";
</style>