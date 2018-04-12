<template>
  <div v-if="bankFlowDetails && bankFlowGroupByAccounts && bankFlowGroupByMonths">
    <div class="container_item">
      <mtitle :title="'流水明细'">
        <div slot="list">
          <table class="rt cf" id="rt"  v-if="bankFlowDetails['fsd_bank_flow'].length > 0">
            <thead class="cf">
              <tr>
                <th>序号</th>
                <th>户名</th>
                <th>银行</th>
                <th>账号</th>
                <th>月份</th>
                <th>期初金额</th>
                <th>借</th>
                <th>贷</th>
                <th>期末余额</th>
              </tr>
            </thead>
            <tbody>
              <!-- 根据服务端数据循环 -->
              <tr v-for="(data, index) in bankFlowDetails['fsd_bank_flow']">
                <!-- 配合模型和数据渲染出数据 -->
                <td><a>{{ +index + 1 }}</a></td>
                <td><a>{{ data['BankFlowName'] }}</a></td>
                <td><a>{{ data['BANK_NAME'] }}</a></td>
                <td><a>{{ data['BANK_ACCOUNT'] }}</a></td>
                <td><a>{{ data['FLOW_MONTH'] }}</a></td>
                <td><a>{{ data['FLOW_BALANCE_BEGIN']|appendMoneyUnitIfNotNullOrEmpty }}</a></td>
                <td><a>{{ data['FLOW_BORROW']|appendMoneyUnitIfNotNullOrEmpty }}</a></td>
                <td><a>{{ data['FLOW_LOAN']|appendMoneyUnitIfNotNullOrEmpty }}</a></td>
                <td><a>{{ data['FLOW_BALANCE_END']|appendMoneyUnitIfNotNullOrEmpty }}</a></td>
              </tr>
            </tbody>
          </table>
        </div>
      </mtitle>
    </div>
  
    <div class="container_item">
      <mtitle :title="'按账户汇总'">
        <div slot="list">
          <table class="rt cf" id="rt" v-if="bankFlowGroupByAccounts.length > 0">
            <thead class="cf">
              <tr>
                <th>序号</th>
                <th>户名</th>
                <th>银行</th>
                <th>账号</th>
                <th>月份数量</th>
                <th>流水合计</th>
                <th>月平均流水</th>
                <th>备注</th>
              </tr>
            </thead>
            <tbody>
              <!-- 根据服务端数据循环 -->
              <tr v-for="(data, index) in bankFlowGroupByAccounts">
                <!-- 配合模型和数据渲染出数据 -->
                <td><a>{{ +index + 1 }}</a></td>
                <td><a>{{ data['C_NAME'] }}</a></td>
                <td><a>{{ data['BANK_NAME'] }}</a></td>
                <td><a>{{ data['BANK_ACCOUNT'] }}</a></td>
                <td><a>{{ data['MONTHS'] }}</a></td>
                <td><a>{{ data['TOTALAMOUNT']|appendMoneyUnitIfNotNullOrEmpty }}</a></td>
                <td><a>{{ data['AGVAMOUNT']|appendMoneyUnitIfNotNullOrEmpty }}</a></td>
                <td><a>{{ data['REMARK'] }}</a></td>
              </tr>
            </tbody>
          </table>
        </div>
      </mtitle>
    </div>
  
    <div class="container_item">
      <mtitle :title="'按月份汇总'">
        <div slot="list">
          <table class="rt cf" v-if="bankFlowGroupByMonths.length > 0">
            <thead class="cf">
              <tr>
                <th>序号</th>
                <th>月份</th>
                <th>当月流水</th>
                <th>备注</th>
              </tr>
            </thead>
            <tbody>
              <!-- 根据服务端数据循环 -->
              <tr v-for="(data, index) in bankFlowGroupByMonths">
                <!-- 配合模型和数据渲染出数据 -->
                <td><a>{{ +index + 1 }}</a></td>
                <td><a>{{ data['FLOW_MONTH'] }}</a></td>
                <td><a>{{ data['TOTALAMOUNT']|appendMoneyUnitIfNotNullOrEmpty }}</a></td>
                <td><a>{{ data['REMARK'] }}</a></td>
              </tr>
            </tbody>
          </table>
        </div>
      </mtitle>
    </div>

            <div class="container_item">
              <mtitle :title="'季度结息情况'">
                <div slot="list">
                  <mt-field label="首季度结息" :value="bankFlowDetails['business_base_info']['first_quart_interest']|appendMoneyUnitIfNotNullOrEmpty" :readonly='true'></mt-field>
                  <mt-field label="次季度结息" :value="bankFlowDetails['business_base_info']['second_quart_interest']|appendMoneyUnitIfNotNullOrEmpty" :readonly='true'></mt-field>
                </div>
              </mtitle>
            </div>
            <div class="container_item">
              <mtitle :title="'信用记录'">
                <div slot="list">
                  <table class="rt cf" id="rt" v-if="bankFlowDetails['fsd_honor_list'].length > 0">
                    <thead class="cf">
                      <tr>
                        <th>序号</th>
                        <th>信用主体</th>
                        <th>贷款类型</th>
                        <th>贷款总额</th>
                        <th>贷款余额</th>
                        <th>两年内最高逾期</th>
                        <th>两年内累计逾期次数</th>
                      </tr>
                    </thead>
                    <tbody>
                      <!-- 根据服务端数据循环 -->
                      <tr v-for="(data, index) in bankFlowDetails['fsd_honor_list']">
                        <!-- 配合模型和数据渲染出数据 -->
                        <td><a>{{ +index + 1 }}</a></td>
                        <td><a>{{ data['HONOR_NAME'] }}</a></td>
                        <td><a>{{ data['BORROW_TYPE'] }}</a></td>
                        <td><a>{{ data['BORROW_TOTAL']|appendMoneyUnitIfNotNullOrEmpty }}</a></td>
                        <td><a>{{ data['BORROW_BALANCE']|appendMoneyUnitIfNotNullOrEmpty }}</a></td>
                        <td><a>{{ data['Highest_Overdue'] }}</a></td>
                        <td><a>{{ data['Accumulated_Overdue'] }}</a></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </mtitle>
            </div>

            <div class="container_item">
              <mtitle :title="'个人征信说明'">
                <div slot="list">
                  <mt-field label="征信说明" :value="bankFlowDetails['business_base_info']['credit_remark']" :readonly='true'></mt-field>
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
  data() {
    return {
      bankFlowDetails: false,
      bankFlowGroupByAccounts: false,
      bankFlowGroupByMonths: false
    }
  },
  components: {
    mtField,
    mtitle
  },
  beforeMount() {
    this.api.HouseBusiness.HouseBusinessApi_GetHouseCredit(this.$route.params.id).then(result => {
      console.log(1,result.Data);
      this.bankFlowDetails = result.Data
    });
    this.api.HouseBusiness.HouseBusinessApi_BankFlowGroupByAccounts(this.$route.params.id).then(result => {
      this.bankFlowGroupByAccounts = result.Data;
    });
    this.api.HouseBusiness.HouseBusinessApi_BankFlowGroupByMonths(this.$route.params.id).then(result => {
      this.bankFlowGroupByMonths = result.Data;
    });
  }
};
</script>
