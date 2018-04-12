<template>
  <div id="addRegister" v-if="model.Model">
      <bsnheader :headerTitle="'客户还款登记'" :has-back="true"></bsnheader>
       <div class="page-field">
        <div class="page-part"  >
          <mt-field label="还款日期 *："  :readonly='true' type="text" @textClick="openPicker" :value = "claimDate | timeYMD"></mt-field>
          <mt-field label="违约金 *："    placeholder="违约金" v-model = "model.Model.OverDueMoney" type="number"></mt-field>
          <mt-field label="还款金额 *"    placeholder="还款金额" v-model = "totalRepayment"         type="number"></mt-field>
          <mt-field label="实际转款人 *"  placeholder="实际转款人" v-model ="model.Model.reserve_5" type="text"></mt-field>
          <mt-field label="转入账号" type='other' >
             <select v-model="model.Model.reserve_2">
                  <option disabled value = "null">请选择账户</option>
                  <option :value="o.Key" v-for="o in model.BankAccounts">{{ o.Value }}</option>
              </select>
          </mt-field>

          <mt-field label="交易类型：" placeholder="转账, 支付宝等" v-model = "model.Model.reserve_3" type="text"></mt-field>
          <mt-field label="交易场所：" placeholder="转账地址等"     v-model = "model.Model.reserve_4" type="text"></mt-field>
          <mt-field label="备注 : "    placeholder="请输入备注"     v-model = "model.Model.remark"    type="text"></mt-field>
          <mt-field label="审批结果" type="other">
              <div class="radioApproval">
                  <div class="btn" :class="{active : radioValue === 0}" @click="radioValue = 0">是</div>
                  <div class="btn" :class="{active : radioValue === 1}" @click="radioValue = 1">否</div>
              </div>
          </mt-field>
        </div>
        <div class="page-button-group2">
            <div class="cancel" @click="back">撤销</div>
            <div class="sublime" @click="saveReg">登记</div>
        </div>
    </div>
    <picker ref="picker" type="date" v-model="model.Model.claimDate" @confirm="handleChange"></picker>
  </div>
</template>

<script>
// 头部组件
import bsnheader from 'mycomponents/Header.vue';

// Toast 组件
import Toast from 'components/toast/index.js';

// mtField组件
import mtField from 'components/field/field.vue';

// Timepicker组件
import picker from 'components/datetimepicker/datetimepicker.vue';

export default {
    name: 'addRegister',
    data () {
        return {
            dataModel: {
                Id: 0,
                BusinessId: this.$route.params.businessId,
                AfterBusinessId: this.$route.params.afterId
            },
            // 【操作结果】为【撤销为0】，还是【提交为1】
            radioValue: 1,     
            totalRepayment:'',
            model: {},
            claimDate: new Date()
        }
    },
    components: {
        bsnheader,
        Toast,
        mtField,
        picker
    },
    methods: {
        placeholder (str) {
            return `本期应还金额【${str}】`;
        },
        loadData () {
            this.api.Ledger.Ledger_GetRepaymentRecordDetails(this.dataModel).then(data => {
                if (data.ReturnCode === 1) {
                    this.model = data.Data
                    this.claimDate = this.timeYMD(this.model.Model.claimDate)
                    this.model.Model.claimDate = this.claimDate;
                } else {
                    Toast(data.ReturnMessage);
                }
            });
        },
        back () {
            this.$router.push(this.$store.getters.siteMap);
        },
        saveReg () {
            if(this.totalRepayment.trim() === "") return Toast("还款金额不能为空！");
            let total = parseFloat(this.totalRepayment);
            if (total === 0) return Toast("还款金额不能小于或等于零！");
            this.model.Model.reserve_1 = this.totalRepayment;//db存储的是string
            if (this.model.Model.reserve_5.trim() === '') return Toast("实际转款人不能为空！");
            if (this.model.Model.reserve_2 === null)  return Toast("请选择转入账号！");

            this.api.Ledger.Ledger_AddOrUpdateRepaymentRecord(this.model.Model).then(data => {
                Toast(data.ReturnMessage);
                if (data.ReturnCode === 1) this.$router.push(this.$store.getters.siteMap);
            });
        },
        openPicker () {
            this.$refs.picker.open();
        },
        handleChange (v) {
            var date = new Date(v);
            this.claimDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
            this.model.Model.claimDate = this.claimDate;
        },
    },
    beforeMount () {
        this.loadData();
    }
}
</script>



<style lang="scss">
@import "./../../sass/form";
#addRegister {
    padding-top: pxToRem(86px);


    .radioApproval {
      display:flex;
      justify-content: flex-end;
      width:pxToRem(300px);

      & > .btn {
          border: 1px solid #2DA5FF;
          color: #2DA5FF;
          background-color: transparent;
          width:48%;
          border-radius:10px;
          width:pxToRem(100px);
          height:pxToRem(58px);
          line-height:pxToRem(58px);
          margin-left:pxToRem(30px);
          text-align: center;

          &.active {
            background:#2DA5FF;
            color:#fff;
          }
      }
    }
}
</style>