<template>
    <div id="approval">
        <!-- 头部 -->
        <bsnheader :headerTitle="info && info.NextNodeName || '审批业务'" :has-back='true'></bsnheader>
        <panel :Top="false" :Bottom = "false" v-if="info">
            <!-- 身体 -->
            <div class="page-field" slot="body">
                <div class="page-part">
                	<div  v-if="info.CustomerName.length <= 3">
                		<mt-field :label = "`客户: ${info.CustomerName}`" :placeholder = "info.BusinessId" :readonly='true'></mt-field>
                	</div>
                	<div v-else>
                    	<mt-field label = "客户名称" :placeholder = "info.CustomerName" :readonly='true'></mt-field>
                    	<mt-field label = "合同编号" :placeholder = "info.BusinessId" :readonly='true'></mt-field>
                	</div>
                    <mt-field  label="借款金额" :value = "info.BorrowMoney | failureHandle('元')" :readonly='true'></mt-field>
                    <mt-field  label="借款期限" :value = "info.BorrowLimit | failureHandle('个月')" :readonly='true'></mt-field>
                    <mt-field  label="业务获取人" :value = "`${info.OriginalUserName} - ${info.OriginalUserBranchName}`" :readonly='true'></mt-field>
                    <mt-field  label="当前状态" v-model = "info.CurrentNodeName" :readonly='true'></mt-field>
                    <mt-field label="审批结果" type="other">
                        <div class="radioApproval">
                            <div class="btn" :class="{active : radioValue === 0}" @click="radioValue = 0">拒绝</div>
                            <div class="btn" :class="{active : radioValue === 1}" @click="radioValue = 1">同意</div>
                        </div>
                    </mt-field>
                    <!-- 撤销时才可以开启 -->
                    <div v-if="radioValue === 0">
                       <mt-field label="返回状态" type="other">
                           <select v-model="selectOptions">
                               <option :value="o.Key" v-for="o in options">{{ o.Value }}</option>
                           </select>
                       </mt-field>
                       <mt-field  label="定向打回" :readonly='true' type='other'>
                           <mt-switch v-model="isDirect"></mt-switch>
                       </mt-field>
                    </div>
                </div>
                <!-- 提示 -->
                <div class="label" v-show="radioValue === 0">勾选后,打回到指定状态,用户修改后提交直接到当前状态,跳过中间审批环节。</div>
                <div class="remark">
                    <div class="remark_title">
                        <span>审批意见（限500字）：</span>
                        <label for="remark_body" v-if="!log_remark">输入审批意见</label>
                    </div>
                    <textarea class="remark_body" id="remark_body" v-model="log_remark"></textarea>
                </div>
                <!-- 提交表单 -->
                <div class="page-button-group" @click="pushApproval">提交</div>              
            </div>
        </panel>
    </div>
</template>

<script>
// header组件
import bsnheader from 'mycomponents/Header.vue'

//Toast组件
import Toast from 'components/toast/index.js'

// messagebox组件
import msg from 'components/messagebox/messagebox.js'

// mtField组件
import mtField from 'components/field/field.vue';

// switch
import mtSwitch from 'components/switch/switch.vue'

// panel组件
import panel from 'mycomponents/common/panel.vue'

export default {
    name: 'approval',
    data () {
        return {
            // 核心数据源
            info: null,
            // 【操作结果】为【撤销为0】，还是【提交为1】
            radioValue: 1,         
            // 返回状态的选择框数据源
            options: [],
            // 当前选择的返回状态
            selectOptions: '',
            // 本次操作的订单ID
            id: this.$route.params.approve_id,
            // 提交的日志字段
            log_remark: '',
            // 是否选择定向打回
            isDirect: false
        }
    },
    components: {
        bsnheader,
        mtField,
        mtSwitch,
        panel
    },
    methods: {
        // 提交表达
        pushApproval () {
            if (parseInt(this.radioValue) == 0) {
                if (this.selectOptions == "")  return Toast('请选择返回状态')
                if (this.log_remark.length == 0) return Toast('请填写审批意见')
            }

            this.api.MyBusiness.MyBusiness_AuditBusiness({
                "ApproveId"         : this.info.ApproveId,
                "FlowBusinessType"  : this.info.FlowBusinessType,
                "AfterId"           : this.info.AfterId,
                "BusinessId"        : this.info.BusinessId,
                "AuditReuslt"       : parseInt(this.radioValue),
                "Remark"            : this.log_remark,
                "BackToWorkNodeId"  : this.selectOptions,
                "IsDirect"          : this.isDirect,
                "ProcessOrder"      : this.info.ProcessOrder
            }).then(data => {
                if (data.ReturnCode == 1) { 
                	msg.alert("审批成功").then(() => {
	                    this.$localStorage.remove(`Approval_${this.id}`)
	                    this.$router.push('/myBusiness')
                    })
                }
                else { 
                	Toast(data.ReturnMessage)
                }
            });
        },
        // 加载select-option的数据源
        loadSelection () {
            this.api.MyBusiness.MyBusiness_GetWorkFlowNodesThatBusinessCanBackTo({
               "business_id"        : this.info.BusinessId,
               "approve_id"         : this.info.ApproveId,
               "flow_business_type" : this.info.FlowBusinessType,
               "after_id"           : this.info.AfterId
            }).then(data => {
                if (data.ReturnCode == 1) {    
                    if (data.Data == 0) return;  
                    data.Data.splice(0,0,{Key:"",Value:"请选择返回状态"})     
                    this.options = data.Data;
                    this.selectOptions = this.options[0].Key;
                } else {
                    Toast(data.ReturnMessage);
                }
            })
        },
        // 加载初始化数据
        loadData (cb) {
            this.api.MyBusiness.MyBusiness_GetMyBusinessAuditDetails({
                Tag: 0,
                ApproveId: this.$route.params.approve_id
            }).then(data => {
                if (data.ReturnCode == 1) {
                    this.info = data.Data;
                    if (this.info.EditRequired) return Toast("请编辑后再进行审批");
                } else {
                    Toast(data.ReturnMessage);
                    this.$router.push(this.$store.getters.siteMap)
                }
                // 执行回调函数并且把参数传递进取
                cb && cb(data)
            })
        }
    },
    watch: {
        // 监听用户输入的日志，任何变化都记录在localStore中
        log_remark (curVal, oldVal) {
            this.$localStorage.set(`Approval_${this.id}`, curVal)
        }
    },
    filters: {
        failureHandle (data, unit) {
            if(!data) return "0" + unit;
            return data + unit;
        }
    },
    beforeMount () {
        // 获取初始化数据
        this.loadData( _ => {
            // 当初始化数据完成之后，再获取select-option的数据源
            this.loadSelection();
        });

        // 获取缓存
        let store = this.$localStorage.get(`Approval_${this.id}`)
        // 当缓存合法时才赋值
        if (store != null && store != "" && store != "null") {
            this.log_remark = store;
            Toast("已为你加载上一次未保存文本")
        }
    }
}
</script>


<style lang="scss">
@import "./../../sass/form";

#approval {
    padding-top: pxToRem(86px);

    .label {
        font-size:pxToRem(30px);
        color:#999;
        padding:0 pxToRem(30px);
        height:pxToRem(97px);
        display: flex;
        align-items: center;
    }

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
            height:pxToRem(300px);
            border:0;
            font-size: pxToRem(32px);
            padding: 0 pxToRem(30px);
            line-height:pxToRem(44px);
        }
    }

  

}

</style>