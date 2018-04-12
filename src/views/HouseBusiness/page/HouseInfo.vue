<template>
<div>
    <div v-if="myData && myData.length > 0">
      <div class="container_item" v-for="(data, index) in myData">
        <mtitle :title="'房产情况' + (+index + 1) ">
             <div slot="list">
                <mt-field label="房产权属人"                  :value = "data['fsd_house']['HOUSE_NAME']"  :readonly = 'true' ></mt-field>
                <mt-field label="房产证号"                    :value = "data['fsd_house']['HOUSE_NO']"  :readonly = 'true' ></mt-field>
                <mt-field label="房产面积（㎡）"              :value = "data['fsd_house']['HOUSE_AREA']"  :readonly = 'true' ></mt-field>
                <mt-field label="所属楼盘"                    :value = "data['fsd_house']['HOUSE_BELONG']"  :readonly = 'true' ></mt-field>
                <mt-field label="登记时间"                    :value = "data['fsd_house']['REGISTER_TIME']"  :readonly = 'true' ></mt-field>
                <mt-field label="开盘时间"                    :value = "data['fsd_house']['OPEN_TIME']"  :readonly = 'true' ></mt-field>
                <mt-field label="购买时间"                    :value = "data['fsd_house']['BUY_TIME']|timeYMD"  :readonly = 'true' ></mt-field>
                <mt-field label="购买单价（元）"              :value = "data['fsd_house']['RESERVE_3']|appendMoneyUnitIfNotNullOrEmpty"  :readonly = 'true' ></mt-field>
                <mt-field label="一抵贷款类型"                :value = "data['fsd_house']['BORROW_TYPE']"  :readonly = 'true' ></mt-field>
                <mt-field label="一贷款期限"                  :value = "data['fsd_house']['loan_year']|appendYearUnitIfNotNullOrEmpty"  :readonly = 'true' ></mt-field>
                <mt-field label="一抵贷款银行"                :value = "data['fsd_bank_name']"  :readonly = 'true' ></mt-field>
                <mt-field label="一抵贷款时间"                :value = "data['fsd_house']['BORROW_TIME']  | timeYMD"  :readonly = 'true' ></mt-field>
                <mt-field label="一抵贷款总额"                :value = "data['fsd_house']['BORROW_TOTAL']|appendMoneyUnitIfNotNullOrEmpty"  :readonly = 'true' ></mt-field>
                <mt-field label="一抵贷款余额"                :value = "data['fsd_house']['BORROW_BALANCE']|appendMoneyUnitIfNotNullOrEmpty"  :readonly = 'true' ></mt-field>
                <mt-field label="二抵贷款类型"                :value = "data['fsd_house']['second_mortgage_type']"  :readonly = 'true' ></mt-field>
                <mt-field label="二贷款期限"                  :value = "data['fsd_house']['second_mortgage_year']|appendYearUnitIfNotNullOrEmpty"  :readonly = 'true' ></mt-field>
                <mt-field label="二抵贷款银行"                :value = "data['fsd_house']['second_mortgage_bank']+wrapIfNotNullOrEmpty(data['fsd_house']['second_mortgage_other_bank'],'(',')')|clearNull"  :readonly = 'true' ></mt-field>
                <mt-field label="二抵贷款时间"                :value = "data['fsd_house']['second_mortgage_time'] | timeYMD"  :readonly = 'true' ></mt-field>
                <mt-field label="二抵贷款总额"                :value = "data['fsd_house']['second_mortgage_total']|appendMoneyUnitIfNotNullOrEmpty"  :readonly = 'true' ></mt-field>
                <mt-field label="二抵贷款余额"                :value = "data['fsd_house']['second_mortgage_balance']|appendMoneyUnitIfNotNullOrEmpty"  :readonly = 'true' ></mt-field>
                <mt-field label="三抵贷款类型"                :value = "data['fsd_house']['third_mortgage_type']"  :readonly = 'true' ></mt-field>
                <mt-field label="三贷款期限"                  :value = "data['fsd_house']['third_mortgage_year']|appendYearUnitIfNotNullOrEmpty"  :readonly = 'true' ></mt-field>
                <mt-field label="三抵贷款银行"                :value = "data['fsd_house']['third_mortgage_bank']+wrapIfNotNullOrEmpty(data['fsd_house']['third_mortgage_other_bank'],'(',')')|clearNull"  :readonly = 'true' ></mt-field>
                <mt-field label="三抵贷款时间"                :value = "data['fsd_house']['third_mortgage_time'] | timeYMD"  :readonly = 'true' ></mt-field>
                <mt-field label="三抵贷款总额"                :value = "data['fsd_house']['third_mortgage_total']|appendMoneyUnitIfNotNullOrEmpty"  :readonly = 'true' ></mt-field>
                <mt-field label="三抵贷款余额"                :value = "data['fsd_house']['third_mortgage_balance']|appendMoneyUnitIfNotNullOrEmpty"  :readonly = 'true' ></mt-field>
                <mt-field label="四抵贷款类型"                :value = "data['fsd_house']['fourth_mortgage_type']"  :readonly = 'true' ></mt-field>
                <mt-field label="四贷款期限"                  :value = "data['fsd_house']['fourth_mortgage_year']|appendYearUnitIfNotNullOrEmpty"  :readonly = 'true' ></mt-field>
                <mt-field label="四抵贷款银行"                :value = "data['fsd_house']['fourth_mortgage_bank']+wrapIfNotNullOrEmpty(data['fsd_house']['fourth_mortgage_other_bank'],'(',')')|clearNull"  :readonly = 'true' ></mt-field>
                <mt-field label="四抵贷款时间"                :value = "data['fsd_house']['fourth_mortgage_time'] | timeYMD"  :readonly = 'true' ></mt-field>
                <mt-field label="四抵贷款总额"                :value = "data['fsd_house']['fourth_mortgage_total']|appendMoneyUnitIfNotNullOrEmpty"  :readonly = 'true' ></mt-field>
                <mt-field label="四抵贷款余额"                :value = "data['fsd_house']['fourth_mortgage_balance']|appendMoneyUnitIfNotNullOrEmpty"  :readonly = 'true' ></mt-field>
                <mt-field label="中介名字"                    :value = "data['fsd_house']['RESERVE_7']"  :readonly = 'true' ></mt-field>
                <mt-field label="中介电话"                    :value = "data['fsd_house']['RESERVE_8']"  :readonly = 'true' ></mt-field>
                <mt-field label="评估单价"                    :value = "data['fsd_house']['HOUSE_PRICE']|appendMoneyUnitIfNotNullOrEmpty"  :readonly = 'true' ></mt-field>
                <mt-field label="房产总价（按评估单价计算）"  :value = "data['fsd_house']['evaluateHoustTotal']|appendMoneyUnitIfNotNullOrEmpty"  :readonly = 'true' ></mt-field>
                <mt-field label="剩余价值"                    :value = "data['fsd_house']['evaluateRemainingSpace']|appendMoneyUnitIfNotNullOrEmpty"  :readonly = 'true' ></mt-field>
                <mt-field label="网站1价格"                   :value = "wrapIfNotNullOrEmpty(data['fsd_house']['Website_1'],'[',']') + appendMoneyUnitIfNotNullOrEmpty(data['fsd_house']['SouFanPrice'])"  :readonly = 'true' ></mt-field>
                <mt-field label="网站2价格"                   :value = "wrapIfNotNullOrEmpty(data['fsd_house']['RESERVE_4'],'[',']') + appendMoneyUnitIfNotNullOrEmpty(data['fsd_house']['SeirenPrice'])"  :readonly = 'true' ></mt-field>
                <mt-field label="房产户型"                    :value = "data['fsd_house']['house_apartment']"  :readonly = 'true' ></mt-field>
                <mt-field label="房产朝向"                    :value = "data['fsd_house']['house_face']"  :readonly = 'true' ></mt-field>

                <mt-field label="房产状态"                    :value = "data['fsd_house']['house_status_cn']"  :readonly = 'true' ></mt-field>
                <mt-field label="抵押类型"                    :value = "data['fsd_house']['pledge_type_detail_cn']"  :readonly = 'true' ></mt-field>
                <mt-field label="小区别名"                    :value = "data['fsd_house']['community_name']"  :readonly = 'true' ></mt-field>
                <mt-field label="房屋年限"                    :value = "data['fsd_house']['house_year']|appendYearUnitIfNotNullOrEmpty"  :readonly = 'true' ></mt-field>
                <mt-field label="房产类型"                    :value = "data['fsd_house']['RESERVE_5']"  :readonly = 'true' ></mt-field>
                <mt-field label="房屋类型"                    :value = "data['fsd_house']['RESERVE_9']"  :readonly = 'true' ></mt-field>
                <mt-field label="房产是否易变现"              :value = "data['fsd_house']['RESERVE_0']"  :readonly = 'true' ></mt-field>
                <mt-field label="房产地址"                    :value = "data['fsd_house']['house_sheng'] + data['fsd_house']['house_shi'] + data['fsd_house']['house_xian'] + data['fsd_house']['HOUSE_ADDRESS']|clearNull"  :readonly = 'true' ></mt-field>
                <mt-field label="房产负债率对应区域"          :value = "data['debt_region']"  :readonly = 'true' ></mt-field>
                <mt-field label="最高负债率"                  :value = "isNullOrEmpty(data['fsd_house']['debt_ratio']) ? '': tryParseFloat(data['fsd_house']['debt_ratio'])*100|appendIfNotNullOrEmpty('%')"  :readonly = 'true' ></mt-field>
                <mt-field label="对应房产借款金额/债券"       :value = "data['fsd_house']['approve_money']|appendMoneyUnitIfNotNullOrEmpty"  :readonly = 'true' ></mt-field>
                <mt-field label="备注"                        :value = "data['fsd_house']['REMARK']"  :readonly = 'true' ></mt-field>
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
  name: 'businesscell',
  data () {
    return {
      myData: null,
      init: false
    }
  },
  components:{
    mtField,
    mtitle
  },
  beforeMount () {
    this.api.HouseBusiness.HouseBusinessApi_GetHouseInfo(this.$route.params.id).then(result => {
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