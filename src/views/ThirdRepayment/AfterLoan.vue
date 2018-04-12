<template>
    <div v-if="myData">
    
        <div class="container_item">
    
            <mtitle :title="'贷后信息'">
    
                <div slot="list">
    
                    <mt-field label='业务类型' :value="myData['businessType']"  :readonly='true'></mt-field>
    
                    <mt-field label='还款方式' :value="myData['car_business_after']['repayment_type']"  :readonly='true'></mt-field>
    
                    <mt-field label='借款金额' :value="myData['car_business_after']['borrow_money']|appendMoneyUnitIfNotNullOrEmpty(0)"  :readonly='true'></mt-field>
    
                    <mt-field label='预计剩余本金'  :value="myData['car_business_after']['oddcorpus']|appendMoneyUnitIfNotNullOrEmpty(0)" :readonly='true'></mt-field>
    
                    <mt-field label='实际剩余本金' :value="myData['surplus_principal']|appendMoneyUnitIfNotNullOrEmpty(0)"  :readonly='true'></mt-field>
    
                    <mt-field label='本期应还本金' :value="myData['car_business_after']['current_Principa']|appendMoneyUnitIfNotNullOrEmpty(0)"  :readonly='true'></mt-field>
    
                    <mt-field label='本期应还咨询服务费' :value="myData['car_business_after']['repay_service']|appendMoneyUnitIfNotNullOrEmpty(0)"  :readonly='true'></mt-field>
    
                    <mt-field label='本期应还利息'  :value="myData['car_business_after']['current_accrual|']|appendMoneyUnitIfNotNullOrEmpty(0)" :readonly='true'></mt-field>
    
                    <mt-field label='其他费用'  :value="myData['car_business_after']['current_other_money|']|appendMoneyUnitIfNotNullOrEmpty(0)" :readonly='true'></mt-field>
    
                    <mt-field label='本期应还金额合计' :value="myData['total_plan_repayment|']|appendMoneyUnitIfNotNullOrEmpty(0)"   :readonly='true'></mt-field>
    
                    <mt-field label='逾期天数' :value="myData['over_due_days']|appendDayUnitIfNotNullOrEmpty(0)"  :readonly='true'></mt-field>
    
                    <mt-field label='违约金'  :value="myData['over_due_money']|appendMoneyUnitIfNotNullOrEmpty(0)" :readonly='true'></mt-field>
    
                    <mt-field label='本期应还金额合计（含违约金）' :value="myData['total_plan_repayment_and_over_due_money']|appendMoneyUnitIfNotNullOrEmpty(0)"  :readonly='true'></mt-field>
    
                    <mt-field label='罚息应收' :value="myData['car_business_after']['punitive_rate_should']|appendMoneyUnitIfNotNullOrEmpty(0)"  :readonly='true'></mt-field>
    
                    <mt-field label='罚息实收' :value="myData['car_business_after']['punitive_rate_fact']|appendMoneyUnitIfNotNullOrEmpty(0)"  :readonly='true'></mt-field>
    
                    <mt-field label='还款日期' :value="myData['car_business_after']['borrow_date']|timeYMD"  :readonly='true'></mt-field>
    
                    <mt-field label='支付方式' :value="myData['car_business_after']['payment_type']"  :readonly='true'></mt-field>
    
                    <mt-field label='备注' :value="myData['car_business_after']['remark']"  :readonly='true'></mt-field>
    
                    <mt-field label='实收应收差额'  :value="myData['car_business_after']['reserve_5|']|appendMoneyUnitIfNotNullOrEmpty(0)" :readonly='true'></mt-field>
    
                    <mt-field label='是否亏损结清'  :value="boolenFormat(myData['car_business_after']['is_loss_settle'])" :readonly='true'></mt-field>
    
                    <mt-field label='亏损结清说明'  :value="myData['car_business_after']['settle_mark']"  :readonly='true'></mt-field>
    
                    <mt-field label='状态'  :value="myData['car_business_after']['reserve_2']" :readonly='true'></mt-field>
    
                    <mt-field label='展期业务编号' :value="myData['car_business_after']['car_business_after_defer']"  :readonly='true'></mt-field>
    
                </div>
    
            </mtitle>
    
        </div>

        <div class="container_item" v-if="myData['isHaveSettle']">
            <mtitle :title="'结清计算'">
                <div slot="list">
                    <mt-field label='本金' :value="myData['settlePrincipal']|appendMoneyUnitIfNotNullOrEmpty(0)"  :readonly='true'></mt-field>
                    <mt-field label='利息' :value="myData['settleInterest']|appendMoneyUnitIfNotNullOrEmpty(0)"  :readonly='true'></mt-field>
                    <mt-field label='逾期费用' :value="myData['settleOverdue']|appendMoneyUnitIfNotNullOrEmpty(0)"  :readonly='true'></mt-field>
                    <mt-field label='合计' :value="myData['settleTotal']|appendMoneyUnitIfNotNullOrEmpty(0)"  :readonly='true'></mt-field>
                </div>
            </mtitle>
        </div>

        <div class="container_item">
            <mtitle :title="'催收分配信息'">
                <div slot="list">
                    <mtitle v-for="(data, index) in myData['collection_logs']" :key="index"  :title="index | collectionTitle">
                        <div slot="list">
                            <mt-field label='电话催收人' :value="collection(index,data['collection_user'])"  :readonly='true'></mt-field>
                            <mt-field label='电催分配备注' :value="collection(index,data['collection_remark'])"  :readonly='true'></mt-field>
                            <mt-field label='分配方式' :value="collectionType(index,data['collection_type'])"  :readonly='true'></mt-field>
                            <mt-field label='分配时间' :value="collection(index,data['create_time'])"  :readonly='true'></mt-field>
                        </div>
                    </mtitle>
                    <mt-field label='贷后催收人' :value="myData['collection']==null?'':myData['collection.collection_user']"  :readonly='true'></mt-field>
                    <mt-field label='贷后催收分配备注' :value="myData['collection']==null?'':myData['collection.assign_remark']"  :readonly='true'></mt-field>
                    <mt-field v-if="myData['businessType']=='车易贷'" label='车贷移交催收备注' :value="myData['collection']==null?'':myData['collection.hand_to_remark']"  :readonly='true'></mt-field>
                </div>
            </mtitle>
        </div>

        <div class="container_item" v-if="myData['businessType']=='房速贷标准件' || myData['businessType']=='房速贷非标准件' && myData['delay_hand_collection_one']">
            <mtitle :title="'推迟移交催收信息'">
                <div slot="list">
                    <mt-field label='第一次推迟移交催收说明' :value="myData['delay_hand_collection_one']['apply_desc']"  :readonly='true'></mt-field>
                    <mt-field label='第二次推迟移交催收说明' :value="myData['delay_hand_collection_two']['apply_desc']"  :readonly='true'></mt-field>
                </div>
            </mtitle>
        </div>
    
        <div class="container_item">
            <mtitle :title="'催收结果'"> 
                <div v-if="myData['businessType']=='房速贷标准件' || myData['businessType']=='房速贷非标准件' && myData['delay_hand_collection_one']" slot="list">
                    <mt-field label='催收调查结果(已完成)' :value="myData['collection_actionplan']['survey_result']"  :readonly='true'></mt-field>
                    <mt-field label='实收费用' :value="myData['collection_actionplan']['fact_fee']|appendMoneyUnitIfNotNullOrEmpty(0)" :readonly='true'></mt-field>
                    <mt-field label='催收调查结果(移交法务)' :value="myData['hand_Legal']['survey_result']" :readonly='true'></mt-field>
                    <mt-field label='资产管理部经办人意见' :value="myData['hand_Legal']['apply_desc']" :readonly='true'></mt-field>

                    <mt-field label='第一次推迟移交法务说明' :value="myData['delay_hand_legal_one']['apply_desc']" :readonly='true'></mt-field>
                    <mt-field label='催收调查结果(第一次推迟)' :value="myData['delay_hand_legal_one']['survey_result']" :readonly='true'></mt-field>

                    <mt-field label='第二次推迟移交法务说明' :value="myData['delay_hand_legal_two']['apply_desc']" :readonly='true'></mt-field>
                    <mt-field label='催收调查结果(第二次推迟)' :value="myData['delay_hand_legal_two']['survey_result']" :readonly='true'></mt-field>

                    <mt-field label='第三次推迟移交法务说明' :value="myData['delay_hand_legal_three']['apply_desc']" :readonly='true'></mt-field>
                    <mt-field label='催收调查结果(第三次推迟)' :value="myData['delay_hand_legal_three']['survey_result']" :readonly='true'></mt-field>

                    <mt-field label='特殊推迟移交法务申请期限' :value="myData['delay_hand_legal_special']['apply_limit']" :readonly='true'></mt-field>
                    <mt-field label='特殊推迟移交法务说明' :value="myData['delay_hand_legal_special']['apply_desc']" :readonly='true'></mt-field>
                    <mt-field label='催收调查结果(特殊推迟)' :value="myData['delay_hand_legal_special']['survey_result']" :readonly='true'></mt-field>

                </div>
                <div v-if="myData['businessType']!='房速贷标准件' && myData['businessType']!='房速贷非标准件'" slot="list">
                    <mt-field label='实际催收人' :value="myData['collection_actionplan']['collection_user']" :readonly='true'></mt-field>
                    <mt-field label='催收时间' :value="myData['collection_actionplan']['collection_time']|timeYMD" :readonly='true'></mt-field>
                    <mt-field label='备注' :value="myData['collection_actionplan']['remark']" :readonly='true'></mt-field>
                </div>
            </mtitle>
        </div>

        <div class="container_item" v-if="myData['businessType']=='车易贷'">
            <mtitle :title="'二抵车赎回信息'">
                <div slot="list">
                    <mt-field label='当前车辆评估价' :value="myData['redeem_apply']['evaluate_price']|appendMoneyUnitIfNotNullOrEmpty(0)"  :readonly='true'></mt-field>
                    <mt-field label='二抵借款金额' :value="myData['redeem_apply']['borrow_money']|appendMoneyUnitIfNotNullOrEmpty(0)"  :readonly='true'></mt-field>
                    <mt-field label='赎车金额' :value="myData['redeem_apply']['car_price']|appendMoneyUnitIfNotNullOrEmpty(0)"  :readonly='true'></mt-field>
                    <mt-field label='对方账号' :value="myData['redeem_apply']['account']"  :readonly='true'></mt-field>
                    <mt-field label='情况说明' :value="myData['redeem_apply']['situation_desc']"  :readonly='true'></mt-field>
                </div>
            </mtitle>
        </div>

        <div class="container_item" v-if="myData['businessType']=='车易贷'">
            <mtitle :title="'委外催收信息'">
                <div slot="list">
                    <mt-field label='车辆目前位置' :value="myData['outsource_apply']['car_location']"  :readonly='true'></mt-field>
                    <mt-field label='客户是否失联' :value="boolenFormat(myData['outsource_apply']['is_customer_lost'])"  :readonly='true'></mt-field>
                    <mt-field label='是否有担保人' :value="boolenFormat(myData['outsource_apply']['is_have_guarantor'])"  :readonly='true'></mt-field>
                    <mt-field label='客户逾期情况' :value="myData['outsource_apply']['due_situation']"  :readonly='true'></mt-field>
                    <mt-field label='委外催收单位或者个人' :value="myData['outsource_apply']['outsource_unit']"  :readonly='true'></mt-field>
                    <mt-field label='委外催收收费标准' :value="myData['outsource_apply']['outsource_charge_standard']"  :readonly='true'></mt-field>
                </div>
            </mtitle>
        </div>

        <div class="container_item" v-if="myData['businessType']=='车易贷'">
            <mtitle :title="'移交法务'">
                <div slot="list">
                    <mt-field label='客户车辆目前情况' :value="myData['hand_to_legal']['car_situation']"  :readonly='true'></mt-field>
                    <mt-field label='贷后意见' :value="myData['hand_to_legal']['loan_opinion']"  :readonly='true'></mt-field>
                    <mt-field label='推迟移交说明' :value="myData['hand_to_legal']['delay_transfer_instructions']"  :readonly='true'></mt-field>
                    <mt-field label='其他财产情况' :value="myData['hand_to_legal']['other_asset_situation']"  :readonly='true'></mt-field>
                </div>
            </mtitle>
        </div>

        <div class="container_item" v-if="myData['businessType']=='房速贷标准件' || myData['businessType']=='房速贷非标准件'">
            <mtitle :title="'移交催收信息'">
                <div slot="list">
                    <mt-field label='出款人' :value="myData['hand_to_base_info']['payee']"  :readonly='true'></mt-field>
                    <mt-field label='逾期日期' :value="myData['hand_to_base_info']['overdue_date']|timeYMD"  :readonly='true'></mt-field>
                    <mt-field label='逾期情况描述' :value="myData['hand_to_base_info']['overdue_desc']"  :readonly='true'></mt-field>
                    <mt-field label='未能覆盖的风险敞口' :value="myData['hand_to_base_info']['fail_cover_risk']"  :readonly='true'></mt-field>
                    <mt-field label='转账收据张数' :value="myData['hand_to_base_info']['transfer_receipt_number']"  :readonly='true'></mt-field>
                    <mt-field label='现金收据张数' :value="myData['hand_to_base_info']['cash_receipt_number']"  :readonly='true'></mt-field>
                    <mt-field label='还款收据第二联是否在客户手上' :value="myData['hand_to_base_info']['is_pay_receipt_in_customer']|booleanToCnString"  :readonly='true'></mt-field>
                    <mt-field label='需补签的文件' :value="myData['hand_to_base_info']['retroactive_file']"  :readonly='true'></mt-field>
                    <mt-field label='保证人姓名或名称' :value="myData['hand_to_measures_info']['guarantor_name']"  :readonly='true'></mt-field>
                    <mt-field label='反保证人姓名或名称' :value="myData['hand_to_measures_info']['fan_guarantor_name']"  :readonly='true'></mt-field>
                    <mt-field label='质押物名称' :value="myData['hand_to_measures_info']['pledge_name']"  :readonly='true'></mt-field>
                    <mt-field label='质押物剩余价值' :value="myData['hand_to_measures_info']['pledge_surplus_value']|appendMoneyUnitIfNotNullOrEmpty(0)"  :readonly='true'></mt-field>
                    <mt-field label='其他担保措施' :value="myData['hand_to_measures_info']['other_guarantee_mesure']"  :readonly='true'></mt-field>
                </div>
            </mtitle>
        </div>

        <div class="container_item">
            <mtitle :title="'会计还款确认审核'">
                <div slot="list">
                     <mtitle v-for="(data,index) in myData['accountant_confirm_pass']" :key="index"  :title="+index + 1">
                        <div slot="list">
                            <mt-field label='审核备注' :value="accFormat(index,'审核',data)"  :readonly='true'></mt-field>
                            <mt-field label='退回原因' :value="accFormat(index,'退回',data)"  :readonly='true'></mt-field>
                            <mt-field label='返审核原因' :value="accFormat(index,'返审核',data)"  :readonly='true'></mt-field>
                        </div>
                     </mtitle>
                </div>
            </mtitle>
        </div>
        
    </div>
</template>

<script>
// field组件
import mtField from 'components/field/field.vue'

// 详情组件
import mtitle from 'mycomponents/businessDetails/title.vue'
export default {
    name: 'afterLoan',
    data() {
        return {
            myData: null
        }
    },
    components: {
        mtField,
        mtitle
    },
    filters:{
        collectionTitle(index){
            index++;
            return `第${index}次催收分配`;
        }
    },
    methods:{
        boolenFormat(num){
            if(!num || num==0){
                return '否';
            }
            return '是';
        },
        collection(index,str){
            index++;
            if(!str){
                str="";
            }
            return `第${index}次分配：${str}`;
        },
        collectionType(index,type){
            index++;
            var strfs="自动分配";
            if(type==1){
                strfs = "手动分配";
            }
            return `第${index}次分配：${strfs}`;
        },
        accFormat(index,remk,obj){
            index++;
            return `第${index}次${remk}:${obj.accountant_confirm_remark}(${obj.create_time})`;
        }
    },
    beforeMount() {
        this.api.Common.CommonApi_GetAfterLoan({
            businessid: this.$route.params.id,
            afterbusinessid: this.$route.params.afterId
        }).then(result => {
            this.myData = result.Data;
        });
    }
}
</script>