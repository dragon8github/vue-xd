<template>
    <div v-if="myData">
        <div class="container_item">
            <mtitle v-for="(data,index) in myData" :key="index"  :title="data.defer_dis_play+'期'" >
                <div slot="list">
                    <mtitle :title="'计划还款'" >
                        <div slot="list">
                            <mt-field label='还款日期' :value="data.business_after.borrow_date|timeYMD" :readonly='true'></mt-field>
                            <mt-field label='本金' :value="data.business_after.current_Principa|appendMoneyUnitIfNotNullOrEmpty(0)" :readonly='true'></mt-field>
                            <mt-field label='利息' :value="data.business_after.current_accrual|appendMoneyUnitIfNotNullOrEmpty(0)" :readonly='true'></mt-field>
                            <mt-field label='服务费' :value="data.business_after.repay_service|appendMoneyUnitIfNotNullOrEmpty(0)" :readonly='true'></mt-field>
                            <mt-field label='其他费用' :value="data.business_after.current_other_money|appendMoneyUnitIfNotNullOrEmpty(0)" :readonly='true'></mt-field>
                            <mt-field label='还款合计' :value="data.total_plan_repayment|appendMoneyUnitIfNotNullOrEmpty(0)" :readonly='true'></mt-field>
                            <mt-field label='逾期天数' :value="data.over_due_days|appendDayUnitIfNotNullOrEmpty(0)" :readonly='true'></mt-field>
                            <mt-field label='违约金' :value="data.overdue_money|appendMoneyUnitIfNotNullOrEmpty(0)" :readonly='true'></mt-field>
                            <mt-field label='还款合计(含违约金)' :value="appendMoneyUnitIfNotNullOrEmpty(sumMoney(data.overdue_money,data.total_plan_repayment),0)" :readonly='true'></mt-field>
                            <mt-field label='状态' :value="data.after_type" :readonly='true'></mt-field>
                        </div>
                    </mtitle>
                    <mtitle :title="'实际还款'" >
                        <div slot="list">
                            <mt-field label='还款日期' :value="data.business_after.fatct_replayDate|timeYMD" :readonly='true'></mt-field>
                            <mt-field label='本金' :value="data.business_after.fact_principa|appendMoneyUnitIfNotNullOrEmpty(0)" :readonly='true'></mt-field>
                            <mt-field label='利息' :value="data.business_after.fact_accrual|appendMoneyUnitIfNotNullOrEmpty(0)" :readonly='true'></mt-field>
                            <mt-field label='服务费' :value="data.business_after.fact_service|appendMoneyUnitIfNotNullOrEmpty(0)" :readonly='true'></mt-field>
                            <mt-field label='其他费用' :value="data.business_after.other_money|appendMoneyUnitIfNotNullOrEmpty(0)" :readonly='true'></mt-field>
                            <mt-field label='还款合计' :value="data.total_fact_repayment|appendMoneyUnitIfNotNullOrEmpty(0)" :readonly='true'></mt-field>
                            <mt-field label='违约金' :value="data.business_after.overdue_money|appendMoneyUnitIfNotNullOrEmpty(0)" :readonly='true'></mt-field>
                            <mt-field label='还款合计(含违约金)' :value="appendMoneyUnitIfNotNullOrEmpty(sumMoney(data.business_after.overdue_money,data.total_fact_repayment),0)" :readonly='true'></mt-field>
                            <mt-field label='备注' :value="data.business_after.remark+wrapIfNotNullOrEmpty(data.business_after.finance_confirmed_date,'(',')')|clearNull" :readonly='true'></mt-field>
                        </div>
                    </mtitle>
                    <mtitle :title="'差额'" >
                        <div slot="list">
                            <mt-field label='本金差额' :value="data.dec_principa_balance|appendMoneyUnitIfNotNullOrEmpty" :readonly='true'></mt-field>
                            <mt-field label='利息差额' :value="data.dec_accrual_balance|appendMoneyUnitIfNotNullOrEmpty" :readonly='true'></mt-field>
                            <mt-field label='服务费差额' :value="data.dec_service_balance|appendMoneyUnitIfNotNullOrEmpty" :readonly='true'></mt-field>
                            <mt-field label='其它金额差额' :value="data.dec_other_money_balance|appendMoneyUnitIfNotNullOrEmpty" :readonly='true'></mt-field>
                            <mt-field label='合计差额' :value="data.dec_total_balance|appendMoneyUnitIfNotNullOrEmpty" :readonly='true'></mt-field>
                            <mt-field label='违约金差额' :value="data.dec_over_due_money_balance|appendMoneyUnitIfNotNullOrEmpty" :readonly='true'></mt-field>
                            <mt-field label='合计差额(含违约金)' :value="data.dec_total_balance_and_over_due_money|appendMoneyUnitIfNotNullOrEmpty" :readonly='true'></mt-field>
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
        beforeMount() {
            this.api.Common.CommonApi_GetRepayPlan(this.$route.params.id).then(result => {
    
                console.log(1, result);
    
                this.myData = result.Data;
    
            });
    
        }
    
    }
</script>