<template>
    <div>
        <!-- 头部导航 -->
        <header id="bsn_header" class="header-bar bsn-header">
            <i class="icon icon-back" @click="backPath"></i>
            <h1 v-if="isLoading"><img src="../../images/Spinner.gif">{{ loadingText }}</h1>
            <h1 v-else>{{bsnTitle}}</h1>
            <i v-if="!isHeadAdd" class="icon icon-search" @click="showSearch"></i>
            <i v-else @click="goToAdd" class="icon icon-append"></i>
        </header>

        <!-- 搜素栏 -->
        <div class="component-search">
            <section class="search-block" v-show="showOrNone" :class="search ? 'slideInDown' : 'slideOutUp'">
                <div class="input-wrap">
                    <span>业务编号：</span>
                    <div class="input-area">
                        <input id="carBusinessID" type="text" v-model="where.business_id" @keyup.enter="sublimeSearch">
                    </div>
                </div>
                <div class="input-wrap" v-if="businessType">
                    <span>业务类型：</span>
                    <div class="input-area">
                        <select id="businessType" name="bsn-type" v-model="where.business_type">
                            <option value="">请选择</option>
                            <option v-for="o in businessType" :value="o.id">{{ o.text }}</option>
                        </select>
                    </div>
                </div>
                <div class="input-wrap" v-if="businessStatus">
                    <span>业务状态：</span>
                    <div class="input-area">
                        <select id="businessType" name="bsn-type" v-model="where.business_status">
                            <option disabled value="">请选择</option>
                            <option v-for="o in businessStatus" :value="o.id">{{ o.text }}</option>
                        </select>
                    </div>
                </div>
                <div class="input-wrap">
                    <span>客户名称：</span>
                    <div class="input-area">
                        <input id="customerName" type="text" v-model="where.cust_name" @keyup.enter="sublimeSearch">
                    </div>
                </div>
                <div class="search-margin">
                    <button type="button" class="btn-default search-submit" @click="sublimeSearch">确  定</button>
                </div>
            </section>
        </div>
        <!-- 蒙版 -->
        <div class="masker fadeIn" v-show="mask" @click="showSearch"></div>

        <!-- 漂浮的【+】按钮 -->
        <i v-if="addFun && !isHeadAdd" @click="goToAdd" class="icon-add" :class="{hide: isAddHide}"></i>
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
                    business_id: '',        //业务单号
                    business_type: '',      //业务类型
                    cust_name: '',   	    //客户名称
                    business_status: ''     //订单状态
                },
                Timer: null,                // 倒计时器
                isAddHide: false            // 是否隐藏Add icon
            }
        },
        props: {
            // 标题
            bsnTitle: {type: String, default: "标题"}, 
            // 当用户点击【确定】按钮时，会回调的函数。并且传递一些参数过去
            searchFn: {type: Function }, 
            // 用户传递进来的业务列表select-option数据
            businessType: {type: Array }, 
            // 用户可选传递进来的业务状态列表select-option数据
            businessStatus: {type: Array }, 
            // Add icon图标的绑定函数
            addFun: {type: Function },
            // 是否为Add icon图标
            isHeadAdd: {type: Boolean, default: false },
            // 外部可强制指定返回的路径。当然默认使用的是地图链
            path : {type: String, default: ''},
            // 是否处于加载中
            isLoading: {type: Boolean, default: false},
            // 加载中时，header的提示文字
            loadingText: {type: String, default: "获取中..."}
        },        
        methods: {
            showSearch() {
                this.mask = !this.mask
                this.search = !this.search
                this.showOrNone = 'true'
            },
            goToAdd () {
                // 如果外部有绑定add函数，就执行它
                this.addFun && this.addFun();
            },
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
                    business_id: '',        //业务单号
                    business_type: '',      //业务类型
                    cust_name: '',   		//客户名称
                    business_status: ''     //订单状态
                }
            }
        },
        computed: {
          get_translateY () {
            return this.$store.state.translateY;
          }
        },
        watch: {
          get_translateY (val) {
             window.clearTimeout(this.Timer);
             this.isAddHide = true;
             this.Timer = window.setTimeout(() => {
                 this.isAddHide = false;
             }, 1300)
          }
        }
    }
</script>


<style lang="scss" scoped>
@import "../../sass/header";
</style>