<template>
  <div v-if="myData">
      <div class="container_item" v-if="myData['lent_out_detail']['output_detail'].length>0">
          <mtitle :title="'基本信息'">
            <div slot='list'>
                <mt-field label="户名" :value="myData['lent_out_detail']['output_detail'][0]['CUSTOMER_NAME']" :readonly='true'></mt-field>
                <mt-field label="帐号" :value="myData['lent_out_detail']['output_detail'][0]['BANK_ACCOUNT']" :readonly='true'></mt-field>
                <mt-field label="开户行" :value="bankFormat(myData['lent_out_detail']['output_detail'][0])" :readonly='true'></mt-field>
                <mt-field label="支行名称" :value="myData['lent_out_detail']['output_detail'][0]['BANK_SUBNAME']" :readonly='true'></mt-field>
                <mt-field label="银行卡所在地省" :value="myData['lent_out_detail']['output_detail'][0]['Bank_Provice']" :readonly='true'></mt-field>
                <mt-field label="银行卡所在地市" :value="myData['lent_out_detail']['output_detail'][0]['Bank_City']" :readonly='true'></mt-field>
                <mt-field label="计划出款备注" :value="myData['lent_out_detail']['output_detail'][0]['REMARK']" :readonly='true'></mt-field>
                <mt-field label="出款金额(元)" v-if='isCarBusiness()' :value="myData['output_car_money']" :readonly='true'></mt-field>
                <mt-field label="车辆抵押金额(元)" v-if='isCarBusiness()' :value="myData['output_car_limits']" :readonly='true'></mt-field>
                <mt-field label="信用金额(元)" v-if='isCarBusiness()' :value="myData['output_car_credit']" :readonly='true'></mt-field>
            </div>
          </mtitle>
      </div>

      <div class="container_item" v-for="(item, index) in myData['lent_out_detail']['output_detail']">
            <mtitle :title="'出款计划'+(index+1)">
                <div slot="list">
                    <mt-field label='计划出款时间' :value="item.OUTPUT_TIME" :readonly='true'></mt-field>
                    <mt-field label='计划出款金额(元)' :value="item.OUTPUT_MONEY" :readonly='true'></mt-field>
                    <mt-field label='实际出款时间' :value="outTimeFormat(item.Actual_OutTime)" :readonly='true'></mt-field>
                    <mt-field label='转账类型' :value="item.OUTPUT_TYPE" :readonly='true'></mt-field>
                    <mt-field label='合并出款时间至' :value="item.merge_time | timeYMD" :readonly='true'></mt-field>
                    <mt-field label='出款经办人' :value="item.Actual_OutOperator" :readonly='true'></mt-field>
                    <mt-field label='实际出款备注' :value="item.Actual_Mark" :readonly='true'></mt-field>
                </div>          
            </mtitle>
      </div>
  </div>
</template>
<script>
    import mtField from 'components/field/field.vue';
    
    import mtitle from 'mycomponents/businessDetails/title.vue';

    export default {
        name: 'planOutMoney',
        components: {
            mtField,
            mtitle
        },
        methods:{
            bankFormat(outPutInfo){
                return outPutInfo.BANK_NAME=='其它'?outPutInfo.Other_Bank_Name:outPutInfo.BANK_NAME;
            },
            isCarBusiness(){
                let business_type = this.myData['lent_out_detail']['business_type'];
                return business_type.indexOf('车')>-1;
            },
            outTimeFormat(outTime){
                if(outTime=='' || !outTime){
                    return '未出款';
                }
                return outTime;
            }
        },
        computed: {
            myData () {
                return this.$store.getters.LentOutDetailData;
            }
        }
    }
</script>
<style lang="scss">

</style>
