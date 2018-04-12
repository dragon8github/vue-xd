<template>
  <div class="content" id="addCarBusiness">
      <bsnheader :headerTitle="'添加房速贷业务'" :has-back='true'></bsnheader>
      <div class="page-field" v-if="myData">
            <div class="page-part">
                <mt-field label="所属分公司" :star="true" type="other">
                    <select v-model="formModel.dept">
                        <option disabled value="">请选择所属分公司</option>
                        <option :value="o.Value" v-for="o in myData.root_dept">{{ o.Text }}</option>
                    </select>
                </mt-field>
                <mt-field label="业务类型" :star="true" placeholder="请选择业务类型" type='other'>
                      <select v-model="formModel.businessType">
                          <option disabled value="">请选择业务类型</option>
                          <option :value="o.Value" v-for="o in myData.list_business_type">{{ o.Text }}</option>
                      </select>                  
                  </mt-field>
                <mt-field label="受理日期" :star="true" placeholder="请选择受理日期" type="text" @textClick="openPicker" :readonly = 'true' :value="formModel.inputTime">
                </mt-field>
                <mt-field label="客户名称" :star="true" placeholder="请输入客户名称" :attr="{ maxlength: 50 }" v-model="formModel.customerName" type="text"></mt-field>
                <mt-field label="手机号码" :star="true" placeholder="请输入手机号码" v-model="formModel.phoneNumber" type="tel"></mt-field>
                <mt-field label="证件编号" placeholder="请输入证件编号" v-model="formModel.documentID" type="number"></mt-field>
            </div>
            <div class="page-button-group" @click="saveData"> 提交 </div> 
        </div>
      <picker ref="picker" type="date" :endDate='new Date()' v-model="inputTime" @confirm="handleChange"></picker>
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

// Timepicker组件
import picker from '../../components/datetimepicker/datetimepicker.vue';

export default {
    name: 'approval',
    data () {
      return {
        myData:'',
        inputTime: new Date(),        
        formModel: {
            dept: '',           
            businessType: '',
            customerName: '',
            phoneNumber: '',
            documentID: '',
            inputTime: (function () {
                var date = new Date()
                return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
            })()
        }
      }
    },
    components: {
      bsnheader,
      mtField,
      mtButton,
      picker
    },
    methods: {
      // 当【业务类型】select触发【change】事件时的回调函数
      businessChange (val) {
          this.formModel.businessType = val;
      },
      // 当【所属分公司】select触发【change】事件时的回调函数
      deptChange (val) {
          this.formModel.dept = val;
      },
      // 在【TimePicker时间选择器组件】中点击【确定】后的回调函数
      handleChange (v) {
          var date = new Date(v);
          this.inputTime = date;
          this.formModel.inputTime = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
      },
      // 打开【TimePicker时间选择器组件】
      openPicker () {
          //this.$refs.picker.endDate= new Date();
          this.$refs.picker.open();
      },
      // 提交表单
      saveData () {
        if (this.formModel.dept.trim() == '') return Toast('请选择所属分公司');        
        if (this.formModel.businessType.trim()=='') return Toast("请选择业务类型")
        if (this.formModel.inputTime.trim() == "") return Toast('录入时间不能为空');

        var customerName = this.formModel.customerName.trim();
        if (customerName == '') return Toast('客户名称不能为空');
        if (customerName.length>50) return Toast('客户名称长度不能超过50个字符');

        var phoneNumber=this.formModel.phoneNumber.trim();
        if ( phoneNumber== '') return Toast('手机号码不能为空');
        if(!/^1\d{10}$/.test( phoneNumber)) return Toast('手机号码格式不正确');

        this.api.Common.CommonApi_SaveBusinessBaseInfo({
            "business_type": this.formModel.businessType,
            "customer_name": customerName,
            "phone_number": phoneNumber,
            "document_id": this.formModel.documentID,
            "business_out_type": 1,
            "business_type_detail":  this.formModel.businessType,
            "input_time":this.formModel.inputTime
        }).then(result => {
            Toast(result.Data);
            if (result.ReturnCode === 1) {
                this.$router.push('/houseBusiness');
            }
        });
      }
    },
    beforeMount () {
      this.api.Common.CommonApi_InputBusiness('house').then(Result => {
          this.myData = Result.Data;
      });
    } 
}
</script>

<style lang="scss">
@import "./../../sass/form";
#addCarBusiness {
    padding-top: pxToRem(86px);
}
</style>