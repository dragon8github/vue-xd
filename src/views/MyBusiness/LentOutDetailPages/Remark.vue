<!--出款详情备注-->
<template>
  <div v-if="myData">
      <div class="container_item">
          <mtitle :title="'基本信息'">
            <div slot='list'>
                <mt-field label="内容" :value="myData['lent_out_detail']['output_info']['REMARK']" :readonly='true'></mt-field>
                <mt-field label="是否绑定银行卡代扣" :value="myData['check_bind_card']" :readonly='true'></mt-field>
                <mt-field label="是否已授权银行存管" :value="myData['check_cun_guan_register']?'是':'否'" :readonly='true'></mt-field>
                <mt-field label="是否上标放款" :value="isOutUp()" :readonly='true'></mt-field>
                <mt-field label="代扣贷后金额确认情况" :value="myData['confirm_auto_repay_status']" :readonly='true'></mt-field>
            </div>
          </mtitle>
      </div>
  </div>
</template>
<script>
    import mtField from 'components/field/field.vue';
    
    import mtitle from 'mycomponents/businessDetails/title.vue';

    export default {
        name: 'remark',
        components: {
            mtField,
            mtitle
        },
        methods:{
            isOutUp(){
                let sMsg='';
                let isp2p=this.myData['is_p2p']?this.myData['is_p2p']:false;
                let detailOutType=isp2p?"是":'否';
                let splitNumber=this.myData['split_number']?this.myData['split_number']:0;
                let splitStr=splitNumber>1?`(拆分为${splitNumber}个标)`:'';
                sMsg=isp2p?splitStr:'';
                return detailOutType+sMsg;
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
