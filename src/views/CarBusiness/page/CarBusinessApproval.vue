<template>
<div v-if="myData">
  <div class="container_item" v-if="isOnline()">
    <mtitle :title="'客户银行卡信息'">
        <div slot="list">
            <mt-field label="开户名"             :value = "myData['output_list']['CUSTOMER_NAME']"   :readonly = 'true'></mt-field>
            <mt-field label="银行卡账号"         :value = "myData['output_list']['BANK_ACCOUNT']"   :readonly = 'true'></mt-field>
            <mt-field label="开户行"             :value = "myData['output_list']['BANK_NAME']"   :readonly = 'true'></mt-field>
            <mt-field label="支行名称"           :value = "myData['output_list']['BANK_SUBNAME']"   :readonly = 'true'></mt-field>
            <mt-field label="银行卡归属地省"     :value = "myData['output_list']['Bank_Provice']"   :readonly = 'true'></mt-field>
            <mt-field label="银行卡归属地市"     :value = "myData['output_list']['Bank_City']"   :readonly = 'true'></mt-field>
            <mt-field label="转账类型"           :value = "myData['output_list']['OUTPUT_TYPE']"   :readonly = 'true'></mt-field>
            <mt-field label="是否绑定银行卡代扣" :value = "myData['is_bind_card']"   :readonly = 'true'></mt-field>
            <mt-field label="绑定代扣平台"       :value = "joinPropertiesValue(myData['platform_list'],['platform_name']).replace('代扣','') "   :readonly = 'true'></mt-field>
            <mt-field label="代扣平台单笔限额"   :value = "joinPropertiesValue(myData['platform_list'],['platform_name','per_time_money']).replace('代扣','')"   :readonly = 'true'></mt-field>
            <mt-field label="代扣平台单日限额"   :value = "joinPropertiesValue(myData['platform_list'],['platform_name','per_day_money']).replace('代扣','')"   :readonly = 'true'></mt-field>
        </div>
    </mtitle>
  </div>


  <div class="container_item" v-if="isNotT150()">
      <mtitle :title="'评估信息'">
          <div slot="list">
             <mt-field label="评估价值"      :value = "myData['car_info']['car_evaluate_money']|appendMoneyUnitIfNotNullOrEmpty"   :readonly = 'true'></mt-field>
      <mt-field label="车辆价值"      :value = "myData['car_info']['car_money']|appendMoneyUnitIfNotNullOrEmpty"   :readonly = 'true'></mt-field>
      <mt-field label="其他价值"      :value = "myData['car_info']['othervalue']|appendMoneyUnitIfNotNullOrEmpty"   :readonly = 'true'></mt-field>
      <mt-field label="其他价值说明"      :value = "myData['car_info']['other_value_explain']"   :readonly = 'true'></mt-field>
      <mt-field label="使用权转移价"  :value = "myData['car_info']['borrowing_money']|appendMoneyUnitIfNotNullOrEmpty"   :readonly = 'true'></mt-field>
          </div>
      </mtitle>
  </div>

  <div class="container_item" v-if="myData.is_display_init_approve">  
    <mtitle :title="'初审信息'">
        <div slot="list">
             <mt-field label="初审车辆抵押额度"  :value = "myData['car_business']['car_mortgage_limit']|appendMoneyUnitIfNotNullOrEmpty"   :readonly = 'true'></mt-field>
              <mt-field label="初审其他额度"  :value = "myData['car_business']['other_money_limit']|appendMoneyUnitIfNotNullOrEmpty"   :readonly = 'true'></mt-field>
              <mt-field label="初审其他额度说明"  :value = "myData['car_business']['other_limit_explain']"   :readonly = 'true'></mt-field>
            <mt-field label="初审借款金额"  :value = "myData['car_business']['trial_borrow_money']|appendMoneyUnitIfNotNullOrEmpty"   :readonly = 'true'></mt-field>
            <mt-field label="初审借款期限"  :value = "myData['car_business']['trial_borrow_date_limit']|appendMonthUnitIfNotNullOrEmpty"   :readonly = 'true'></mt-field>
            <mt-field label="初审还款方式"  :value = "myData['car_business']['trial_repayment_type']"   :readonly = 'true'></mt-field>
            <mt-field label="初审借款利率"  :value = "myData['trial_repay_rate']" v-if="isOnline()"  :readonly = 'true'></mt-field>
              <mt-field label="初审借款费率"  :value = "myData['trial_repay_rate']" v-if="!isOnline()"  :readonly = 'true'></mt-field>
        </div>
    </mtitle>
  </div>


  <div class="container_item">
      <mtitle :title="'复审信息'">
          <div slot="list">
                  <mt-field label="复审车辆抵押额度"  :value = "myData['car_business']['car_mortgage_limit2']|appendMoneyUnitIfNotNullOrEmpty"   :readonly = 'true'></mt-field>
              <mt-field label="复审其他额度"  :value = "myData['car_business']['other_money_limit2']|appendMoneyUnitIfNotNullOrEmpty"   :readonly = 'true'></mt-field>
              <mt-field label="复审其他额度说明"  :value = "myData['car_business']['other_limit_explain2']"   :readonly = 'true'></mt-field>
            <mt-field label="复审借款金额"  :value = "myData['car_business']['final_borrow_money']|appendMoneyUnitIfNotNullOrEmpty"   :readonly = 'true'></mt-field>
            <mt-field label="复审借款期限"  :value = "myData['car_business']['final_borrow_date_limit']|appendMonthUnitIfNotNullOrEmpty"   :readonly = 'true'></mt-field>
            <mt-field label="复审还款方式"  :value = "myData['car_business']['repayment_type']"   :readonly = 'true'></mt-field>
               <mt-field label="复审借款利率"  :value = "myData['final_repay_rate']" v-if="isOnline()"  :readonly = 'true'></mt-field>
              <mt-field label="复审借款费率"  :value = "myData['final_repay_rate']" v-if="!isOnline()"  :readonly = 'true'></mt-field>
          </div>
      </mtitle>
  </div>

  <div class="container_item">
      <mtitle :title="'担保人信息'">
          <div slot="list">
              <mt-field label="担保人"            :value = "myData['car_apply']['guarantor']"   :readonly = 'true'></mt-field>
              <mt-field label="担保人身份证号码"  :value = "myData['car_apply']['guarantor_idcard']"   :readonly = 'true'></mt-field>
              <mt-field label="担保人联系地址"    :value = "myData['car_apply']['guarantor_address']"   :readonly = 'true'></mt-field>
              <mt-field label="担保人联系电话"    :value = "myData['car_apply']['guarantor_phone']"   :readonly = 'true'></mt-field>
          </div>
      </mtitle>
  </div>



  <div class="container_item">
      <mtitle :title="'共借人信息'">
          <div slot="list">
             <mt-field label="企业全称"             :value = "myData['car_apply']['enterprise_name']"   :readonly = 'true'></mt-field>
             <mt-field label="组织机构代码"         :value = "myData['car_apply']['organization_code']"   :readonly = 'true'></mt-field>
             <mt-field label="法定代表人"           :value = "myData['car_apply']['legal_person']"   :readonly = 'true'></mt-field>
             <mt-field label="法定代表人身份证号码" :value = "myData['car_apply']['legal_person_idcard']"   :readonly = 'true'></mt-field>
             <mt-field label="企业联系地址"         :value = "myData['car_apply']['enterprise_address']"   :readonly = 'true'></mt-field>
             <mt-field label="企业联系电话"         :value = "myData['car_apply']['enterprise_telephone']"   :readonly = 'true'></mt-field>
          </div>
      </mtitle>
  </div>


  <div class="container_item">
     <mtitle :title="'基本信息'">
         <div slot="list">
            <mt-field label="业务编号"           :value = "myData['business']['business_id']"                :readonly = 'true'></mt-field>
            <mt-field label="财务出款类型"       :value = "isOnline() ? '团贷网线上满标放款' : '按照费率代扣出款'"  v-if="isNotT150()"        :readonly = 'true'></mt-field>
            <mt-field label="业务来源"           :value = "myData['car_business']['origin_type']"                :readonly = 'true'></mt-field>
            <mt-field label="借款人"             :value = "myData['car_personal']['name'] + ternaryExpression(myData['car_personal']['check_card_no_status']==1 , '(已验证身份证)','(未验证身份证)')"                   :readonly = 'true'></mt-field>
            <mt-field label="业务获取人"         :value = "myData['car_business']['origin_person']"   :readonly = 'true'></mt-field>
            <mt-field label="申请利率"           :value = "myData['approval_rate']"  v-if="isOnline()"        :readonly = 'true'></mt-field>
            <mt-field label="申请费率"           :value = "myData['approval_rate']"  v-if="!isOnline()"        :readonly = 'true'></mt-field>
            <mt-field label="申请还款方式"       :value = "myData['car_apply']['apply_repayment_type']"   :readonly = 'true'></mt-field>
            <mt-field label="申请借款金额"       :value = "myData['car_apply']['apply_money']|appendMoneyUnitIfNotNullOrEmpty"            :readonly = 'true'></mt-field>
            <mt-field label="申请借款期限"       :value = "myData['car_apply']['apply_time_limit']|appendMonthUnitIfNotNullOrEmpty"       :readonly = 'true'></mt-field>
            <mt-field label="抵押权人"           :value = "myData['business_output']['Pledee']"    v-if="isNotT150()"             :readonly = 'true'></mt-field>
            <mt-field label="债权人、出借人"     :value = "myData['business_output']['Lender']"     v-if="isNotT150()"            :readonly = 'true'></mt-field>
            <mt-field label="业务类型"           :value = "myData['business_type_detail']"             :readonly = 'true'></mt-field>   
            <!-- todo 合作渠道：api -->
            <mt-field label="发票价/新车指导价"  :value = "myData['car_info']['invoice_cost']|appendMoneyUnitIfNotNullOrEmpty"           :readonly = 'true'></mt-field>
            <mt-field label="车牌号"             :value = "myData['car_info']['license_plate_number']"   :readonly = 'true'></mt-field>
            <mt-field label="汽车型号"           :value = "myData['car_info']['car_model_number']"       :readonly = 'true'></mt-field>
            <mt-field label="行驶证编号"           :value = "myData['car_business']['DocumentID']" v-if="isNotT150()"         :readonly = 'true'></mt-field>
            <mt-field label="缺少险种"           :value = "myData['business_output']['Lackconverage']"          :readonly = 'true'></mt-field>
            <mt-field label="保险到期日期"       :value = "myData['car_info']['insurance_due_date']|timeYMD"     :readonly = 'true'></mt-field>
        
            <mt-field label="借款到期日"         :value = "myData['loan_end_date']"          :readonly = 'true'></mt-field>
            <mt-field label="借款期内是否要续保" :value = "myData['car_info']['is_renewal_ever']"        :readonly = 'true'></mt-field>
            <mt-field label="是否上门核查"       :value = "booleanToCnString(myData['car_business_approve']['IsVisit_Verification']) +ternaryExpression(myData['car_business_approve']['IsVisit_Verification'],'（核查人：'+myData['car_business_approve']['visit_person']+')','')"   :readonly = 'true'></mt-field>
         </div>
     </mtitle>
  </div>
 

  <div class="container_item">
      <mtitle :title="'基本信息核查'">
          <div slot="list">
             <mt-field label="身份证"      :value = "myData['car_personal']['id_card_no']"   :readonly = 'true'></mt-field>
             <mt-field label="工商查询"    :value = "wrapIfNotNullOrEmpty(myData['car_business_approve']['is_gongshang_Illegal'],'是否有违法:',';')+ toEmptyIfNull(myData['car_business_approve']['gongshang_query'])"   :readonly = 'true'></mt-field>
             <mt-field label="法院执行"    :value = "wrapIfNotNullOrEmpty(myData['car_business_approve']['is_court_execute_Illegal'],'是否有违法:',';')+ toEmptyIfNull(myData['car_business_approve']['court_execute'])"   :readonly = 'true'></mt-field>
             <mt-field label="抵押情况"    :value = "wrapIfNotNullOrEmpty(myData['car_business_approve']['is_pledge'],'是否有抵押:',';')+ toEmptyIfNull(myData['car_business_approve']['pledge'])"   :readonly = 'true'></mt-field>
             <mt-field label="查封情况"    :value = "wrapIfNotNullOrEmpty(myData['car_business_approve']['is_seal'],'是否有查封:',';')+ toEmptyIfNull(myData['car_business_approve']['seal'])"   :readonly = 'true'></mt-field>
          </div>
      </mtitle>
  </div>

  <div class="container_item">
      <mtitle :title="'复核人意见'">
          <div slot="list">
             <mt-field label="家庭情况（初审）"           :value = "myData['car_business']['family_situation']"            :readonly = 'true'></mt-field>
             <mt-field label="家庭情况（复审）"  v-if='myData["is_display_init_approve"]'   :value = "myData['car_business']['family_situation2']"            :readonly = 'true'></mt-field>

             <mt-field label="工作情况（初审）"           :value = "myData['car_business']['working_condition']"           :readonly = 'true'></mt-field>
             <mt-field label="工作情况（复审）"     v-if='myData["is_display_init_approve"]'         :value = "myData['car_business']['working_condition2']"           :readonly = 'true'></mt-field>

             <mt-field label="资产情况（初审）"           :value = "myData['car_business']['home_address_estate']"         :readonly = 'true'></mt-field>
             <mt-field label="资产情况（复审）"     v-if='myData["is_display_init_approve"]'         :value = "myData['car_business']['home_address_estate2']"         :readonly = 'true'></mt-field>

             <mt-field label="负债情况及还款来源（初审）" :value = "myData['car_business']['repayment_source_liabilites']" :readonly = 'true'></mt-field>
             <mt-field label="负债情况及还款来源（复审）" v-if='myData["is_display_init_approve"]' :value = "myData['car_business']['repayment_source_liabilites2']" :readonly = 'true'></mt-field>

             <mt-field label="风险点（初审）"             :value = "myData['car_business']['vehicle_history']"             :readonly = 'true'></mt-field>
             <mt-field label="风险点（复审）"       v-if='myData["is_display_init_approve"]'         :value = "myData['car_business']['vehicle_history2']"             :readonly = 'true'></mt-field>

             <mt-field label="防范措施（初审）"           :value = "myData['car_business']['submit_biz_fhr_evaluate']"     :readonly = 'true'></mt-field>
             <mt-field label="防范措施（复审）"      v-if='myData["is_display_init_approve"]'        :value = "myData['car_business']['submit_biz_fhr_evaluate2']"     :readonly = 'true'></mt-field>

             <mt-field label="审批意见（初审）"           :value = "myData['car_business']['submit_biz_fhr_risk']"         :readonly = 'true'></mt-field>
             <mt-field label="审批意见（复审）"      v-if='myData["is_display_init_approve"]'        :value = "myData['car_business']['submit_biz_fhr_risk2']"         :readonly = 'true'></mt-field>
          </div>
      </mtitle>
  </div>

    <!-- todo 模块不完全：h5 -->
</div>
</template>

<script>

// field组件
import mtField from 'components/field/field.vue'

// 详情组件
import mtitle from 'mycomponents/businessDetails/title.vue'

export default {
  name: 'businesscell',
  data () {
    return {
      myData: null
    }
  },
  components:{
    mtField,
    mtitle
  },
  methods:{
        joinPropertiesValue(list,arrProperties){
            if(list&&list.length>0){
                var str='';
                for(var i=0;i<list.length;i++){
                    for(var j=0;j<arrProperties.length;j++){
                      str = str+' ' +list[i][arrProperties[j]];
                    }
                    str = str + ' ';
                }
                return str;
            }
            return '';
        },
        isOnline(){
            return this.myData['business']['business_out_type']==1;
        },
        isNotT150(){
            return this.myData['business']['business_type_detail']!='T150'
        }
  },
  beforeMount () {
    this.api.CarBusiness.CarBusinessApi_CarBusinessApproval(this.$route.params.id).then(result => {
        console.log(result)
        this.myData = result.Data
     })
  }
};
</script>
