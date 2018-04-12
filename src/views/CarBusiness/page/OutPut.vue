<template>
<div v-if="myData">
  <div class="container_item">
    <mtitle :title="'基本信息'">
      <div slot="list">
        <mt-field label="客户名称"              :value = "myData['lent_out_detail']['output_info']['CUSTOMER_NAME']"       :readonly = 'true'></mt-field>
        <mt-field label="业务编号"              :value = "myData['lent_out_detail']['output_info']['BUSINESS_ID']"         :readonly = 'true'></mt-field>
        <mt-field label="业务类型"              :value = "myData['lent_out_detail']['business_type']"                      :readonly = 'true'></mt-field>
        <mt-field label="借款金额/银承金额"     :value = "myData['lent_out_detail']['output_info']['OUT_MONEY']"           :readonly = 'true'></mt-field>
        <mt-field label="最终审批还款方式"      :value = "myData['lent_out_detail']['repayment_type']"                     :readonly = 'true'></mt-field>
        <mt-field label="借款期限/银承天数"     :value = "myData['lent_out_detail']['output_info']['OUT_MONTH']"           :readonly = 'true'></mt-field>
        <mt-field label="费率/最终审批借款利率" :value = "myData['lent_out_detail']['final_repay_rate']"                   :readonly = 'true'></mt-field>
        <mt-field label="缺失险种"              :value = "myData['lent_out_detail']['output_info']['Lackconverage']"       :readonly = 'true'></mt-field>
        <mt-field label="出借人、债权人"        :value = "myData['lent_out_detail']['output_info']['Lender']"              :readonly = 'true'></mt-field>
        <mt-field label="抵押权人"              :value = "myData['lent_out_detail']['output_info']['Pledee']"              :readonly = 'true'></mt-field>
        <mt-field label="合同类型"              :value = "myData['is_can_edit']"                                           :readonly = 'true'></mt-field>
        <mt-field label="合同签订日期"          :value = "myData['lent_out_detail']['output_info']['contract_award_date']" :readonly = 'true'></mt-field>
      </div>
    </mtitle>
  </div>
  

  <div class="container_item" v-if="myData['lent_out_detail']['fee_list'].length > 0">
      <mtitle :title="'押金类费用'">
          <div slot="list">
             <mt-field v-for="(data, index) in myData['lent_out_detail']['fee_list']" 
                    :key="index"
                    v-if="data['fee_type_name'] === '押金类费用'"
                    :label="data['fee_item_name']"
                    :value = "data['fee_value']"      
                    :readonly = 'true'>
              </mt-field>
          </div>
      </mtitle>
  </div>


  <div class="container_item" v-if="myData['lent_out_detail']['fee_list'].length > 0">
      <mtitle :title="'担保公司费用'">
          <div slot="list">
              <mt-field v-for="(data, index) in myData['lent_out_detail']['fee_list']" 
                        :key="index"
                        v-if="data['fee_type_name'] === '担保公司费用'"
                        :label="data['fee_item_name']"
                        :value = "data['fee_value']"      
                        :readonly = 'true'>
             </mt-field>
          </div>
      </mtitle>
  </div>

  <div class="container_item" v-if="myData['lent_out_detail']['fee_list'].length > 0">
      <mtitle :title="'分公司费用'">
          <div slot="list">
               <mt-field v-for="(data, index) in myData['lent_out_detail']['fee_list']" 
                         :key="index"
                         v-if="data['fee_type_name'] === '分公司费用'"
                         :label="data['fee_item_name']"
                         :value = "data['fee_value']"      
                         :readonly = 'true'>
              </mt-field>
          </div>
      </mtitle>
  </div>


  <div class="container_item" v-if="myData['lent_out_detail']['fee_list'].length > 0">
      <mtitle :title="'团贷网平台费用'">
          <div slot="list">
               <mt-field v-for="(data, index) in myData['lent_out_detail']['fee_list']" 
                        :key="index"
                         v-if="data['fee_type_name'] === '团贷网平台费用'"
                         :label="data['fee_item_name']"
                         :value = "data['fee_value']"      
                         :readonly = 'true'>
              </mt-field>
          </div>
      </mtitle>
  </div>

  <div class="container_item" v-if="myData['lent_out_detail']['fee_list'].length > 0">
      <mtitle :title="'中介费'">
          <div slot="list">
                <mt-field v-for="(data, index) in myData['lent_out_detail']['fee_list']"
                          :key="index" 
                          v-if="data['fee_type_name'] === '中介费'"
                          :label="data['fee_item_name']"
                          :value = "data['fee_value']"      
                          :readonly = 'true'>
               </mt-field>
          </div>
      </mtitle>
  </div>

  <div class="container_item">
      <mtitle :title="'特殊情况说明'">
          <div slot="list">
                <mt-field label="特殊情况说明"   :value = "myData['lent_out_detail']['output_info']['SpecialDescript']"  :readonly = 'true'></mt-field>
          </div>
      </mtitle>
  </div>

  <div class="container_item">
      <mtitle :title="'计划出款'">
          <div slot="list">
              <mt-field label="户名"                :value = "myData['lent_out_detail']['output_info']['CUSTOMER_NAME']"      :readonly = 'true'></mt-field>
              <mt-field label="账号"                :value = "myData['lent_out_detail']['output_info']['BANK_ACCOUNT']"       :readonly = 'true'></mt-field>
              <mt-field label="开户行"              :value = "myData['lent_out_detail']['output_info']['BANK_NAME']"          :readonly = 'true'></mt-field>
              <mt-field label="支行名称"            :value = "myData['lent_out_detail']['output_info']['BANK_SUBNAME']"       :readonly = 'true'></mt-field>
              <mt-field label="银行卡所在地省"      :value = "myData['lent_out_detail']['output_info']['Bank_Provice']"       :readonly = 'true'></mt-field>
              <mt-field label="银行卡所在地市"      :value = "myData['lent_out_detail']['output_info']['Bank_City']"          :readonly = 'true'></mt-field>
              <mt-field label="计划出款备注"        :value = "myData['lent_out_detail']['output_info']['REMARK']"             :readonly = 'true'></mt-field>
              <mt-field label="计划出款1"           :value = "myData['lent_out_detail']['output_info']['output_detail']"      :readonly = 'true'></mt-field>
              <mt-field label="计划出款时间"        :value = "myData['lent_out_detail']['output_info']['OUTPUT_TIME']"        :readonly = 'true'></mt-field>
              <mt-field label="计划出款金额（元）"  :value = "myData['lent_out_detail']['output_info']['OUTPUT_MONEY']"       :readonly = 'true'></mt-field>
              <mt-field label="实际出款时间"        :value = "myData['lent_out_detail']['output_info']['Actual_OutTime']"     :readonly = 'true'></mt-field>
              <mt-field label="转账类型"            :value = "myData['lent_out_detail']['output_info']['OUTPUT_TYPE']"        :readonly = 'true'></mt-field>
              <mt-field label="合并出款时间至"      :value = "myData['lent_out_detail']['output_info']['output_detail']"      :readonly = 'true'></mt-field>
              <mt-field label="出款经办人"          :value = "myData['lent_out_detail']['output_info']['Actual_OutOperator']" :readonly = 'true'></mt-field>
              <mt-field label="实际出款备注"        :value = "myData['lent_out_detail']['output_info']['Actual_Mark']"        :readonly = 'true'></mt-field>
          </div>
      </mtitle>
  </div>
    
  <div class="container_item">
      <mtitle :title="'备注'">
          <div slot="list">
             <mt-field label="内容"                  :value = "myData['lent_out_detail']['output_info']['REMARK']"  :readonly = 'true'></mt-field>
             <mt-field label="是否绑定银行卡代扣"    :value = "myData['check_bind_card']"                           :readonly = 'true'></mt-field>
             <mt-field label="是否已授权银行存管"    :value = "myData['check_cun_guan_register']"                   :readonly = 'true'></mt-field>
             <mt-field label="是否上标放款"          :value = "myData['check_off_line']"                            :readonly = 'true'></mt-field>
             <mt-field label="代扣贷后金额确认情况"  :value = "myData['confirm_auto_repay_status']"                 :readonly = 'true'></mt-field>
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
  data () {
    return {
      myData: null
    }
  },
  components:{
    mtField,
    mtitle
  },
  beforeMount () {
    this.api.Common.CommonApi_LentOutDetail(this.$route.params.id).then(result => {
        console.log(result.Data)
        this.myData = result.Data;
    })
  }
};
</script>
