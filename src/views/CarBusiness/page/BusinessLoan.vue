<template>
<div v-if="myData"><!-- todo 缺少属性：h5 -->
  <div class="container_item">
      <mtitle :title="'个人资料'">
          <div slot="list">
              <mt-field label="姓名"            :value = "myData['car_personal']['name']"                     :readonly = 'true' ></mt-field>
              <mt-field label="年龄"            :value = "myData['car_personal']['age']"                      :readonly = 'true' ></mt-field>
              <mt-field label="性别"            :value = "myData['car_personal']['sex']"                      :readonly = 'true' ></mt-field>
              <mt-field label="民族"            :value = "myData['nation_name']"                              :readonly = 'true' ></mt-field>
              <mt-field label="籍贯"            :value = "myData['car_personal']['nativeplace']"                              :readonly = 'true' ></mt-field>
              <mt-field label="本地家庭成员"            :value = "myData['car_personal']['local_family_members']"                              :readonly = 'true' ></mt-field>
              <mt-field label="子女数"            :value = "myData['car_personal']['children_number']"                              :readonly = 'true' ></mt-field>
              <mt-field label="婚姻状况"        :value = "myData['car_personal']['marriage']"                 :readonly = 'true' ></mt-field>
              <mt-field label="身份证号码"      :value = "myData['car_personal']['id_card_no']"               :readonly = 'true' ></mt-field>
              <mt-field label="是否大陆居民"    :value = "myData['car_personal']['IsMainlandResident'] | booleanToCnString"       :readonly = 'true' ></mt-field>
              <mt-field label="教育程度"        :value = "myData['car_personal']['education']"                :readonly = 'true' ></mt-field>
              <mt-field label="手机号码"        :value = "myData['car_personal']['mobile_phone']"             :readonly = 'true' ></mt-field>
              <mt-field label="电子邮箱"        :value = "myData['car_personal']['email']"                    :readonly = 'true' ></mt-field>
              <!--<mt-field label="户口所在地"      :value = "myData['car_personal']['id_card_sheng']"            :readonly = 'true' ></mt-field>
              -->
              <mt-field label="现住宅地址"      :value = "myData['car_personal']['current_address']"            :readonly = 'true' ></mt-field>
              <mt-field label="现住宅电话"      :value = "myData['car_personal']['current_phone_area_code']+'-'+myData['car_personal']['current_phone_code']|clearNull"  :readonly = 'true' ></mt-field>
              <mt-field label="现住宅入住时间"  :value = "myData['car_personal']['begin_stay_time'] | timeYMD"          :readonly = 'true' ></mt-field>
              <mt-field label="住房性质"        :value = "myData['car_personal']['house_type']+wrapIfNotNullOrEmpty(myData['car_personal']['house_money'],' ','元/月')|clearNull"               :readonly = 'true' ></mt-field>
              <mt-field label="已来本地"        :value = "myData['car_personal']['stay_year']|appendYearUnitIfNotNullOrEmpty"                :readonly = 'true' ></mt-field>
          </div>
      </mtitle>
  </div>

  <div class="container_item">
     <mtitle :title="'申请信息'">
          <div slot="list">
            <mt-field label="申请借款金额"            :value = "appendMoneyUnitIfNotNullOrEmpty(myData['car_apply']['apply_money'])"       :readonly = 'true'></mt-field>
            <mt-field label="申请借款期限"            :value = "appendMonthUnitIfNotNullOrEmpty(myData['car_apply']['apply_time_limit'])"  :readonly = 'true'></mt-field>
            <mt-field label="计划还款来源"            :value = "myData['car_apply']['repayment_source']"  :readonly = 'true'></mt-field>
            <mt-field label="家人是否知晓此借款 "     :value = "myData['car_apply']['family_isknow']"     :readonly = 'true'></mt-field>
            <mt-field label="节假日是否驾驶车辆离省"  :value = "myData['car_apply']['holiday_isaway']"    :readonly = 'true'></mt-field>
            <mt-field label="手机号码"                :value = "myData['car_personal']['mobile_phone']"      :readonly = 'true'></mt-field>
            <mt-field label="电子邮箱"                :value = "myData['car_personal']['email']"             :readonly = 'true'></mt-field>
            <mt-field label="贷款用途"                :value = "myData['car_apply']['purpose_type'] + wrapIfNotNullOrEmpty( myData['car_apply']['purpose_explain'],'[',']') | clearNull"  :readonly = 'true'></mt-field>
          </div>
      </mtitle>
  </div>

  <div class="container_item">
      <mtitle :title="'职业信息'">
           <div slot="list">
             <mt-field label="单位全称"  :value = "myData['car_job']['company_name']"                            :readonly = 'true'></mt-field>
             <mt-field label="行业类别"  :value = "myData['car_job']['industry_category']"                            :readonly = 'true'></mt-field>
             <mt-field label="职务"      :value = "myData['car_job']['job_duty']"                                :readonly = 'true'></mt-field>
             <mt-field label="入职时间"  :value = "myData['car_job']['job_start_time']|timeYMD"                  :readonly = 'true'></mt-field>
             <mt-field label="单位性质"  :value = "myData['car_job']['company_property']"                        :readonly = 'true'></mt-field>
             <mt-field label="单位地址"  :value = "myData['car_job']['company_address']"                         :readonly = 'true'></mt-field>
             <mt-field label="月收入"    :value = "appendMoneyUnitIfNotNullOrEmpty(myData['car_job']['job_pay'])"   :readonly = 'true'></mt-field>
             <mt-field label="其他收入"  :value = "appendMoneyUnitIfNotNullOrEmpty(myData['car_job']['other_pay'])" :readonly = 'true'></mt-field>
             <mt-field label="企业电话"  :value = "myData['car_job']['company_phone']"                           :readonly = 'true'></mt-field>
           </div>
       </mtitle>
  </div>


  <div class="container_item">
      <mtitle :title="'私营业主信息'">
           <div slot="list">
            <mt-field label="组织形式"  :value = "myData['car_job']['organization_type'] + appendIfNotNullOrEmpty(myData['car_job']['organization_share'] , '%') |clearNull"   :readonly = 'true'></mt-field>
            <mt-field label="成立时间"  :value = "timeYMD(myData['car_job']['organization_create_time'])"   :readonly = 'true'></mt-field>
            <mt-field label="公司名称"  :value = "myData['car_job']['private_company_name']"                :readonly = 'true'></mt-field>
           </div>
       </mtitle>
  </div>


  <div class="container_item">
      <mtitle :title="'联系人资料'">
         <div slot="list">
             <mt-field label="配偶姓名"                 :value = "myData['car_contacts']['mate_name']" :readonly = 'true'></mt-field>

              <mt-field label="电话号码&手机"           :value = "appendIfNotNullOrEmpty(myData['car_contacts']['mate_phone'], '&')  + myData['car_contacts']['mate_mobilephone'] | clearNull"         :readonly = 'true'></mt-field>

              <mt-field label="直系亲属姓名及关系"      :value = "appendIfNotNullOrEmpty(myData['car_contacts']['directly_person'], '&') + myData['car_contacts']['directly_person_relation']|clearNull"  :readonly = 'true'></mt-field>

              <mt-field label="手机号码"                :value = "myData['car_contacts']['directly_person_mobilephone']"   :readonly = 'true'></mt-field>

              <mt-field label="其他联系人及关系"        :value = "appendIfNotNullOrEmpty(myData['car_contacts']['other_person'], '&') + myData['car_contacts']['other_person_relation']|clearNull"      :readonly = 'true'></mt-field>

              <mt-field label="手机号码"                :value = "myData['car_contacts']['other_person_mobilephone']"   :readonly = 'true'></mt-field>
          </div>
     </mtitle>
  </div>

  <div class="container_item">
    <mtitle :title="'业务信息'">
         <div slot="list">
            <mt-field label="业务获取人"       :value = "myData['car_business']['origin_person']"   :readonly = 'true'></mt-field>
            <mt-field label="业务来源"         :value = "myData['car_business']['origin_type']"     :readonly = 'true'></mt-field>
            <mt-field label="介绍人"           :value = "myData['car_business']['introducer']"      :readonly = 'true'></mt-field>
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
  beforeMount () {
    this.api.CarBusiness.CarBusinessApi_BusinessLoan(this.$route.params.id).then(result => {
        console.log(result)
        this.myData = result.Data
     })
  }
};
</script>