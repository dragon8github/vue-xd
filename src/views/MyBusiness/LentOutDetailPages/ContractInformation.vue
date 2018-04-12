<template>
  <div v-if="myData">
      <div class="container_item">
          <mtitle :title="'基本信息'">
            <div slot='list'>
                <mt-field label="合同签订日期" :value="myData['lent_out_detail']['output_info']['contract_award_date'] | timeYMD" :readonly='true'></mt-field>
                <mt-field label="担保主体信息" :value="eachGuarantee(myData['lent_out_detail']['guarantee_info'])" :readonly='true'></mt-field>
                <mt-field label="抵押物抵押方式" :value="pledgeType(myData['lent_out_detail']['output_info']['pledge_type'])" :readonly='true'></mt-field>
                <mt-field label='联系电话' :value="myData['lent_out_detail']['output_info']['contact_number']"></mt-field>
                <mt-field label='担保主体的送达地址' :value="myData['lent_out_detail']['output_info']['guarantee_address']"></mt-field>
            </div>
          </mtitle>
      </div>

      <div class="container_item" v-for="(item,index) in myData['lent_out_detail']['house_info']">
        <mtitle :title="'抵押物信息'+(index+1)">
            <div slot='list'>
                <mt-field label='权属人' :value="item.HOUSE_NAME" :readonly='true'></mt-field>
                <mt-field label='隐性共有人' :value="item.hidden_ower" :readonly='true'></mt-field>
                <mt-field label='房产地址' :value="item.house_prov_address" :readonly='true'></mt-field>
                <mt-field label='房产证编号' :value="item.HOUSE_NO" :readonly='true'></mt-field>
                <mt-field label='抵押人信息填写' :value="pledgorFormat(item.pledgor_info)" :readonly='true'></mt-field>
                <mt-field label='暂作价填写' :value="priceFormat(item.temporarily_price_info)" :readonly='true'></mt-field>
            </div>
        </mtitle>
      </div>
  </div>
</template>
<script>
    import mtField from 'components/field/field.vue';
    
    import mtitle from 'mycomponents/businessDetails/title.vue';

    export default {
        name: 'contractInformation',
        components: {
            mtField,
            mtitle
        },
        methods:{
            eachGuarantee(guarantee){
                let guarantee_main = "";
                for (let i = 0; i < guarantee.length; i++) {
                    let item=guarantee[i];
                    if (item.guarante_main_type==1){
                        guarantee_main += item.guarantee_company_name + "， ";
                    }else if (item.guarante_main_type == 0) {
                        guarantee_main += item.guarantee_name + "， ";
                    }
                }
                return guarantee_main;
            },
            pledgeType(pledge_type){
                if(pledge_type==1){
                    return '单独抵押';
                }else if(pledge_type==0){
                    return '集中抵押';
                }else{
                    return '';
                }
            },
            pledgorFormat(pledgor){
                if(pledgor==1){
                    return '房管所无特殊要求，按公司要求需填写隐性共有人';
                }else if(pledgor==0){
                    return '房管所有要求只能填写房产证登记的权属人';
                }else{
                    return '';
                }
            },
            priceFormat(price){
                if(price==1){
                    return '按（所有抵押顺位的债权金额总和+本次借款金额）*1.2倍与房产评估总价 对比 取较大值 填写';
                }else if(price==0){
                    return '房管所有特殊要求，暂不填写，待合同打印后再填写';
                }else{
                    return '';
                }
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
