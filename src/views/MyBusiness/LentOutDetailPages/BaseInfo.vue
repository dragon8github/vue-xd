<!--贷后详情基本信息-->
<template>
    <div v-if="myData">
        <div class="container_item">
            <mtitle :title="'业务信息'">
                <div slot='list'>
                    <mt-field label="业务类型" :value="myData['lent_out_detail']['business_type']" :readonly='true'></mt-field>
    
                    <mt-field label="借款金额/银承金额" :value="myData['lent_out_detail']['output_info']['OUT_MONEY']+'('+myData['upper_money']+')'" :readonly='true'></mt-field>
    
                    <mt-field label="最终审批还款方式" :value="myData['lent_out_detail']['repayment_type']" :readonly='true'></mt-field>
    
                    <mt-field label="借款期限/银承天数" :value="myData['lent_out_detail']['output_info']['OUT_MONTH']" :readonly='true'></mt-field>
    
                    <mt-field label="最终审批借款利率" :value="myData['final_repay_rate']" :readonly='true'></mt-field>
    
                    <mt-field v-if="myData['lent_out_detail']['business_type_id']==9" label="出款审批中心" :value="myData['lent_out_detail']['output_info']['Lackconverage']" :readonly='true'></mt-field>
    
                    <mt-field v-if="myData['lent_out_detail']['business_type_id']==11" label="审批中心" :value="myData['lent_out_detail']['AuditCenter']" :readonly='true'></mt-field>
    
                    <mt-field v-if="myData['lent_out_detail']['business_type_id']==11" label="是否合并还款计划" :value="myData['merge_info']?myData['merge_info']:'否'" :readonly='true'></mt-field>
    
                    <mt-field label="出借人、债权人" :value="myData['lent_out_detail']['output_info']['Lender']" :readonly='true'></mt-field>
    
                    <mt-field label="抵押权人" :value="myData['lent_out_detail']['output_info']['Pledee']" :readonly='true'></mt-field>
    
                    <mt-field label="所属分公司" :value="myData['lent_out_detail']['output_info']['branch_name']" :readonly='true'></mt-field>
    
                    <mt-field label="法人代表" :value="myData['lent_out_detail']['output_info']['legal_person']" :readonly='true'></mt-field>
    
                    <mt-field label="联系电话" :value="myData['lent_out_detail']['output_info']['branch_phone']" :readonly='true'></mt-field>
    
                    <mt-field label="合同类型" v-if="myData['contract_type'] && (myData['lent_out_detail']['output_info']['contract_type']==1)" :value="'普通抵押合同'" :readonly='true'></mt-field>
    
                    <mt-field label="合同类型" v-if="myData['contract_type'] && (myData['lent_out_detail']['output_info']['contract_type']==2)" :value="'最高额抵押合同'" :readonly='true'></mt-field>
    
                    <mt-field label="抵押期限" v-if="myData['contract_type'] && (myData['lent_out_detail']['output_info']['contract_type']==2)" :value="myData['lent_out_detail']['output_info']['mortgage_time_limit']+'个月'" :readonly='true'></mt-field>
    
                </div>
    
            </mtitle>
    
        </div>
    
    
    
        <div class="container_item">
    
            <mtitle :title="'费用明细'">
    
                <div slot='list'>
                    <div class="container_item_list_children">
                        <div class="container_item" v-for="(item, index) in myData['fee_in_type']">
        
                            <mtitle :title="item.fee_name">
        
                                <div slot='list' v-for="(obj,num) in item.fee_item_list">
        
                                    <mt-field :label="obj.fee_item_name" :value="obj.fee_type?obj.fee_type+obj.fee_value:''+obj.fee_value" :readonly='true'></mt-field>
        
                                    <mt-field v-if="obj.fee_sum" label="合计（元）" :value="obj.fee_sum" :readonly='true'></mt-field>
        
                                </div>
        
                            </mtitle>
                            
                        </div>
                    </div>
                     <mt-field v-if="myData['lent_out_detail']['business_type'].indexOf('房速贷')>-1" label="出款费率" :value="feeOutPut(myData['final_repay_rate'],myData['service_charge'],myData['one_time_charge'])" :readonly='true'></mt-field>

                     <mt-field  label="特殊情况说明" :value="myData['lent_out_detail']['output_info']['SpecialDescript']" :readonly='true'></mt-field>

                     <mt-field  label="合计（元）" :value="myData['sum_fees']" :readonly='true'></mt-field>
                </div>
    
            </mtitle>
    
        </div>    
    </div>
</template>
<script>
    import mtField from 'components/field/field.vue';
    
    
    
    import mtitle from 'mycomponents/businessDetails/title.vue';
    
    
    
    export default {
        name: 'baseInfo',
        components: {
            mtField,
            mtitle
        },
        methods:{
            feeOutPut(rate,serviceCharge,oneTimeCharge){
                return "平台月利率"+rate+"+分公司每月收取的服务费费率"+serviceCharge+"+一次性收取的费率（含返佣费率）"+oneTimeCharge;
            }
        },
        computed: {
            myData () {
                return this.$store.getters.LentOutDetailData;
            }
        }
    }
</script>
<style lang="scss">
    
</style>


