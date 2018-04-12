<template>
  <transition name="fade">
    <li class="listviewItem">
        <div class="busitem" @click="gotoDetails(data.business_id)">
            <div class="row">
            	<div class="left-warp">
            		<a class="username">{{subStr(data.customer_name, 8)}}</a>
            		<span :class="fsdFormat(data.business_type_name || data.business_type)" class="fsd"></span>
            	</div>
            	<div class="right-warp">
            		<a class="business_id">{{data.business_id}}</a>
            	</div>
            </div>          
            
            <div class="row flex bottom-wire">
                <div class="left-warp">
                    <span class="num-span">
                        {{ data.apply_money == null ? 0.00:data.apply_money  }}
                    </span>元
                </div>
                <div class="right-warp">
                    <div class="btn btn-white" @click.stop="goToEdit(data.business_id,data.business_type,data.apply_money)">派 件</div>
                </div>
            </div>
             
            <div class="row-last">
		            <div class="row-last-top"> 
		            		<span class="text-span">分公司：</span> 
		            		<span class="text-span-gray">{{data.dept_name}}</span>
		            </div>
		            
		            <div class="row-last-bottom">
			            	<div class="left-warp">
			            			<span class="text-span">审批中心：</span> 
			            			<span class="text-span-gray">{{data.audit_center_name}}</span>
			            	</div>
			            	<div class="right-warp" v-if="data.repayment_type_name">
			            			<i class="circle circle-blue"></i>
			            			<span class="text-span">{{data.repayment_type_name}}</span>
			            	</div>
		            </div>
            </div>
        </div>
    </li>
</transition>
</template>

<script>


// Toast 组件
import Toast from 'components/toast/index.js'

// Messagebox 组件
import MessageBox from 'components/messagebox/messagebox.js'

export default {
    name: 'auditAssignItem',
    props:{
        // 数据源
        data: {
            type:Object,
            default:[]
        }
    },
    methods: {
        // 跳转到订单详情
        gotoDetails (id) {
            // 跳转到的详情中去
            this.$router.push(`/HouseBusinessDetails/id/${id}`)
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
        goToEdit(businessId,businessType,apply_money ){        
            if (apply_money > 3000000) {
                MessageBox.confirm("请注意该业务审批金额超过300万,建议分配到总部的审批中心!","操作提示").then(()=>{
                    this.$router.push(`/actionAgainAssign/${businessId}/${businessType}`);        
                }).catch(() => {});
            }else {
                this.$router.push(`/actionAgainAssign/${businessId}/${businessType}`);    
            }
        }
    },
    filters:{
        monthFormat (month) {
            var length = month.length,
                   num = month.substring(0,month.length-2);
            return num;
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../sass/list";
</style>
