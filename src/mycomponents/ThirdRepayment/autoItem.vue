<template>
    <li class="listviewItem" @click="gotoDetails(data.business_type_name, data.business_id,data.business_after_id)">
        <i class="sprite-icon-manage" :class="iconShow(data.business_type_name)"></i>
        <div class="busitem">

            <div class="row">
                <div class="left-warp">
                    <a class="username">{{ data.customer_name }}</a>
                    <span :class="fsdFormat(data.business_type_name || data.business_type)"  class="fsd"></span>
                </div>  
                <div class="right-warp">
                     <a>{{data.business_id}}</a>
                     <a>({{data.business_after_id}}期)</a>
                </div>
            </div>

            <div class="row flex bottom-wire">
                <div class="left-warp">
                    <span class="num-span" v-text="data.repay_money"></span> 
                    <a>元</a> 
                    <a>({{data.bind_platform_name}})</a>
                </div>
                <div class="right-warp">
                    <button class="btn btn-white" @click.stop="goToRepay(data.business_id,data.business_after_id);">代扣记录查看</button>
                </div>
            </div>
            <div class="row flex">
                <div class="left-warp">
                    {{data.create_user}}
                    {{data.create_time | timeYMD}}
                </div>
                <div class="right-warp">
                    <i class="circle" :class="statusColor(data.repay_result_ex)"></i>
                    {{data.repay_result_ex}}
                </div>
            </div>
        </div>
    </li>
</template>

<script>
    export default {
        name: 'autoItem',
        props: ['data'],
        methods: {
            goToRepay (businessId, afterId) {
                this.$router.push(`/RepayLog/${businessId}/${afterId}`);
            },
            iconShow (str) {
                return this.isCarBusiness(str) ? 'car' : 'house'
            },
            isCarBusiness (businessTypeName) {
                return businessTypeName!=null&& businessTypeName.indexOf("车")>=0
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
            // 判断房速贷类型
            fsdFormat (str) {
                switch (str) {
                    case '房速贷标准件':
                        return 'span-am';
                    case '房速贷非标准件':
                        return 'span-mistake';
                    default:
                        return '';
                }
            },
            statusColor (status) {
            	let color = 'circle-blue';
            	switch (status) {
            		case '处理中': 
            			color =  'circle-green'; 
            			break;
            		case '成功': 
            			color =  'circle-blue' 
            			break;
            		case '失败': 
            			color = 'circle-red' 
            			break;
            	}
            	return color;
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../sass/list";
</style>