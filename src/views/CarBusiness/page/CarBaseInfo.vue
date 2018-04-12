<template>
<div v-if="myData">
  <div class="container_item" v-for='(item,index) in myData'>
    <mtitle :title="'借款人'+(index+1)">
        <div slot="list">
            <div class="container_item_list_children">
                <div class="container_item">
                    <mtitle :title="'借款人基本信息'">
                        <div slot="list">
                            <mt-field label="借款人"  :value = "personalTypeFormat(item['model_tb_car_personal'])"   :readonly = 'true'></mt-field>
                            <mt-field label="是否主借款人"  :value = "item['model_tb_car_personal']['ismain_customer']==1?'是':'否'"   :readonly = 'true'></mt-field>
                            <mt-field label="是否提供对公账号" v-if="isEnterprise(item['model_tb_car_personal']['customer_type'])"  :value = "item['model_tb_car_personal']['is_company_bank_account']==1?'是':'否'"   :readonly = 'true'></mt-field>
                            <mt-field label="联系人" v-if="isEnterprise(item['model_tb_car_personal']['customer_type'])"  :value = "item['model_tb_car_personal']['contact_name']"   :readonly = 'true'></mt-field>
                            <mt-field label="手机号码"  :value = "item['phone_number']"   :readonly = 'true'></mt-field>
                            <mt-field label="手机号码"  :value = "item['model_tb_car_personal']['id_card_no']"   :readonly = 'true'></mt-field>
                            <mt-field label="是否大陆居民"  :value = "item['model_tb_car_personal']['IsMainlandResident']?'是':'否'"   :readonly = 'true'></mt-field>
                             <mt-field label="已来本地"  :value = "item['model_tb_car_personal']['stay_year']+'年'"   :readonly = 'true'></mt-field>
                             <mt-field label="民族"  :value = "item['nation_name']"   :readonly = 'true'></mt-field>
                             <mt-field label="年龄"  :value = "item['model_tb_car_personal']['age']"   :readonly = 'true'></mt-field>
                             <mt-field label="籍贯"  :value = "item['model_tb_car_personal']['nativeplace']"   :readonly = 'true'></mt-field>
                             <mt-field label="性别"  :value = "item['model_tb_car_personal']['sex']"   :readonly = 'true'></mt-field>
                             <mt-field label="婚姻状况"  :value = "item['model_tb_car_personal']['marriage']"   :readonly = 'true'></mt-field>
                             <mt-field label="户籍地址"  :value = "item['model_tb_car_personal']['id_card_address']"   :readonly = 'true'></mt-field>
                             <mt-field label="手机服务码"  :value = "item['model_tb_car_personal']['mobile_service_code']"   :readonly = 'true'></mt-field>
                             <mt-field v-if="!isEnterprise(item['model_tb_car_personal']['customer_type'])" label="本地家庭成员"  :value = "item['model_tb_car_personal']['local_family_members']"   :readonly = 'true'></mt-field>
                             <mt-field v-if="!isEnterprise(item['model_tb_car_personal']['customer_type'])" label="子女数"  :value = "item['model_tb_car_personal']['children_number']"   :readonly = 'true'></mt-field>
                             <mt-field v-if="isEnterprise(item['model_tb_car_personal']['customer_type'])" label="是否三证合一"  :value = "item['model_tb_cunguan_user']['is_merged_certificate']==1?'是':'否'"   :readonly = 'true'></mt-field>
                             <mt-field v-if="isEnterprise(item['model_tb_car_personal']['customer_type'])" label="统一社会信用代码"  :value = "item['model_tb_cunguan_user']['unifiedCode']"   :readonly = 'true'></mt-field>
                             <mt-field v-if="isEnterprise(item['model_tb_car_personal']['customer_type'])" label="营业执照号"  :value = "item['model_tb_cunguan_user']['businessLicense']"   :readonly = 'true'></mt-field>
                             <mt-field v-if="isEnterprise(item['model_tb_car_personal']['customer_type'])" label="开户许可证"  :value = "item['model_tb_cunguan_user']['bankLicense']"   :readonly = 'true'></mt-field>
                             <mt-field v-if="isEnterprise(item['model_tb_car_personal']['customer_type'])" label="组织机构代码"  :value = "item['model_tb_cunguan_user']['orgNo']"   :readonly = 'true'></mt-field>
                             <mt-field v-if="isEnterprise(item['model_tb_car_personal']['customer_type'])" label="企业类型"  :value = "item['model_tb_car_personal']['company_type']"   :readonly = 'true'></mt-field>
                             <mt-field v-if="isEnterprise(item['model_tb_car_personal']['customer_type'])" label="实际控制人"  :value = "item['model_tb_car_personal']['actual_controller']"   :readonly = 'true'></mt-field>
                             <mt-field v-if="isEnterprise(item['model_tb_car_personal']['customer_type'])" label="成立日期"  :value = "item['model_tb_car_personal']['company_found'] | timeYMD"   :readonly = 'true'></mt-field>
                             <mt-field v-if="isEnterprise(item['model_tb_car_personal']['customer_type'])" label="注册资本"  :value = "item['model_tb_car_personal']['register_capital']"   :readonly = 'true'></mt-field>
                             <mt-field v-if="isEnterprise(item['model_tb_car_personal']['customer_type'])" label="法人代表"  :value = "item['model_tb_car_personal']['company_legal_person']"   :readonly = 'true'></mt-field>
                             <mt-field v-if="isEnterprise(item['model_tb_car_personal']['customer_type'])" label="法人代表身份证"  :value = "item['model_tb_car_personal']['legal_person_identity_card']"   :readonly = 'true'></mt-field>
                             <mt-field  label="现住宅地址"  :value = "item['model_tb_car_personal']['current_sheng']+item['model_tb_car_personal']['current_shi']+item['model_tb_car_personal']['current_xian']+item['model_tb_car_personal']['current_address']"   :readonly = 'true'></mt-field>
                             <mt-field v-if="isEnterprise(item['model_tb_car_personal']['customer_type'])" label="经营范围"  :value = "item['model_tb_car_personal']['operate_range']"   :readonly = 'true'></mt-field>
                             <mt-field v-if="isEnterprise(item['model_tb_car_personal']['customer_type'])" label="经营范围"  :value = "item['model_tb_car_personal']['profession']"   :readonly = 'true'></mt-field>
                             <mt-field v-if="isEnterprise(item['model_tb_car_personal']['customer_type'])" label="借款人情况"  :value = "item['model_tb_car_personal']['borrower_info']"   :readonly = 'true'></mt-field>
                             <mt-field  label="支付宝芝麻信用评分"  :value = "item['model_tb_car_personal']['alipay_credit_score']"   :readonly = 'true'></mt-field>
                             <mt-field  label="芝麻信用分"  :value = "item['zhi_ma_score']"   :readonly = 'true'></mt-field>
                             <mt-field v-if="!isEnterprise(item['model_tb_car_personal']['customer_type'])" label="驾驶证初次领证日期"  :value = "item['model_tb_car_personal']['driver_license_issue_date'] | timeYMD"   :readonly = 'true'></mt-field>
                             <mt-field v-if="isEnterprise(item['model_tb_car_personal']['customer_type'])" label="法院执行情况"  :value = "item['model_tb_car_personal']['court_execute']"   :readonly = 'true'></mt-field>
                             <mt-field  label="借款人有无车产"  :value = "item['model_tb_car_personal']['has_car']==1?'有':'无'"   :readonly = 'true'></mt-field>       
                             <mt-field  label="借款人有无房产"  :value = "item['model_tb_car_personal']['has_house']==1?'有':'无'"   :readonly = 'true'></mt-field>                       
                        </div>
                    </mtitle>
                </div>

                <div class="container_item">
                    <mtitle :title="'客户详情'">
                        <div slot="list">
                            <mt-field label="教育程度"  :value = "item['model_tb_car_personal']['education']"   :readonly = 'true'></mt-field>
                            <mt-field label="电子邮箱"  :value = "item['model_tb_car_personal']['email']"   :readonly = 'true'></mt-field>
                            <mt-field label="现住宅入住时间"  :value = "item['model_tb_car_personal']['begin_stay_time'] | timeYMD"   :readonly = 'true'></mt-field>
                            <mt-field label="现住宅电话"  :value = "item['model_tb_car_personal']['current_phone_area_code'] "   :readonly = 'true'></mt-field>
                            <mt-field label="住房性质"  :value = "item['model_tb_car_personal']['house_type']+item['model_tb_car_personal']['house_money']+'元/月'"   :readonly = 'true'></mt-field>
                            <mt-field label="户口所在地"  :value = "item['model_tb_car_personal']['id_card_address']"   :readonly = 'true'></mt-field>
                        </div>
                    </mtitle>
                </div>

                <div class="container_item">
                    <mtitle :title="'职业信息'">
                        <div slot="list">
                            <mt-field label="单位全称"  :value = "item['model_tb_car_job']['company_name']+item['model_tb_car_job']['occupation_type']"   :readonly = 'true'></mt-field>
                            <mt-field label="单位地址"  :value = "item['model_tb_car_job']['company_address']"   :readonly = 'true'></mt-field>
                            <mt-field label="单位性质"  :value = "item['model_tb_car_job']['company_property']+item['model_tb_car_job']['company_property_explain']"   :readonly = 'true'></mt-field>
                            <mt-field label="单位电话"  :value = "item['company_phone']"   :readonly = 'true'></mt-field>
                            <mt-field label="行业类别"  :value = "item['model_tb_car_job']['industry_category']"   :readonly = 'true'></mt-field>
                            <mt-field label="所属行业"  :value = "item['model_tb_car_job']['company_type']"   :readonly = 'true'></mt-field>
                            <mt-field label="所属行业"  :value = "item['model_tb_car_job']['job_duty']"   :readonly = 'true'></mt-field>
                            <mt-field label="从事本行业时间"  :value = "item['model_tb_car_job']['job_start_time'] | timeYMD"   :readonly = 'true'></mt-field>
                            <mt-field label="月均收入"  :value = "item['model_tb_car_job']['job_pay'] +'元/月'"   :readonly = 'true'></mt-field>
                            <mt-field label="其他收入"  :value = "item['model_tb_car_job']['other_pay'] +'元/月'+item['model_tb_car_job']['other_pay_explain']"   :readonly = 'true'></mt-field>
                        </div>
                    </mtitle>
                </div>

                <div class="container_item">
                    <mtitle :title="'私营业主信息'">
                        <div slot="list">
                            <mt-field label="公司名称"  :value = "item['model_tb_car_job']['private_company_name']"   :readonly = 'true'></mt-field>
                            <mt-field label="成立时间"  :value = "item['model_tb_car_job']['organization_create_time'] | timeYMD"   :readonly = 'true'></mt-field>
                            <mt-field label="组织形式"  :value = "item['model_tb_car_job']['organization_type']+item['model_tb_car_job']['organization_share']+'%'"   :readonly = 'true'></mt-field>
                        </div>
                    </mtitle>
                </div>

                <div class="container_item">
                    <mtitle :title="'客户银行卡信息'">
                        <div slot="list">
                            <mt-field label="开户名"  :value = "item['bankcard_info']['customer_name']"   :readonly = 'true'></mt-field>
                            <mt-field label="银行卡账号"  :value = "item['bankcard_info']['bank_account']"   :readonly = 'true'></mt-field>
                            <mt-field label="开户行"  :value = "item['bankcard_info']['bank_name']"   :readonly = 'true'></mt-field>
                            <mt-field label="支行名称"  :value = "item['bankcard_info']['bank_sub_name']"   :readonly = 'true'></mt-field>
                            <mt-field label="银行卡归属地省"  :value = "item['bankcard_info']['bank_prvince']"   :readonly = 'true'></mt-field>
                            <mt-field label="银行卡归属地市"  :value = "item['bankcard_info']['bank_city']"   :readonly = 'true'></mt-field>
                            <mt-field label="转账类型"  :value = "item['bankcard_info']['output_type']"   :readonly = 'true'></mt-field>
                            <mt-field label="是否绑定银行卡代扣"  :value = "item['bankcard_info']['bind_status']== 1 ? '已绑卡' : '未绑卡'"   :readonly = 'true'></mt-field>
                            <mt-field label="绑定代扣平台"  :value = "item['bankcard_info']['bind_platforms']"   :readonly = 'true'></mt-field>
                            <mt-field label="代扣平台单笔限额"  :value = "item['bankcard_info']['platform_limit']"   :readonly = 'true'></mt-field>
                            <mt-field label="代扣平台单日限额"  :value = "item['bankcard_info']['platform_day_limit']"   :readonly = 'true'></mt-field>
                        </div>
                    </mtitle>
                </div>

            </div>
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
  methods:{
    personalTypeFormat(carPersonal){
        let name=carPersonal.name;
        if(carPersonal.customer_type){
            name+=`(${carPersonal.customer_type})`;
        }else{
            name+=`(个人)`;
        }
        return name;
    },
    isEnterprise(customerType){
        return customerType=="企业";
    }
  },
  beforeMount () {
    this.api.CarBusiness.CarBusinessApi_CarBaseInfoDatas(this.$route.params.id).then(result => {
        this.myData = result.Data;
    });
  }
};
</script>
