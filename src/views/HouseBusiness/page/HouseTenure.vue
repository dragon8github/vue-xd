<template>
<div>
    <div v-if="myData">
        <div class="container_item">
             <table class="rt cf" id="rt">
                  <thead class="cf">
                    <tr>
                      <th>序号</th>
                      <th>财产名称或开户行</th>
                      <th>财产权属人/户名</th>
                      <th>财产证书编号/银行账号</th>
                      <th>财产坐落</th>
                      <th>备注</th>
                    </tr>
                  </thead>
                  <tbody>
                    <!-- 根据服务端数据循环 -->
                    <tr v-for="(data, index) in myData['fsd_house']">
                      <!-- 配合模型和数据渲染出数据 -->
                      <td></td>
                      <td><a>{{ data['HOUSE_BELONG']|appendIfNotNullOrEmpty('[房产]') }}</a></td>
                      <td><a>{{ data['HOUSE_NAME'] }}</a></td>
                      <td><a>{{ data['HOUSE_NO'] }}</a></td>
                      <td><a></a></td>
                      <td><a></a></td>
                    </tr>
                     <!-- 根据服务端数据循环 -->
                    <tr v-for="(data, index) in myData['bank_flow']">
                      <!-- 配合模型和数据渲染出数据 -->
                      <td></td>
                      <td><a>{{ data['BANK_NAME'] }}</a></td>
                      <td><a>{{ data['BankFlowName'] }}</a></td>
                      <td><a>{{ data['BANK_ACCOUNT'] }}</a></td>
                      <td><a></a></td>
                      <td><a></a></td>
                    </tr>
                     <!-- 根据服务端数据循环 -->
                    <tr v-for="(data, index) in myData['fsd_tenure_list']">
                      <!-- 配合模型和数据渲染出数据 -->
                      <td></td>
                      <td><a>{{ data['TenureName'] }}</a></td>
                      <td><a>{{ data['TenureOwner'] }}</a></td>
                      <td><a>{{ data['TenureNumber'] }}</a></td>
                      <td><a>{{ data['TenureLocated'] }}</a></td>
                      <td><a>{{ data['Remark'] }}</a></td>
                    </tr>
                  </tbody> 
                </table>
          </div>
   </div>
   <div class="emptyDataDiv" v-else-if = 'isEmpty'>
          <div class='emptyDataImg'></div>
              <p class="emptyDataText">没有数据哦</p>
          </div>
    </div>
</div>
</template>

<script>

// field组件
import mtField from 'components/field/field.vue'


export default {
  name: 'businesscell',
  data () {
    return {
      myData: null,
      isEmpty: false
    }
  },
  components:{
    mtField
  },
  methods: {
    setCells () {
      if (document.getElementById('rt')) {
        let rows = document.getElementById('rt').rows
        for (var i = 1; i < rows.length; i++) {   
          rows[i].cells[0].innerHTML = i
        }
      } else {
         setTimeout( _ => {
            this.setCells()
         }, 50)
      }
    }
  },
  beforeMount () {
    this.api.HouseBusiness.HouseBusinessApi_GetHouseTenure(this.$route.params.id).then(result => {
        this.myData = result.Data
        if (this.myData.fsd_house.length === 0 && this.myData.bank_flow.length === 0 && this.myData.fsd_tenure_list.length === 0 || !this.myData) {
          this.myData = null
          this.isEmpty = true
        }
     })
  },
  mounted () {
    // 由于表格的数据是三个数组中叠加的，所以索引是不一定的。只能在渲染之后再铜鼓js来渲染了
    this.setCells()
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