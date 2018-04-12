<template>
  <div class="content" id="addQrcode">
      <bsnheader :headerTitle="'扫码业务'" :has-back='true'></bsnheader>
      <panel :Top="false" :Bottom="false">
          <div class="page-field" :class="{keyboard: iskeyboard}" v-if="formModel" slot="body">
                  <mt-field label="业务获取人"   :value = "formModel.user_name"             :readonly = 'true'></mt-field>
                  <mt-field label="所属分公司"   :value = "formModel.dept_name"             :readonly = 'true'></mt-field>
                  <mt-field label="申请日期"     :value = "formModel.create_time | timeYMD" :readonly = 'true'></mt-field>
                  <mt-field label="客户名称"     :value = "formModel.customer_name"         :readonly = 'true'></mt-field>
                  <mt-field label="客户手机"     :value = "formModel.phone"                 :readonly = 'true'></mt-field>
                  <mt-field label="号码归属地"   :value = "phone_address"                   :readonly = 'true'></mt-field>

                  <mt-field label="借款类型" type='other'>
                        <select v-model="formModel.borrow_type" :disabled='isReadOnly'>
                            <option :value="o.id" v-for="o in businessType">{{ o.text }}</option>
                        </select>                  
                  </mt-field>
                  
                  <mt-field label="标准类型" type="other" v-if = "!isReadOnly && formModel.status == 1 && formModel.borrow_type == 1">
                      <div class="radioApproval">
                          <div class="btn" 
                              :class="{active : business_type == '房速贷标准件' || !business_type}" 
                              @click="change_radio('房速贷标准件')">标准</div>
                          <div class="btn" 
                              :class="{active : business_type == '房速贷非标准件'}" 
                              @click="change_radio('房速贷非标准件')">非标准</div>
                      </div>
                  </mt-field>

                  <mt-field :readonly='isReadOnly' label="借款金额" v-model.trim="formModel.borrow_money" @keyup="borrow_money_keyup" type='text'></mt-field>

                  <mt-field label="业务状态" type='other'>
                        <select v-model="formModel.status" :disabled='isReadOnly'>
                            <option :value="o.id" v-for="o in businessStatus">{{ o.text }}</option>
                        </select>                  
                  </mt-field>

                  <div class="remark">
                      <div class="remark_title">
                          <span>备注（限200字）：</span>
                          <label for="remark_body" v-if="!formModel.remark">请输入备注</label>
                      </div>
                      <textarea class="remark_body" id="remark_body" v-model="formModel.remark" :readonly='isReadOnly' @focus="iskeyboard = true" @blur="iskeyboard = false"></textarea>
                  </div>

                  <div class="page-button-group" @click="saveData" v-if="!isReadOnly">提交</div> 
            </div>
      </panel>
  </div>
</template>

<script>
// header组件
import bsnheader from 'mycomponents/Header.vue';

// mtButton组件
import mtButton from 'components/button/button.vue';

// mtField组件
import mtField from 'components/field/field.vue';

//Toast组件
import Toast from 'components/toast/index.js';

// Msg组件
import msg from 'components/messagebox/messagebox.js'

// panel组件
import panel from 'mycomponents/common/panel.vue'

// radio组件
import mtRadio from 'components/radio/radio.vue'

