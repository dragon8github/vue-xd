<template>
    <li class="listviewItem" @click="gotoDetails(data.businessTypeName, data.car_business_id,data.car_business_after_id)">
        <i class="sprite-icon-manage" :class="iconShow(data.businessTypeName)"></i>
        <div class="busitem">

            <div class="row">
                <div class="left-warp">
                    <a class="username">{{data.Customer_Name}}</a>
                    <span :class="fsdFormat(data.businessTypeName)" class="fsd"></span>
                </div>  
                <div class="right-warp">
                    <a>{{data.car_business_id}}</a>
                    <a>{{data.car_business_after_id}}期</a>
                </div>
            </div>        

            <div class="row flex">
                <div class="left-warp">
                    <span class="num-span" v-text="data.should_repay_money"></span><a>元</a>
                    <label class="after_type">逾期</label>
                    <span class="num-span" v-text="data.car_business_after_type === '逾期' ? data.OverdueDays:0"></span>
                    <label>天</label>
                </div>
                <div class="right-warp">
                    <button class="btn btn-white" @click.stop="refundRegister();">还款登记</button>
                </div>
            </div>

            <div class="row flex">
                <div class="left-warp">还款日期：{{data.borrow_date | timeYMD}}</div>
                <div class="right-warp">
                    <i class="circle circle-blue"></i>
                    <span class="text-span">{{data.repayed_flag_cn}}</span>
                </div>
            </div>
        </div>
    </li>
</template>

<script>
    export default {
        name: 'ListItem',
        props: ['data', 'index'],
        methods: {
            refundRegister () {
                this.$router.push(`/customerRegister/${this.data.car_business_id}/${this.data.car_business_after_id}`);
            },
            iconShow (str){
                return this.isCarBusiness(str) ? 'car' : 'house'
            },
            isCarBusiness(businessTypeName){
                return businessTypeName != null && businessTypeName.indexOf("车") >= 0
            },
            fsdFormat (str) {
                switch (str) {
                    case '房速贷标准件'   : return 'span-am';
                    case '房速贷非标准件' : return 'span-mistake';
                    default               : return '';
                }
            },
             // 跳转到订单详情
            gotoDetails (businessType, id,afterId) {
                 // 根据不同的type，跳转到不同的详情中去
                if (this.isCarBusiness(businessType)) {
                    this.$router.push(`/CarBusinessDetails/id/${id}/afterId/${afterId}`)
                } else {
                    this.$router.push(`/HouseBusinessDetails/id/${id}/afterId/${afterId}`)
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
 @import "../../sass/list";
 .after_type {
    margin-left: pxToRem(30px);
 }
</style>
