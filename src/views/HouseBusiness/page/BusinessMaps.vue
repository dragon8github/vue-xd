<template>
<div v-if="myData">
    <div class="container_item">
      <mtitle v-for="(data, index) in myData" :key="index" :title="data.Flow_business_type_name">
        <div slot="list">
           <table class="rt cf">
                <thead class="cf">
                  <tr>
                    <th>用户</th>
                    <th>审批意见</th>
                    <th>操作时间</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- 根据服务端数据循环 -->
                  <tr v-for="(d, index) in data['ProcessLogs']" :key="index" >
                    <!-- 配合模型和数据渲染出数据 -->
                    <td><a>{{ d['operator_name'] }}</a></td>
                    <td><a>{{ d['log_remark'] }}</a></td>
                    <td><a>{{ d['create_time'] }}</a></td>
                  </tr>
                </tbody> 
           </table>
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
  components: {
    mtField,
    mtitle
  },
  beforeMount () {
    this.api.Common.CommonApi_BusinessMaps(this.$route.params.id).then(result => {
        console.log(result)
        this.myData = result.Data
     })
  }
};
</script>
