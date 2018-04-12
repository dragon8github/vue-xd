<template>
    <div>
        <div v-if="myData">
            <div class="container_item">
               <mtitle :title="'上审业务基本信息'">
                    <div slot="list">
                        <mt-field label="客户名称" :value="myData['customer_name']" :readonly='true'></mt-field>
                        <mt-field label="申请部门" :value="myData['dept_name']" :readonly='true'></mt-field>
                        <mt-field label="业务编号" :value="myData['model_tb_business']['business_id']" :readonly='true'></mt-field>
                        <mt-field label="业务类型" :value="myData['model_tb_business']['business_type']" :readonly='true'></mt-field>
                        <mt-field label="审贷会日期" :value="myData['model_tb_business_approve']['APPROVE_TIME']" v-if="isNotStandardHouse()" :readonly='true'></mt-field>
                        <mt-field label="参与人员" :value="myData['model_tb_business_approve']['ATTEND_LIST']" v-if="isNotStandardHouse()" :readonly='true'></mt-field>
                        <mt-field label="业务主办" :value="myData['operator_name']" :readonly='true'></mt-field>
                        <mt-field label="团队主管" :value="myData['team_leader']" :readonly='true'></mt-field>
                        <mt-field label="申请借款金额" :value="myData['model_tb_business_base_info']['BORROW']|appendMoneyUnitIfNotNullOrEmpty" :readonly='true'></mt-field>
                        <mt-field label="申请借款期限" :value="myData['model_tb_business_base_info']['MONTHS']|appendMonthUnitIfNotNullOrEmpty" :readonly='true'></mt-field>
                        <mt-field label="申请还款方式" :value="myData['repayment_type_name']" v-if="isOnline()" :readonly='true'></mt-field>
                        <mt-field label="申请借款利率" :value="myData['borrow_rate_cn']" v-if="isOnline()" :readonly='true'></mt-field>
                        <mt-field label="拟定借款费率" :value="appendIfNotNullOrEmpty(myData['model_tb_business_base_info']['borrow_rate'],'%')+wrapIfNotNullOrEmpty(myData['model_tb_business_base_info']['service_rate'],'+','%')" v-if="!isOnline()" :readonly='true'></mt-field>
                        <mt-field label="拟定返佣点数" :value="myData['report_display_return_fee']" v-if="!isOnline()" :readonly='true'></mt-field>
                        <mt-field label="业务获取人" :value="myData['original_name']" :readonly='true'></mt-field>
                    </div>
                </mtitle>
            </div>

            <div v-for="(item,index) in myData.list_tb_fsd_house" class="container_item">
                <mtitle :title="'房产情况-房产' + (+index + 1)">
                     <div slot="list">
                         <mt-field label="房产地址"
                                   :value="item['house_sheng']+item['house_shi']+item['house_xian']+item['HOUSE_ADDRESS']|clearNull"
                                   :readonly='true'></mt-field>
                         <mt-field label="房产证编号" :value="item['HOUSE_NO']" :readonly='true'></mt-field>
                         <mt-field label="房产权属人" :value="item['HOUSE_NAME']" :readonly='true'></mt-field>
                         <mt-field label="房产面积" :value="item['HOUSE_AREA']|appendIfNotNullOrEmpty('平方米')" :readonly='true'></mt-field>
                         <mt-field label="房屋类型" :value="item['RESERVE_9']" :readonly='true'></mt-field>
                         <mt-field label="房产所属区、县、镇" :value="item['house_xian']"
                                   :readonly='true'></mt-field>
                         <mt-field label="楼龄" :value="getHouseAge(item['OPEN_TIME'])" :readonly='true'></mt-field>
                         <mt-field label="房产所属区、县、镇最高负债率" :value="forMatDebt(item['debt_ratio'])" :readonly='true'></mt-field>
                         <mt-field label="房产一抵银行" :value="bankNameFormat(item['RESERVE_6'],item['other_bankname'])"
                                   :readonly='true'></mt-field>
                         <mt-field label="一抵贷款原始金额" :value="item['BORROW_TOTAL']|appendMoneyUnitIfNotNullOrEmpty" :readonly='true'></mt-field>
                         <mt-field label="一抵贷款余额" :value="item['BORROW_BALANCE']|appendMoneyUnitIfNotNullOrEmpty" :readonly='true'></mt-field>
                         <mt-field label="房产二抵银行" :value="bankNameFormat(item['second_mortgage_bank'],item['second_mortgage_other_bank'])" :readonly='true'></mt-field>
                         <mt-field label="二抵贷款原始金额" :value="item['second_mortgage_total']|appendMoneyUnitIfNotNullOrEmpty" :readonly='true'></mt-field>
                         <mt-field label="二抵贷款余额" :value="item['second_mortgage_balance']|appendMoneyUnitIfNotNullOrEmpty" :readonly='true'></mt-field>
                         <mt-field label="房产三抵银行" :value="bankNameFormat(item['third_mortgage_bank'],item['third_mortgage_other_bank'])" :readonly='true'></mt-field>
                         <mt-field label="三抵贷款原始金额" :value="item['third_mortgage_total']|appendMoneyUnitIfNotNullOrEmpty" :readonly='true'></mt-field>
                         <mt-field label="三抵贷款余额" :value="item['third_mortgage_balance']|appendMoneyUnitIfNotNullOrEmpty" :readonly='true'></mt-field>
                         <mt-field label="房产四抵银行" :value="bankNameFormat(item['fourth_mortgage_bank'],item['fourth_mortgage_other_bank'])" :readonly='true'></mt-field>
                         <mt-field label="四抵贷款原始金额" :value="item['fourth_mortgage_total']|appendMoneyUnitIfNotNullOrEmpty" :readonly='true'></mt-field>
                         <mt-field label="四抵贷款余额" :value="item['fourth_mortgage_balance']|appendMoneyUnitIfNotNullOrEmpty" :readonly='true'></mt-field>
                         <mt-field label="房产确认单价" :value="item['CheckHousePrice'] |appendUnitAfterMoneyIfNotNullOrEmpty( '元/平方米')" :readonly='true'></mt-field>
                         <mt-field label="房产确认总价" :value="item['CheckHouseAmount'] |appendMoneyUnitIfNotNullOrEmpty" :readonly='true'></mt-field>
                         <mt-field label="房产剩余价值" :value="item['HouseRemainingSpace'] |appendMoneyUnitIfNotNullOrEmpty" :readonly='true'></mt-field>
                         <mt-field label="对应房产借款金额/债权 " :value="item['approve_money'] |appendMoneyUnitIfNotNullOrEmpty"
                                   :readonly='true'></mt-field>
                         <mt-field label="抵押物总负债率" :value="myData['mortgage_debt_rate']" :readonly='true'></mt-field>
                         <mt-field label="抵押率" :value="myData['mortgage_rate']" :readonly='true'></mt-field>
                     </div>
                 </mtitle>
            </div>

            <div class="container_item">
                <mtitle :title="'审贷会意见'">
                     <div slot="list">
                         <mt-field :value="myData['fbApprove']" v-if="isNotStandardHouse()"
                                   :readonly='true'></mt-field>
                         <mt-field :value="'同意'" v-if="!isNotStandardHouse()"
                                   :readonly='true'></mt-field>
                         <mt-field label="借款金额" :value="myData.model_tb_business_approve.APPROVE_MONEY|appendMoneyUnitIfNotNullOrEmpty"
                                   :readonly='true'></mt-field>
                         <mt-field label="借款期限" :value="myData.model_tb_business_approve.APPROVE_MONTH|appendMonthUnitIfNotNullOrEmpty"
                                   :readonly='true'></mt-field>
                         <mt-field label="还款方式" :value="myData['repayment_way']"  :readonly='true'></mt-field>
                         <mt-field label="借款利率" :value="isOnline() ? myData.final_rate 
                                    :appendIfNotNullOrEmpty(myData.model_tb_business_approve.APPROVE_RATE ,'%')+wrapIfNotNullOrEmpty(myData.model_tb_business_approve.approve_service,'+' , '%') " :readonly='true'></mt-field>
                         <mt-field label="返佣点数" :value="myData.report_display_return_fee" v-if="!isOnline()"  :readonly='true'></mt-field>
                     </div>
                 </mtitle>
            </div>

            <div class="container_item">
                <mtitle :title="'防范措施'">
                         <div slot="list">
                             <div class="container_item_list_children">
                                <mtitle :title="'1'">
                                     <div slot="list">
                                              <p><span>{{ myData.fsd_non_standard_measure.notarization_type, 1 | notaryCheck }}</span>
                                                  办理委托公证{{myData.model_approval.wtgz1}}</p>
                                              <p><span>{{ myData.fsd_non_standard_measure.notarization_type, 5 | notaryCheck }}</span>
                                                  办理声明公证 {{myData.model_approval.smgz1}} </p>
                                              <p><span>{{ myData.fsd_non_standard_measure.notarization_type, 6 | notaryCheck }}</span>
                                                  无锡办理证件公证 </p>
                                              <p><span>{{ myData.fsd_non_standard_measure.notarization_type, 7 | notaryCheck }}</span>
                                                  {{myData.model_approval.hsygzs1}}  </p>
                                              <p><span>{{ myData.fsd_non_standard_measure.notarization_type, 2 | notaryCheck }}</span>
                                                  强制执行公证 </p>
                                             <!-- <p><span>{{ myData.fsd_non_standard_measure.notarization_type, myData.fsd_non_standard_measure.forced_notarization_type, 1 | forcedType
                                                  }}</span> 强制执行公证及借款合同做一个月期限(借款6个月以下) </p>
                                              <p><span>{{ myData.fsd_non_standard_measure.notarization_type, myData.fsd_non_standard_measure.forced_notarization_type, 3 | forcedType
                                                  }}</span> 强制执行公证及借款合同做三个月期限(借款7-12个月) </p>
                                              <p><span>{{ myData.fsd_non_standard_measure.notarization_type, myData.fsd_non_standard_measure.forced_notarization_type, 2 | forcedType
                                                  }}</span> 强制执行公证及借款合同做六个月期限(借款13-24个月) </p> -->
                                              <p style="color:#988181">{{myData.model_approval.qzgz1}}</p>
                                              <p style="color:#988181">{{myData.model_approval.qzgz3}}</p>
                                              <p style="color:#988181">{{myData.model_approval.qzgz2}}</p>
                                              <p><span>{{ myData.fsd_non_standard_measure.notarization_type, 3 | notaryCheck
                                                  }}</span>债权公证{{myData.model_approval.zqgz1}}</p>
                                              <p><span>{{ myData.fsd_non_standard_measure.notarization_type, 4 | notaryCheck }}</span>
                                                  其它：{{myData.fsd_non_standard_measure.other_notarization}}</p>
                                     </div>
                                 </mtitle> 

                                  <mtitle :title="'2'">
                                     <div slot="list">
                                         <p>办理抵押登记： </p>
                                         <p v-for="item in myData.pledge_register_list">
                                             <span>{{myData.fsd_non_standard_measure.pledge_register, item.Value | pledgeCheck}}</span>
                                             {{ myData.model_approval, item | pledgeFilter }}
                                             <a v-if="item.Value=='99'">{{myData.fsd_non_standard_measure.pledge_register_remark}}</a>
                                         </p>
                                         <p>
                                           <span>{{myData.fsd_non_standard_measure.lease_record | isChecked}}</span>
                                           {{myData.model_approval.zlba1}}
                                         </p>
                                     </div>
                                 </mtitle>

                                 <mtitle :title="'3'">
                                     <div slot="list">
                                         <p v-for="item in myData.pledge_credentials_list">
                                             <span>{{myData.fsd_non_standard_measure.pledge_credentials, item.Value | pledgeCheck}}</span>
                                             {{ myData.model_approval, item | credentialsFilter }}
                                             <a v-if="item.Value==99">:{{myData.fsd_non_standard_measure.pledge_credentials_remark}}</a>
                                         </p>
                                     </div>
                                 </mtitle>

                                 <mtitle :title="'4'">
                                     <div slot="list">
                                         <p>抵押债权设置{{myData.model_approval.zqsz1}}:&nbsp;&nbsp;
                                             {{myData.fsd_non_standard_measure.mortgage_debt_money}}&nbsp;&nbsp;元<br/>{{myData.model_approval.zqsz2}}</p>
                                     </div>
                                 </mtitle>

                                 <mtitle :title="'5'">
                                     <div slot="list">
                                         <p>借款主体：{{myData.fsd_non_standard_measure.borrow_main}}；</p>
                                     </div>
                                 </mtitle>

                                  <mtitle :title="'6'">
                                     <div slot="list">
                                         <p>担保主体：{{myData.fsd_non_standard_measure.guarantee_main}}； </p>
                                         <p>公司名称： {{myData.fsd_non_standard_measure.guarantee_company_name}}</p>
                                         <p>法       人：{{myData.fsd_non_standard_measure.guarantee_legal_person}}</p>
                                         <p>股东及股权/份占比：{{myData.fsd_non_standard_measure.guarantee_person_stock}}</p>
                                     </div>
                                 </mtitle>

                                 <mtitle :title="'7'">
                                     <div slot="list">
                                         <p>放款设置: 凭回执放款：{{myData.fsd_non_standard_measure.out_put_setup1}}</p>
                                         <p>凭他项放款：{{myData.fsd_non_standard_measure.out_put_setup2}}&nbsp;&nbsp;{{myData.model_approval.fksz3}} </p>
                                         <p style="color:#988181">{{myData.model_approval.fksz1}}<p>
                                         <p>其他：{{myData.fsd_non_standard_measure.out_put_setup3}}</p>
                                         <p>
                                             <span>{{ myData.fsd_non_standard_measure.QF_TYPE == "1" | isChecked }}</span>
                                             未婚客户签未婚承诺书，并与身份证复印件一起签骑缝；
                                         </p>
                                         <p>
                                             <span>{{ myData.fsd_non_standard_measure.QF_TYPE == "2" | isChecked }}</span>
                                             离婚客户签未婚承诺书，并与身份证、离婚证、离婚协议复印件一起签骑缝；</p>
                                         <p>
                                             <span>{{ myData.fsd_non_standard_measure.company_qf | isChecked }}</span>
                                             {{ myData.model_approval.gsqf1 }}
                                         </p>
                                     </div>
                                 </mtitle>
                                <mtitle :title="'8'">
                                     <div slot="list">
                                            <p>
                                             <span>{{ myData.fsd_non_standard_measure.arbitration_filing == 1 | isChecked }}</span>
                                             办理仲裁备案{{myData.model_approval.ffa1}}</p>
                                     </div>
                                 </mtitle>
                                 <mtitle :title="'9'">
                                     <div slot="list">
                                         <p>其他：{{myData.fsd_non_standard_measure.measure_other_remark}}</p>
                                     </div>
                                 </mtitle>
                             </div>   
                         </div>
                 </mtitle>
            </div>

            <div class="container_item other">
                <mtitle :title="'其他条件'">
                    <div slot="list">
                         <p>
                             <span>{{myData.fsd_non_standard_measure.check_other_condition1 | isChecked}}</span>
                             客户:{{myData.fsd_non_standard_measure.customer_name}}&nbsp;&nbsp;
                             征信当前逾期{{myData.fsd_non_standard_measure.current_overdue_money}}&nbsp;&nbsp;，补提供最新的还款证明（原件）
                         </p>
                         <p>
                             <span>{{myData.fsd_non_standard_measure.check_other_condition2 | isChecked}}</span>
                             其他:{{myData.fsd_non_standard_measure.other_condition2_remark}}
                         </p>
                    </div>
                </mtitle>
            </div>

            <div class="container_item" v-if="!isNotStandardHouse()">
                <mtitle :title="'风控评估意见'">
                    <div slot="list">
                        <mt-field label="风控评估意见" :value="myData.model_tb_business_approve.risk_assessment"
                                  :readonly='true' ></mt-field>
                    </div>
                </mtitle>           
            </div>

         <div class="container_item" v-if="isNotStandardHouse()">
                <mtitle :title="'主审风控官'">
                    <div slot="list">
                        <mt-field label="1、项目基本情况" :value="myData.model_tb_business_approve.project_basic"
                                  :readonly='true' ></mt-field>
                                    <mt-field label="2、主要风险点" :value="myData.model_tb_business_approve.main_risk"
                                  :readonly='true' ></mt-field>
                                    <mt-field label="3、操作理由" :value="myData.model_tb_business_approve.operation_reason"
                                  :readonly='true' ></mt-field>
                                    <mt-field label="4、风控评估意见" :value="myData.model_tb_business_approve.risk_assessment"
                                  :readonly='true' ></mt-field>
                    </div>
                </mtitle>           
            </div>
  </div>
  <div class="emptyDataDiv" v-else-if='isEmpty'>
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
  name: 'businesscell',
  data () {
      return {
          myData: null,
          isEmpty: false
      }
  },
  components: {
      mtField,
      mtitle
  },
  methods: {
      // 有可能点击到.container_item_title 中的子元素，如果点击的元素不包含该类名，说明是子元素。那就寻找它的父级。这算是一种写死的解决方法吧。稍后改进
      slideupList (e) {
          let el = e.target.classList.contains('container_item_title') ? e.target : e.target.parentNode
          let h = el.nextElementSibling.style.height
          if (h === '0px' || h === '') {
              el.nextElementSibling.style.height = "100%"
          } else {
              el.nextElementSibling.style.height = "0px"
          }
      },
      bankNameFormat(bankName, otherBank){
          if (bankName == '其他') {
              return bankName + `(${otherBank})`;
          }
          return bankName;
      },
      getHouseAge (openTime){
          var houseAge = 0;
          if (parseInt(openTime) <= 0) {
              return 1;
          }
          var date = new Date();
          houseAge = parseInt(date.getFullYear()) - parseInt(openTime);
          houseAge = houseAge <= 0 ? 1 : houseAge;
          return houseAge;
      },
      forMatDebt(ratio){
          var r = 100 * parseFloat(ratio)
          if (r) return r + "%"
          return ''
      },
      approveFormat(str, fbApprove){
          if (str == "房速贷非标准件") {
              return fbApprove;
          }
          return "同意";
      },
      isOnline(v){
         return this.myData['model_tb_business']['business_out_type']==1
      },
      isNotStandardHouse(){
        return this.myData['model_tb_business']['business_type'] == '房速贷非标准件'
      }
  },
  filters: {
      isChecked (v) {
          if (v) return '☑'
          return '□'
      },
      notaryCheck(notarization_type, type){
          if (notarization_type && notarization_type.includes(type)) return '☑'
          return '□';
      },
      forcedType(notar, forced, type){
          if (notar && notar.includes('2') && forced == type)   return '☑';
          return '□';
      },
      pledgeCheck(pledge, itemValue){
          if (pledge && itemValue != '4' && pledge.includes(itemValue)) return '☑';
          if(itemValue == '4') return ''
          return '□';
      },
      pledgeFilter(approval, registerItem){
          let str = "";
          if (registerItem.Value != "4") {
              str += registerItem.Text;
              if (registerItem.Value == '3') {
                  str += "登记";
              }
              if (registerItem.Value == "1") {
                  str += approval.dydj1;
              }
              if (registerItem.Value == "2") {
                  str += approval.dydj2;
                  str += approval.dydj3;
              }
          }
          return str;
      },
      credentialsFilter(approval, registerItem){
          let str = registerItem.Text;
          if (registerItem.Value == '2') str += approval.yz1
          return str;
      }
  },
  beforeMount () {
      this.api.HouseBusiness.HouseBusinessApi_HouseApproval(this.$route.params.id).then(result => {
          this.myData = result.Data;
          if (!this.myData) this.isEmpty = true
      })
  }
};
</script>


<style lang='scss' scoped>
  @import "./../../../sass/variables";
  @import "./../../../sass/func";
  .other {
      p {
          margin: pxToRem(40px);
          font-size:pxToRem(30px);
      }
      p > span {
          font-size: pxToRem(60px)
      }
  }
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
            margin-top:pxToRem(150px);
        }
        .emptyDataText {
            color:#000;
            font-size:pxToRem(32px);
            margin-top:pxToRem(50px);
        }
  }
</style>