export default {
    name: 'addQrcode',
    data () {
      return {
        // 业务类型为【已转业务】，那么该订单不可编辑
        isReadOnly: false,
        // 当前页面如果是编辑页面，那存在businessId
        businessId: '',
        // 借款类型
        businessTypeData: [{Key: '1', Value: '房速贷'}, {Key: '2', Value: '车易贷'}],
        // 业务状态
        businessStatusData: [{Key: '0', Value: '待接洽'}, {Key: '1', Value: '已转业务'}, {Key: '2', Value: '不处理'}, {Key: '3', Value: '接洽中'}],  
        // 表单数据集   
        formModel: {
            // 借款类型
            borrow_type: '',
            // 借款金额
            borrow_money: '',
            // 业务状态
            status: '',
            // 备注
            remark: ''
        },
        // 区分标准件和非标准件（必须在最外围，如果放在formModel中钩子居然监听不到，暂时不知道为什么也不知道解决方案）
        business_type: '',
        iskeyboard: false
      }
    },
    components: {
      bsnheader,
      mtField,
      mtButton,
      panel
    },
    computed: {
      // 借款类型
      businessType () {
        let options = []
        if (this.businessTypeData) {
            for (let [index, v] of this.businessTypeData.entries()) {
              options.push({id : v.Key, text: v.Value})
            }
        }
        return options
      },
      // 业务状态
      businessStatus () {
        let options = []
        if (this.businessStatusData) {
            for (let [index, v] of this.businessStatusData.entries()) {
              options.push({id : v.Key, text: v.Value})
            }
        }
        return options
      },
      // 手机归属地合并
      phone_address () {
        let phone_type = ''
        switch (this.formModel.phone_type) {
            case 0:  phone_type = '未知运营商'; break;
            case 1:  phone_type = '中国移动'; break;
            case 2:  phone_type = '中国联通'; break;
            case 3:  phone_type = '中国电信'; break;
            default: phone_type = '未知'; break;
        }
        return `${this.formModel.phone_address || ''}（${phone_type}）`
      }
    },
    methods: {
      // 提交表单
      saveData () {                
          // 如果默认的业务类型为【已转业务】，那么该订单不可编辑
          if (this.isReadOnly) {
              return msg.alert("该信息已转业务，不可再编辑！")
          }

          // 验证【借款金额】的合法性。
          // 由于借款金额字段允许为空，所以只有在不为空的情况下，才需要进行验证
          if (this.formModel.borrow_money !== '' && !/^[0-9]+.?[0-9]*$/.test(this.formModel.borrow_money) || parseFloat(this.formModel.borrow_money) <= 0 || parseFloat(this.formModel.borrow_money) > 100000000) {
              return Toast('金额限制在0<借款金额≤1亿！');
          } 
          

          // 验证【备注】是否合法
          if (this.formModel.remark && this.formModel.remark.trim().length > 200) {
              return Toast('备注不要大于200字')
          }

          // 强制指定房速贷的标准件类型
          if (this.formModel.status == 1 && this.formModel.borrow_type == 1 && !this.business_type) { 
            this.business_type = '房速贷标准件'
          }

          // 发送表单
          this.api.Qrcode.BusinessPrototype_Edit({
              id: this.businessId,
              status: this.formModel.status,
              borrow_type: this.formModel.borrow_type,
              borrow_money: this.formModel.borrow_money,
              remark: this.formModel.remark,
              business_type: this.business_type
          }).then(result => {
            if (result.ReturnCode === 1) {
                msg.alert(result.ReturnMessage).then(() => {this.$router.push('/QrCode')})
            } else {
                return Toast(result.ReturnMessage)
            }
          })
      },
      // 绑定keyup事件，清空异常符号
      borrow_money_keyup (s) {
          if (s) {
             // 排除异常符号、中文、字母
            let n = s.toString().replace(/[\`~!@#$^&*()=\-\|{}':;'\\,\[\].<>\?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]/g, '')
                                .replace(/[\u4e00-\u9fa5]/g, '')
            // parseFloat 主要作用是移除数字前的【0】
            this.formModel.borrow_money = parseFloat(n) || 0
          }
      },
      change_radio (s) {
         if (!this.isReadOnly) this.business_type = s
      }
    },
    beforeMount () {
      this.businessId = this.$route.params.businessId
      // 获取订单详情信息
      this.api.Qrcode.BusinessPrototype_Get(this.businessId).then(Result => {
          // 用户展示和提交表单的核心数据
          this.formModel = Result.Data

          // 保存未修改的业务状态。主要作品是用来判断。因为当业务状态为【已转业务（1）】的时候。不能修改和提交任何数据
          this.isReadOnly = Result.Data.status == 1

          // 如果借款金额默认为null、0的话，那就设置为空
          if (!Result.Data.borrow_money) this.formModel.borrow_money = ''
      })
    },
    Mounted () {

    }
}
</script>

<style lang="scss">
@import "./../../sass/form";
#addQrcode {
    padding-top: pxToRem(86px);
  
    .page-field {
      transition: .3s transform ease;
    }
  
    .keyboard {
      transform: translateY(-30%);
    }

    .mint-field-core[readonly]{
        color: #999
    }

    .remark {
        background: #fff;
        margin-top:pxToRem(20px);
        box-shadow: 5px 5px 30px #ccc;



      .remark_title  {
        padding: pxToRem(30px) 0;
        line-height: pxToRem(80px);
        padding-left:pxToRem(30px);
        font-size: pxToRem(32px);
          
          span {
              color:#000
          }
          label {
              color:#ccc
          }
      }

      .remark_body  {
          height:pxToRem(200px);
          border:0;
          font-size: pxToRem(32px);
          padding: 0 pxToRem(30px);
          line-height:pxToRem(44px);
      }
    }

    .radioApproval {
      display:flex;
      justify-content: flex-end;

      & > .btn {
          border: 1px solid #2DA5FF;
          color: #2DA5FF;
          background-color: transparent;
          border-radius:10px;
          width:pxToRem(120px);
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