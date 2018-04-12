<template>
<div v-if="myData">
  <div class="container_item">
        <mtitle :title="'重大事项调查'">
           <div slot="list">
               <table class="rt cf">
                           <thead class="cf">
                             <tr>
                               <th>序号</th>
                               <th>调查事项</th>
                               <th>调查结果</th>
                               <th>备注</th>
                             </tr>
                           </thead>
                           <tbody>
                             <!-- 根据服务端数据循环 -->
                             <tr v-for="(td, index) in myData['fsd_inspect']">
                               <!-- 配合模型和数据渲染出数据 -->
                               <td><a>{{ +index + 1 }}</a></td>
                               <td><a>{{ td.INSPECT_NAME }}</a></td>
                               <td><a>{{ td.INSPECT_VALUE }}</a></td>
                               <td><a>{{ td.REMARK }}</a></td>
                             </tr>
                           </tbody> 
               </table>
           </div>
        </mtitle>
   </div>

  <div class="container_item">
       <mtitle :title="'项目可操作性分析及设计'">
           <div slot="list">
               <mt-field label="还款来源 " :value = "myData['fsd_analysis']['REPAY_SOURCE']"  :readonly = 'true' ></mt-field>
               <mt-field label="担保措施 " :value = "myData['fsd_analysis']['GUARANTEE_MEASURE']"  :readonly = 'true' ></mt-field>
               <mt-field label="备注"      :value = "myData['fsd_analysis']['REMARK']"  :readonly = 'true' ></mt-field>
           </div>
       </mtitle>
   </div>


  <div class="container_item">
       <mtitle :title="'主办意见'">
           <div slot="list">
              <mt-field label="特殊事项说明 " :value = "myData['fsd_analysis']['RESERVE_1']"  :readonly = 'true' ></mt-field>
              <mt-field label="主办意见 "     :value = "myData['fsd_analysis']['RESERVE_2']"  :readonly = 'true' ></mt-field>
           </div>
       </mtitle>
   </div>

   
  <div class="container_item" v-if="myData['is_can_view']&&myData['branch_office_audit']">
       <mtitle :title="'风控专员意见'">
           <div slot="list">
              <mt-field label="借款人情况 " :value = "myData['branch_office_audit']['borrower_info']"  :readonly = 'true' ></mt-field>
              <mt-field label="抵押物描述 "     :value = "myData['branch_office_audit']['guaranty_desc']"  :readonly = 'true' ></mt-field>
               <mt-field label="企业运营情况 " :value = "myData['branch_office_audit']['enterprise_operation_info']"  :readonly = 'true' ></mt-field>
              <mt-field label="项目意见 "     :value = "myData['branch_office_audit']['project_opinion']"  :readonly = 'true' ></mt-field>
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
    this.api.HouseBusiness.HouseBusinessApi_GetHouseInspect(this.$route.params.id).then(result => {
        console.log(result)
        this.myData = result.Data
     })
  }
};
</script>
