<template>
<div v-if="myData">
    <mtitle :title="'贷款信息'">
         <div slot="list">
             <mt-field label="申请金额"              :value = "myData['business_base_info']['BORROW'] | appendMoneyUnitIfNotNullOrEmpty(0)"    :readonly = 'true' ></mt-field>
             <mt-field label="申请期限"              :value = "myData['business_base_info']['MONTHS'] | appendIfNotNullOrEmptyDefault('个月', 0)"  :readonly = 'true' ></mt-field>
             <mt-field label="还款方式"              :value = "myData['fsd_biz_extension']['repayment_type']"        :readonly = 'true' ></mt-field>
             <mt-field label="利息"                  :value = "myData['business_base_info']['borrow_rate']"  v-if="isOnline()"        :readonly = 'true' ></mt-field>
             <mt-field label="抵押权人"              :value = "myData['business_output']['Pledee']"     v-if="isOnline()"               :readonly = 'true' ></mt-field>
             <mt-field label="债权人、出借人"        :value = "myData['business_output']['Lender']"      v-if="isOnline()"              :readonly = 'true' ></mt-field>
             <!-- todo else isNotOnline -->
             <mt-field label="风控专员是否上门调查"  :value = "myData['business_base_info']['isvisiit_verification']
                                                               | booleanToCnString"                                  :readonly = 'true' ></mt-field>
             <mt-field label="家人是否知晓此借款"    :value = "myData['fsd_biz_extension']['family_isknow_borrow']"  :readonly = 'true' ></mt-field>
             <mt-field label="借款用途"              :value = "myData['fsd_biz_extension']['borrow_purpose_type'] === '其他' ? 
                                                               myData['fsd_biz_extension']['borrow_purpose_explain'] : 
                                                               myData['fsd_biz_extension']['borrow_purpose_type'] "  :readonly = 'true' ></mt-field>
         </div>
     </mtitle>

    <mtitle :title="'客户银行卡信息'" v-if="isOnline()">
         <div slot="list">
              <mt-field label="开户名"         :value = "myData['output_list']['CUSTOMER_NAME']"  :readonly = 'true'></mt-field>
              <mt-field label="银行账号"       :value = "myData['output_list']['BANK_ACCOUNT']"   :readonly = 'true'></mt-field>
              <mt-field label="开户行"         :value = "myData['output_list']['BANK_NAME']"      :readonly = 'true'></mt-field>
              <mt-field label="支行名称"       :value = "myData['output_list']['BANK_SUBNAME']"   :readonly = 'true'></mt-field>
              <mt-field label="银行卡归属地省" :value = "myData['output_list']['Bank_Provice']"   :readonly = 'true'></mt-field>
              <mt-field label="银行卡归属地市" :value = "myData['output_list']['Bank_City']"      :readonly = 'true'></mt-field>
              <mt-field label="转账类型"       :value = "myData['output_list']['OUTPUT_TYPE']"    :readonly = 'true'></mt-field>
         </div>
     </mtitle>

     <mtitle :title="'业务信息'">
         <div slot="list">
              <mt-field label="是否标准件"    :value = "myData['business_baseinfo_extend']['Business_Type_Details']"  :readonly = 'true'></mt-field>
              <mt-field label="非标准件原因"  :value = "myData['business_baseinfo_extend']['Nonstandard_Reason']"     :readonly = 'true'></mt-field>
              <mt-field label="业务来源"      :value = "myData['business_base_info']['SOURCE']"                       :readonly = 'true'></mt-field>
              <mt-field label="介绍人"        :value = "myData['business_base_info']['INTRODUCER']"                   :readonly = 'true'></mt-field>
              <mt-field label="备注"          :value = "myData['business_base_info']['REMARK']"                       :readonly = 'true'></mt-field>
         </div>
     </mtitle>
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
  methods:{
        isOnline(){
            return this.myData['out_type']==1;
        },
        isNotT150(){
            return this.myData['business']['business_type_detail']!='T150'
        }
  },
  components:{
    mtField,
    mtitle
  },
  beforeMount () {
    this.api.HouseBusiness.HouseBusinessApi_GetHouseDetails(this.$route.params.id).then(result => {
        console.log(result)
        this.myData = result.Data
     })
  }
};
</script>