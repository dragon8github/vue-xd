<template>
<div v-if="myData">
  <div class="container_item">
      <mtitle :title="'保证'">
           <div slot="list">
             <mt-field label="企业"       :value = "myData['COMPANY_NAME']"  :readonly = 'true' ></mt-field>
             <mt-field label="第三人"     :value = "concat(myData['THIRD_PERSON'] , myData['RESERVE_2'] , appendIfNotNullOrEmpty(myData['RESERVE_3'],'房产'))|clearNull"  :readonly = 'true' ></mt-field>
           </div>
       </mtitle>
  </div>
  <div class="container_item">
      <mtitle :title="'质押'">
           <div slot="list">
               <mt-field label="支票"   :value = "myData['CHECK_COUNT'] |appendIfNotNullOrEmpty('张')"   :readonly = 'true'></mt-field>
               <mt-field label="定金"   :value = "myData['EARNEST_MONEY']|appendMoneyUnitIfNotNullOrEmpty"        :readonly = 'true'></mt-field>
               <mt-field label="汽车"   :value = "myData['CAR_OWNER']"            :readonly = 'true'></mt-field>

               <div class="container_item_list_children">
                  <div class="container_item">  
                       <mtitle :title="'设备材料'">
                         <div slot="list">
                           <mt-field label="权属人"     :value = "myData['FACILITY_OWNER']"   :readonly = 'true'></mt-field>
                           <mt-field label="评估价格"   :value = "myData['FACILITY_PRICE']|appendMoneyUnitIfNotNullOrEmpty"   :readonly = 'true'></mt-field>
                         </div>
                     </mtitle>
                  </div>
                  <div class="container_item">  
                       <mtitle :title="'股份'">
                         <div slot="list">
                           <mt-field label="股份持有人" :value = "myData['STOCK_OWNER']"   :readonly = 'true'></mt-field>
                           <mt-field label="质押份额"   :value = "myData['STOCK_PERCENT']|appendIfNotNullOrEmpty('%')" :readonly = 'true'></mt-field>
                         </div>
                     </mtitle>
                  </div>
                  <div class="container_item">  
                       <mtitle :title="'财产权利'">
                         <div slot="list">
                           <mt-field label="权属人"     :value = "myData['PROPERTY_OWNER']"    :readonly = 'true'></mt-field>
                           <mt-field label="评估价格"   :value = "myData['PROPERTY_PRICE']|appendMoneyUnitIfNotNullOrEmpty" :readonly = 'true'></mt-field>
                         </div>
                     </mtitle>
                  </div>
                  <div class="container_item">  
                       <mtitle :title="'应收款项'">
                         <div slot="list">
                            <mt-field label="付款人姓名"  :value = "myData['RESERVE_4']"   :readonly = 'true'></mt-field>
                         </div>
                     </mtitle>
                  </div>
               </div>
           </div>
       </mtitle>
  </div>

  <div class="container_item">
      <mtitle :title="'抵押'">
           <div slot="list">
               <div class="container_item_list_children">
                  <div class="container_item">
                      <mtitle :title="'房产'">
                          <div slot="list">
                             <mt-field label="权属人"     :value = "myData['HOUSE_OWNER']"   :readonly = 'true'></mt-field>
                             <mt-field label="评估价值"   :value = "myData['HOUSE_PRICE']|appendMoneyUnitIfNotNullOrEmpty"   :readonly = 'true'></mt-field>
                          </div>
                      </mtitle>
                  </div>

                  <div class="container_item">
                      <mtitle :title="'机械设备'">
                          <div slot="list">
                             <mt-field label="权属人"     :value = "myData['FACILITY_OWNER2']"   :readonly = 'true'></mt-field>
                             <mt-field label="评估价值"   :value = "myData['FACILITY_PRICE2']|appendMoneyUnitIfNotNullOrEmpty"   :readonly = 'true'></mt-field>
                          </div>
                      </mtitle>
                  </div>

                   <div class="container_item">
                      <mtitle :title="'动产浮动抵押'">
                          <div slot="list">
                            <mt-field label="权属人"     :value = "myData['MOVE_OWNER']"   :readonly = 'true'></mt-field>
                            <mt-field label="评估价值"   :value = "myData['MOVE_PRICE']|appendMoneyUnitIfNotNullOrEmpty"   :readonly = 'true'></mt-field>
                          </div>
                      </mtitle>
                  </div>
               </div>  
           </div>
       </mtitle>
  </div>  

  <div class="container_item">
      <mtitle :title="'其他'">
           <div slot="list">
               <div class="container_item_list_children">
                  <div class="container_item">
                      <mtitle :title="'房地产转让'"> 
                        <div slot="list">
                          <mt-field label="权属人"     :value = "myData['HOUSR_OTHER_OWNER']"   :readonly = 'true'></mt-field>
                          <mt-field label="评估价值"   :value = "myData['HOUSE_OTHER_PRICE']|appendMoneyUnitIfNotNullOrEmpty"   :readonly = 'true'></mt-field>
                        </div>
                      </mtitle>
                  </div>

                   <div class="container_item">
                      <mtitle :title="'房地产租赁'"> 
                         <div slot="list">
                            <mt-field label="出租人"     :value = "myData['RENT_OWNER']"   :readonly = 'true'></mt-field>
                            <mt-field label="租金"       :value = "myData['RENT_PRICE']|appendMoneyUnitIfNotNullOrEmpty"   :readonly = 'true'></mt-field>
                         </div>
                      </mtitle>
                  </div>

                  <div class="container_item">
                      <mtitle :title="'其他'"> 
                          <div slot="list">
                              <mt-field label="其他"     :value = "myData['OTHER_REMARK']"   :readonly = 'true'></mt-field>
                          </div>
                      </mtitle>
                  </div>
               </div>
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
  components:{
    mtField,
    mtitle
  },
  beforeMount () {
    this.api.HouseBusiness.HouseBusinessApi_GetHouseAssure(this.$route.params.id).then(result => {
        console.log(result)
        this.myData = result.Data
     }) 
  }
};
</script>
