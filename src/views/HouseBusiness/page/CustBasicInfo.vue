<template>
<div>
  <div v-if="myData && myData.length > 0">
     <div class="container_item" v-for="(data, index) in myData" v-if="myData.length > 0">
        <mtitle :title="'借款人' + (+index + 1)"> 
           <div slot="list">
             <mt-field label="借款人名称" :value = "data['customer_list']['customer_name']+ ternaryExpression(data['customer_list']['check_card_no_status']==1 , '(已验证身份证)','(未验证身份证)')"      :readonly = 'true' ></mt-field>
             <mt-field label="借款人类型" :value = "data['customer_list']['customer_type']"      :readonly = 'true' ></mt-field>
             <mt-field label="手机号码"   :value = "data['customer_list']['phone_number']"       :readonly = 'true' ></mt-field>
             <mt-field label="身份证号码" :value = "data['customer_list']['identify_card']"      :readonly = 'true' ></mt-field>
             <mt-field label="住所"       :value = "data['customer_list']['province'] + '' +
                                                    data['customer_list']['city'] + 
                                                    data['customer_list']['county'] +
                                                    data['customer_list']['house_address'] | clearNull" :readonly = 'true' ></mt-field>
             <mt-field label="行业"       :value = "data['customer_list']['profession']"         :readonly = 'true' ></mt-field>

             <div class="container_item_list_children" v-if="index==0">
                <div class="container_item">
                   <mtitle :title="'借款人基本信息'">
                      <div slot="list">
                        <mt-field label="借款人"       :value = "data['fsd_customer']['customer_name']+' '+data['fsd_customer']['customer_type']|clearNull"  :readonly = 'true' ></mt-field>
                        <mt-field label="联系人"     :value = "data['fsd_customer']['contact_name']"   :readonly = 'true' ></mt-field>
                        <mt-field label="手机号码"     :value = "data['fsd_customer']['phone_number']"   :readonly = 'true' ></mt-field>
                        <mt-field label="身份证号码"   :value = "data['fsd_customer']['identify_card']"  :readonly = 'true' ></mt-field>
                        <mt-field label="是否大陆居民"   :value = "data['fsd_customer']['ismainland_resident']|booleanToCnString"  :readonly = 'true' ></mt-field>
                        <mt-field label="已来本地"   :value = "data['fsd_customer']['stay_year']|appendYearUnitIfNotNullOrEmpty"  :readonly = 'true' ></mt-field>
                        <mt-field label="年龄"         :value = "data['fsd_customer']['age']"            :readonly = 'true' ></mt-field>
                        <mt-field label="性别"         :value = "data['fsd_customer']['sex']"            :readonly = 'true' ></mt-field>
                        <mt-field label="民族"         :value = "data['nation_name']"                    :readonly = 'true' ></mt-field>
                        <mt-field label="婚姻状况"     :value = "data['fsd_customer']['wed_status']"     :readonly = 'true' ></mt-field>
                        
                        <mt-field label="营业执照号"     :value = "data['fsd_customer']['business_licence']" v-if="isCompany(data)"    :readonly = 'true' ></mt-field>
                        <mt-field label="企业类型"     :value = "data['fsd_customer']['company_type']" v-if="isCompany(data)"    :readonly = 'true' ></mt-field>
                        <mt-field label="成立日期"     :value = "data['fsd_customer']['company_found']|timeYMD" v-if="isCompany(data)"    :readonly = 'true' ></mt-field>
                        <mt-field label="注册资本"     :value = "data['fsd_customer']['register_capital']" v-if="isCompany(data)"    :readonly = 'true' ></mt-field>
                        <mt-field label="法定代表人"     :value = "data['fsd_customer']['company_legal_person']" v-if="isCompany(data)"    :readonly = 'true' ></mt-field>
                        <mt-field label="实际控制人"     :value = "data['fsd_customer']['actual_controller']" v-if="isCompany(data)"    :readonly = 'true' ></mt-field>

                        <mt-field label="借款人情况"   :value = "data['fsd_customer']['borrower_info']"  :readonly = 'true' ></mt-field>
                        <mt-field label="法院执行情况" :value = "data['fsd_customer']['court_execute']"  :readonly = 'true' ></mt-field>
                        <mt-field label="经营范围"     :value = "data['fsd_customer']['operate_range']" v-if="isCompany(data)"    :readonly = 'true' ></mt-field>
                        <mt-field label="所处行业"     :value = "data['customer_list']['profession'] + '' + 
                                                                 data['fsd_customer']['other_profession']
                                                                 | clearNull"                            :readonly = 'true' ></mt-field>
                        <mt-field label="现住宅地址"   :value = "data['fsd_customer']['province'] + '' +
                                                                 data['fsd_customer']['city'] + 
                                                                 data['fsd_customer']['county'] + 
                                                                 data['fsd_customer']['house_address']
                                                                 | clearNull"                            :readonly = 'true' ></mt-field>
                      </div>
                    </mtitle>
                </div>

                <div class="container_item">
                    <mtitle :title="'客户详情'">
                         <div slot="list">
                           <mt-field label="教育程度"        :value = "data['fsd_customer']['education']"         :readonly = 'true'></mt-field>
                           <mt-field label="电子邮箱"        :value = "data['fsd_customer']['email']"             :readonly = 'true'></mt-field>
                           <mt-field label="现住宅入住时间"  :value = "data['fsd_customer']['begin_stay_time'] | timeYMD"   :readonly = 'true'></mt-field>
                           <mt-field label="现住宅电话"      :value = "appendIfNotNullOrEmpty(data['fsd_customer']['current_phone_area_code'] , '-') + 
                                                                       data['fsd_customer']['current_phone_numerber'] | clearNull" 
                                                                                                                  :readonly = 'true'></mt-field>
                           <mt-field label="住房性质"        :value = "data['fsd_customer']['house_type'] + 
                                                                       appendUnitAfterMoneyIfNotNullOrEmpty(data['fsd_customer']['house_money'],'元/月')
                                                                       | clearNull "                              :readonly = 'true'></mt-field>
                           <mt-field label="户口所在地"      :value = "data['fsd_customer']['account_address']"   :readonly = 'true'></mt-field>
                         </div>
                     </mtitle>
                </div>

                 <div class="container_item">
                    <mtitle :title="'职业信息'">
                         <div slot="list">
                           <mt-field label="单位全称"  :value = "data['fsd_customer']['company_name']"              :readonly = 'true'></mt-field>
                           <mt-field label="所属行业"  :value = "data['fsd_customer']['company_type']"              :readonly = 'true'></mt-field>
                           <mt-field label="职务"      :value = "data['fsd_customer']['job_duty']"                  :readonly = 'true'></mt-field>
                           <mt-field label="入职时间"  :value = "data['fsd_customer']['job_start_time'] | timeYMD"  :readonly = 'true'></mt-field>
                           <mt-field label="单位性质"  :value = "data['fsd_customer']['company_property'] + '' + 
                                                                 data['fsd_customer']['company_property_explain']
                                                                  | clearNull"                                      :readonly = 'true'></mt-field>

                           <mt-field label="月收入"    :value = "data['fsd_customer']['job_pay'] | appendUnitAfterMoneyIfNotNullOrEmpty('元/月')"  :readonly = 'true'></mt-field>
                           <mt-field label="其他收入"  :value = "appendUnitAfterMoneyIfNotNullOrEmpty(data['fsd_customer']['other_pay'], '元/月') + 
                                                                 data['fsd_customer']['other_pay_explain'] | clearNull"  :readonly = 'true'></mt-field>

                           <mt-field label="单位地址"  :value = "data['fsd_customer']['company_address']" :readonly = 'true'></mt-field>
                         </div>
                     </mtitle>
                </div>
                
                <div class="container_item">
                    <mtitle :title="'私营业主信息'">
                         <div slot="list">
                           <mt-field label="公司名称"          :value = "data['fsd_customer']['private_company_name']"      :readonly = 'true'></mt-field>
                           <mt-field label="成立时间"          :value = "data['fsd_customer']['organization_create_time']| timeYMD"  :readonly = 'true'></mt-field>

                           <mt-field label="组织形式"          :value = "data['fsd_customer']['organization_type'] + 
                                                                         appendIfNotNullOrEmpty(data['fsd_customer']['organization_share'] ,'%')
                                                                         | clearNull"  :readonly = 'true'></mt-field>

                           <mt-field label="法人"              :value = "data['fsd_customer']['legal_person']"   :readonly = 'true'></mt-field>
                           <mt-field label="经营范围"          :value = "data['fsd_customer']['business_range']" :readonly = 'true'></mt-field>
                           <mt-field label="其他股东占股情况"  :value = "data['fsd_customer']['other_partner']"  :readonly = 'true'></mt-field>
                         </div>
                     </mtitle>
               </div>
             </div>
           </div>
         </mtitle>
      </div>
  </div>
  <div class="emptyDataDiv" v-else-if="init && myData">
     <div class='emptyDataImg'></div>
     <p class="emptyDataText">没有数据哦</p>
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
      myData: null,
      init: false
    }
  },
  methods:{
    isCompany(data){
      return data['fsd_customer']['customer_type']=='企业'
    }
  },
  components:{
    mtField,
    mtitle
  },
  beforeMount () {
    this.api.HouseBusiness.HouseBusinessApi_GetHouseCustomerInfo(this.$route.params.id).then(result => {
        this.init = true
        this.myData = result.Data
    })
  }
};
</script>


<style lang="scss" scoped>
@import "./../../../sass/variables";
@import "./../../../sass/func";

.emptyDataDiv {
      display:flex;
      justify-content:center;
      align-items:center;
      flex-direction:column;
      .emptyDataImg {
          width:pxToRem(250px);
          height:pxToRem(250px);
          background:url("./../../../images/emptyData.png") no-repeat center center / cover;
          background-size: cover;
      }
      .emptyDataText {
          color:#000;
          font-size:pxToRem(32px);
          margin-top:pxToRem(50px);
      }
}
</style>
